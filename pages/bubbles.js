import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from '../ui/components/_base/Layout';
import useFetchTokens from '../ui/hooks/token/useFetchTokens';
import { useLoading } from '../contexts/general/Loading.Provider';
import { GeneralContext } from '../contexts/general/General.Context';
import useDebouncedResize from '../ui/hooks/useDebouncedResize';
import { Box, Button, FormControlLabel, Modal, Switch, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';
import useWindowWidthUnder from '../ui/hooks/useWindowWidthUnder';
import Head from 'next/head';
import { FavoriteTokensProvider, useFavoriteTokens } from '../contexts/general/FavoriteTokensProvider';
import SettingsIcon from '@mui/icons-material/Settings';
import useLocalStorage from '../ui/hooks/useLocalStorage';

class Bubble {
	constructor(x, y, token, radius, color, currency, changePeriod, bubbleValue, router, buffer, formatPrice) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.token = token;
			this.color = color;
			this.currency = currency;
			this.changePeriod = changePeriod;
			this.bubbleValue = bubbleValue;
			this.router = router;
			this.buffer = buffer;
			this.formatPrice = formatPrice; // Add formatPrice to constructor
			this.element = document.createElement('div');
			this.init();
	}

	init() {
			// Set bubble bold class, based on scale
			let extraClass = this.token.scale > 0.8 ? ('bold-' + this.color) : '';
			extraClass = this.token.scale > 1 ? ('bolder-' + this.color) : extraClass;
			extraClass = this.token.scale > 1.36 ? ('bolder2-' + this.color) : extraClass;

			// Set small bubble class based on scale (the idea is to hide the Logo)
			extraClass += this.token.scale < 0.45 ? ' small-bubble' : '';

			this.element.className = 'bubble ' + this.color + ' ' + extraClass;
			this.element.style.scale = this.radius / 50;
			this.element.style.left = `${this.x}px`;
			this.element.style.top = `${this.y}px`;
			this.element.onclick = () => this.router.push('/token/' + this.token.canister_id);

			const img = document.createElement('img');
			img.src = "https://web2.icptokens.net/storage/" + this.token.logo;
			this.element.appendChild(img);

			const symbol = document.createElement('span');
			symbol.className = 'symbol';
			symbol.innerText = this.token.symbol;
			this.element.appendChild(symbol);

			const value = document.createElement('span');
			value.className = 'value';
			
			// Dynamically set value based on bubbleValue
			if (this.bubbleValue === 'change') {
					value.innerText = this.token.metrics.change[this.changePeriod][this.currency] + '%';
			} else {
					value.innerText = this.formatPrice(this.token.metrics.price[this.currency]); // Use formatPrice
			}

			this.element.appendChild(value);
	}

	collidesWith(other) {
			const dx = this.x - other.x;
			const dy = this.y - other.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			return distance < this.radius + other.radius + this.buffer; // Include buffer
	}
}

class Bubbles {
	constructor() {

			this.bubbles = [];
			this.bubbleWrapper = document.getElementById('bubbleWrapper');
			this.bubbleWrapper.style.width = window.innerWidth + 'px';
			this.bubbleWrapper.style.height = (window.innerHeight - 100) + 'px';
			const rect = this.bubbleWrapper.getBoundingClientRect();
			this.resizeTimeout = null;
			this.containerWidth = rect.width;
			this.containerHeight = rect.height;
	}

	removeAllBubbles() {
		// Remove existing bubbles
		this.bubbles.forEach(bubble => {
					if (this.bubbleWrapper.contains(bubble.element)) {
							this.bubbleWrapper.removeChild(bubble.element);
					}
			});
	}

	addBubble(bubble) {
			this.bubbles.push(bubble);
			this.bubbleWrapper.appendChild(bubble.element);
	}

	removeBubble(tokenId) {
			// Find the bubble by token ID and remove it
			for (let i = 0; i < this.bubbles.length; i++) {
					if (this.bubbles[i].token.canister_id === tokenId) {
							// Remove from DOM
							if (this.bubbleWrapper.contains(this.bubbles[i].element)) {
									this.bubbleWrapper.removeChild(this.bubbles[i].element);
							}
							// Remove from the bubbles array
							this.bubbles.splice(i, 1);
							break; // Exit the loop once the bubble is found and removed
					}
			}
	}
}

const BubblesComponent = () => {
	const [bubblesInstance, setBubblesInstance] = useState(null);
	const bubbleWrapperRef = useRef(null);
	const { data: tokensData, loaded, error, refetch } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`);
	const { setLoadingState, loadingState } = useLoading();
	const { currency, theme, formatPrice } = useContext(GeneralContext);
	const [changePeriod, setChangePeriod] = useState('24h');
	const [radiusReducer, setRadiusReducer] = useState(1);
	const router = useRouter();
	const [reloadDataInterval, setReloadDataInterval] = useState(null);
	const isWindowUnder800 = useWindowWidthUnder(800);
	const isWindowUnder420 = useWindowWidthUnder(420);

	const { favoriteTokenIds, loadingFavorites } = useFavoriteTokens();
	
	const [watchlistOnly, setWatchlistOnly] = useState(false);

	function addScaleFactor(tokenData, minScale = 0.4, maxScale = 3) {
		return tokenData.map(token => {
				const changeMagnitude = Math.abs(token.metrics.change[changePeriod][currency]);
				const normalizedScale = Math.sqrt(changeMagnitude) / 7 + minScale; // Scale and shift
				let scale = Math.min(Math.max(normalizedScale, minScale), maxScale); // Clamp the scale between min and max values
				return { ...token, scale: scale }; // Append or modify the scale property for each token
		});
	}

	const selectChangePeriod = (event, newPeriod) => {
		setLoadingState(true);
		setChangePeriod(newPeriod)
	}

	// Settings logic
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
	const [bubbleValue, setBubbleValue] = useLocalStorage('bubbleValue', 'change');

	const openSettingsModal = () => {
			setIsSettingsModalOpen(true);
	};

	const closeSettingsModal = () => {
			setIsSettingsModalOpen(false);
	};

	useDebouncedResize(() => {
    console.log("Resized window, refetching tokens...");
    refetch();
  }, 500); // Delay of 500ms after resize stops

	useEffect(() => {
			clearInterval(reloadDataInterval)
			setLoadingState(true);
			// Setup an interval to refetch token data every 5 minutes
			const intervalId = setInterval(() => {
				refetch(); // Assuming refetchTokens is a function provided by useFetchTokens for refetching data
			}, 5 * 60 * 1000);

			setReloadDataInterval(intervalId);

			return () => {
					clearInterval(reloadDataInterval); // Cleanup the interval on component unmount
			};
	}, [currency, changePeriod]);

	useEffect(() => {
		// on currency, period or tokens data change, set radius reducer to 1
		setRadiusReducer(1);
	}, [currency, changePeriod, tokensData])

	useEffect(() => {
			if (loaded && tokensData && bubbleWrapperRef.current) {
					setLoadingState(true);
					if(bubblesInstance) {
						bubblesInstance.removeAllBubbles();
					}
					const bubbles = new Bubbles(bubbleWrapperRef.current);
					setBubblesInstance(bubbles);

					// Filling factor (percentage of the container to ideally fill with bubbles)
					const phi = 0.011;

					const filteredTokens = filterTokens(tokensData, watchlistOnly, favoriteTokenIds);
					let scaledTokens = addScaleFactor(filteredTokens);
					scaledTokens = shuffleTokens(scaledTokens);
					const totalScaleSquare = sumScalesSquared(scaledTokens);
					const areaContainer = bubbles.containerWidth * bubbles.containerHeight;
					const r = Math.sqrt((phi * areaContainer) / (Math.PI * totalScaleSquare));
					let count = 0;

					let pointsMatrix = generatePointsMatrix(bubbles.containerWidth, bubbles.containerHeight, 15);

					scaledTokens.forEach(token => {
							const radius = token.scale * r * 7 * radiusReducer;

							for (const [key, value] of pointsMatrix.entries()) {
								let hasCollision = false;
								const color = token.metrics.change[changePeriod][currency] >= 0 ? 'green' : 'red';
								const bubble = new Bubble(
										value.x + radius,
										value.y + radius,
										token,
										radius,
										color,
										currency,
										changePeriod,
										bubbleValue, // Pass bubbleValue here
										router,
										isWindowUnder800 ? 3 : 7,
										formatPrice
								);

								bubbles.addBubble(bubble);

								if(bubbles.bubbles.length > 1) {
									for (let i = 0; i < bubbles.bubbles.length - 1; i++) {
										if (bubble.collidesWith(bubbles.bubbles[i]) || bubble.x > bubbles.containerWidth - radius || bubble.y > bubbles.containerHeight - radius) {
											hasCollision = true;
											break;
										}
									}
								}

								pointsMatrix.delete(key);

								if(hasCollision) {
									bubbles.removeBubble(token.canister_id);
								} else {
									count++;
									break;
								}
							};
					});

					if(count < scaledTokens.length) {
						setRadiusReducer(radiusReducer - 0.01)
					} else {
						animateBubbles();

						setTimeout(function() {
							setLoadingState(false);
						}, 500);
					}
			}
	}, [loaded, tokensData, currency, radiusReducer, changePeriod, watchlistOnly, loadingFavorites, bubbleValue]);

	return (
		
			<>
				<Head>
					<title>Bubble Screener | ICP Tokens</title>
				</Head>
				<Layout footer={false}>
						<div className='w-full'>
								{error && <div className="error-message">Error loading tokens!</div>}
								{!error && (
									<>
										<div>
											<div className={`fixed top-[42px] ${!favoriteTokenIds.length ? ' left-1/2 ml-[-100px] ' : (isWindowUnder420 ? 'ml-[-15px]' : '') } sm:left-1/2 w-[200px] flex justify-center sm:ml-[-100px]`}>
													<ToggleButtonGroup
														value={changePeriod}
														exclusive
														onChange={selectChangePeriod}
														className='my-2'
														color="primary"
														sx={{
															'& .Mui-selected': { color: 'primary' },
														}}
													>
														<Tooltip title="Last 24 hours" placement="bottom">
															<ToggleButton value="24h" aria-label="Today" size="medium">
																Day
															</ToggleButton>
														</Tooltip>
														<Tooltip title="Last 7 days" placement="bottom">
															<ToggleButton value="7d" aria-label="Week" size="medium">
																Week
															</ToggleButton>
														</Tooltip>
														<Tooltip title="Last 30 days" placement="bottom">
															<ToggleButton value="30d" aria-label="Month" size="medium">
																Month
															</ToggleButton>
														</Tooltip>
													</ToggleButtonGroup>

													<Tooltip title="Settings" placement="bottom" onClick={openSettingsModal}>
														<Button
															sx={{
																	position: 'absolute',
																	left: "100%",
																	top: '50%',
																	transform: 'translateY(-50%)',
																	zIndex: 10,
																	minWidth: 'auto',  // Ensures the button is only as wide as the icon
																	padding: '10px',    // Optional: Adjust padding for better touch area
																	marginLeft: '-12px',
																	marginTop: '1px'
															}}
													>
															<SettingsIcon />
													</Button>
												</Tooltip>
											</div>
											{favoriteTokenIds.length > 0 && (
													<div className={`absolute ${isWindowUnder420 ? 'right-0' : 'right-[15px]'} lg:right-[0] top-[75px] transform -translate-y-1/2`}>
														<FormControlLabel
															control={
																<Switch
																	checked={watchlistOnly}
																	onChange={(e) => setWatchlistOnly(e.target.checked)}
																	color="primary"
																	inputProps={{ 'aria-label': 'Watchlist Filter' }}
																/>
															}
															label={isWindowUnder420 ? "Watchlist" : "Show Watchlist" }
															labelPlacement="end" // or "start" depending on where you want the label
														/>
													</div>
												)}
										</div>
										<div id="bubbleWrapper" ref={bubbleWrapperRef} className={`bubbles ${!loadingState ? 'opacity-100' : 'opacity-0'}`}>
												{/* Managed by Bubbles class */}
										</div>
									</>
								)}
						</div>

						{/* Settings Modal */}
						<Modal open={isSettingsModalOpen} onClose={closeSettingsModal} style={{
							zIndex: 999999
						}}>
							<Box sx={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									maxWidth: 400,  // Sets the width of the modal
									width: '100%',
									bgcolor: theme == 'dark' ? '#0f0f26' : 'background.paper',
									boxShadow: 24,
									p: 4,
									borderRadius: 0,
									maxHeight: '100vh',
									overflowY: 'auto',
							}}>
									<h2 className='h1 mb-2'>Bubble Content</h2>
									<ToggleButtonGroup
											exclusive
											value={bubbleValue}
											onChange={(e, newValue) => setBubbleValue(newValue)}
											aria-label="Settings Option"
											fullWidth
									>
											<ToggleButton value="change">Price Change</ToggleButton>
											<ToggleButton value="price">Current Price</ToggleButton>
									</ToggleButtonGroup>

									<div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
											<Button variant="contained" onClick={closeSettingsModal}>Close Settings</Button>
									</div>
							</Box>
					</Modal>

				</Layout>
			</>
);
};

const WrappedBubblesComponent = () => (
  <FavoriteTokensProvider>
    <BubblesComponent />
  </FavoriteTokensProvider>
);

export default WrappedBubblesComponent;

function sumScalesSquared(tokens) {
	return tokens.reduce((acc, token) => acc + token.scale * token.scale, 0);
}

// Define the function to generate the matrix of points
function generatePointsMatrix(containerWidth, containerHeight, step = 10) {
	const startX = 10;
	const startY = 10;
	const endX = containerWidth - 15;
	const endY = containerHeight - 15;
	const pointsMap = new Map();

	for (let y = startY; y <= endY; y += step) {
		for (let x = startX; x <= endX; x += step) {
			// Create a unique key for each point
			const key = `${x},${y}`;
			pointsMap.set(key, { x: x + getRandomInt(13), y: y + getRandomInt(33) });
		}
	}

	return pointsMap;
}

function filterTokens(array, watchlistOnly, favoriteTokenIds) {
	// Apply filters logic here
	let filteredArray = array;

	if (watchlistOnly) {
		filteredArray = filteredArray.filter(token => favoriteTokenIds.includes(token.canister_id)); // Example filter condition
	}

	return filteredArray;
}

function shuffleTokens(array) {
  // Shuffle the elements
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array; // Return the filtered and shuffled array
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function animateBubbles() {
	var bubbles = document.querySelectorAll('.bubbles .bubble');
	var animations = ['float1', 'float2', 'float3', 'float4', 'float5'];

	function randomizeAnimation(bubble) {
		var animationName = animations[Math.floor(Math.random() * animations.length)];
		var animationDuration = 18; //

		bubble.style.animationName = animationName;
		bubble.style.animationDuration = animationDuration + 's';
		bubble.style.animationTimingFunction = 'linear';
		bubble.style.animationIterationCount = 'infinite';
	}

	bubbles.forEach(function(bubble) {
		randomizeAnimation(bubble);
	});
};