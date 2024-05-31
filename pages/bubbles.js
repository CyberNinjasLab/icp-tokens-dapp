import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from '../ui/components/_base/Layout';
import useFetchTokens from '../ui/hooks/token/useFetchTokens';
import { useLoading } from '../contexts/general/Loading.Provider';
import { GeneralContext } from '../contexts/general/General.Context';
import useDebouncedResize from '../ui/hooks/useDebouncedResize';
import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useRouter } from 'next/router';

class Bubble {
	constructor(x, y, token, radius, speedX, speedY, color, currency, changePeriod, router) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.speedX = speedX;
			this.speedY = speedY;
			this.token = token;
			this.color = color;
			this.currency = currency;
			this.changePeriod = changePeriod;
			this.router = router;
			this.buffer = 7;
			this.element = document.createElement('div');
			this.init();
	}

	init() {
			let extraClass = this.token.scale > 0.8 ? ('bold-' + this.color) : '';
			extraClass = this.token.scale > 1 ? ('bolder-' + this.color) : extraClass;
			extraClass = this.token.scale > 1.36 ? ('bolder2-' + this.color) : extraClass;
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
			value.innerText = this.token.metrics.change[this.changePeriod][this.currency] + '%';
			// value.element.style.color = this.color;
			this.element.appendChild(value);
	}

	collidesWith(other) {
			const dx = this.x - other.x;
			const dy = this.y - other.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			return distance < this.radius + other.radius + this.buffer; // Include buffer
	}

	handleCollision(other) {
			let dx = this.x - other.x;
			let dy = this.y - other.y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			let overlap = 0.5 * (distance - this.radius - other.radius - this.buffer); // Include buffer

			this.x -= overlap * (this.x - other.x) / distance;
			this.y -= overlap * (this.y - other.y) / distance;

			other.x += overlap * (this.x - other.x) / distance;
			other.y += overlap * (this.y - other.y) / distance;

			let nx = dx / distance;
			let ny = dy / distance;
			let p = 2 * (this.speedX * nx + this.speedY * ny - other.speedX * nx - other.speedY * ny) / (this.radius + other.radius);

			this.speedX -= p * other.radius * nx * 0.99;
			this.speedY -= p * other.radius * ny * 0.99;
			other.speedX += p * this.radius * nx * 0.99;
			other.speedY += p * this.radius * ny * 0.99;
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

	animate() {
			for (let i = 0; i < this.bubbles.length; i++) {
					for (let j = i + 1; j < this.bubbles.length; j++) {
							if (this.bubbles[i].collidesWith(this.bubbles[j])) {
									this.bubbles[i].handleCollision(this.bubbles[j]);
							}
					}
					this.bubbles[i].move();
			}
			requestAnimationFrame(() => this.animate());
	}
}

const BubblesComponent = () => {
	const [bubblesInstance, setBubblesInstance] = useState(null);
	const bubbleWrapperRef = useRef(null);
	const { data: tokensData, loaded, error, refetch } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`);
	const { setLoadingState } = useLoading();
	const { currency } = useContext(GeneralContext);
	const [changePeriod, setChangePeriod] = useState('24h');
	const [radiusMultiplier2, setRadiusMultiplier2] = useState(1);
	const [isComponentLoaded, setIsComponentLoaded] = useState(false);
	const router = useRouter(); 

	function addScaleFactor(tokenData, minScale = 0.4, maxScale = 1.8) {
		return tokenData.map(token => {
				const changeMagnitude = Math.abs(token.metrics.change[changePeriod][currency]);
				const normalizedScale = Math.sqrt(changeMagnitude) / 7 + minScale; // Scale and shift
				let scale = Math.min(Math.max(normalizedScale, minScale), maxScale); // Clamp the scale between min and max values
				return { ...token, scale: scale }; // Append or modify the scale property for each token
		});
	}

	const selectChangePeriod = (event, newPeriod) => {
		setIsComponentLoaded(false);
		setLoadingState(true);

		setChangePeriod(newPeriod)
	}

	useDebouncedResize(() => {
    console.log("Resized window, refetching tokens...");
    refetch();
  }, 500); // Delay of 500ms after resize stops

	useEffect(() => {
			setLoadingState(true);
			// Setup an interval to refetch token data every minute
			const intervalId = setInterval(() => {
				refetch(); // Assuming refetchTokens is a function provided by useFetchTokens for refetching data
			}, 60 * 1000);

			return () => {
					clearInterval(intervalId); // Cleanup the interval on component unmount
			};
	}, []);

	useEffect(() => {
		setRadiusMultiplier2(1);
	}, [currency, changePeriod, tokensData])

	useEffect(() => {
			setLoadingState(true);
			setIsComponentLoaded(false);
			if (loaded && tokensData && bubbleWrapperRef.current) {
					if(bubblesInstance) {
						bubblesInstance.removeAllBubbles();
					}
					const bubbles = new Bubbles(bubbleWrapperRef.current);
					setBubblesInstance(bubbles);

					let scaledTokens = addScaleFactor(tokensData);
					scaledTokens = filterAndShuffleTokens(scaledTokens);

					const adjusments = calculateDynamicAdjustments(bubbles.containerWidth, bubbles.containerHeight);
					const radiusMultiplier = getRadiusMultiplier(scaledTokens, currency, changePeriod, adjusments);
					
					let count = 0;

					scaledTokens.forEach(token => {
							const radius = adjusments.radius * token.scale * radiusMultiplier * radiusMultiplier2;

							console.log(token.scale)

							let xPoint = radius + 5;
							let yPoint = radius + 5;
							let isBubbleAdded = false;

							while(!isBubbleAdded) {
									xPoint = radius + 5;

									while(true) {
											xPoint += adjusments.pointIncrement;

											if(xPoint >= bubbles.containerWidth - (radius + 10)) break;

											const x = Math.min(bubbles.containerWidth - radius / 2 - 10, xPoint - getRandomInt(5));
											const y = Math.min(bubbles.containerHeight - radius - 10, yPoint + getRandomInt(30));
											
											const speedX = (Math.random() - 0.5) * 1.6;
											const speedY = (Math.random() - 0.5) * 1.6;
											const color = token.metrics.change[changePeriod][currency] >= 0 ? 'green' : 'red';

											const bubble = new Bubble(x, y, token, radius, speedX, speedY, color, currency, changePeriod, router);

											bubbles.addBubble(bubble);

											let hasCollision = false;

											if(bubbles.bubbles.length > 1) {
													for (let i = 0; i < bubbles.bubbles.length - 1; i++) {
															if (bubble.collidesWith(bubbles.bubbles[i])) {
																	hasCollision = true;
															}
													}
											}

											if(!hasCollision) {
													isBubbleAdded = true;
													count++;
													break;
											} else {
													isBubbleAdded = false;
													bubbles.removeBubble(token.canister_id);
											}
									}

									yPoint += adjusments.pointIncrement;

									if(yPoint >= bubbles.containerHeight - (radius + 10)) break;
							}
					});

					if(count < 50) {
						setRadiusMultiplier2(radiusMultiplier2 - 0.02)
					} else {
						animateBubbles();

						setTimeout(function() {
							setIsComponentLoaded(true)
							setLoadingState(false);
						}, 500);
					}
			}
	}, [loaded, tokensData, currency, radiusMultiplier2, changePeriod]);

	return (
		<Layout footer={false}>
				<div className='w-full'>
						{error && <div className="error-message">Error loading tokens!</div>}
						{!error && loaded && (
							<>
									<div className='fixed top-[42px] left-1/2 w-[200px] flex justify-center ml-[-100px]'>
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
								</div>
								<div id="bubbleWrapper" ref={bubbleWrapperRef} className={`bubbles ${isComponentLoaded ? 'opacity-100' : 'opacity-0'}`}>
										{/* Managed by Bubbles class */}
								</div>
							</>
						)}
				</div>
		</Layout>
);
};

export default BubblesComponent;

function filterAndShuffleTokens(array) {
	// First, sort the array by the .scale property in descending order
	array.sort((a, b) => b.scale - a.scale);

	// Get the top 50 elements with the highest .scale
	const top50 = array.slice(0, 50);

	// Shuffle the top 50 elements
	for (let i = top50.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[top50[i], top50[j]] = [top50[j], top50[i]];
	}

	return top50; // Return the shuffled array of top 50 elements
}

function getRadiusMultiplier(tokens, currency, changePeriod, adjusments) {
	const changeSum = tokens.reduce((sum, token) => sum + Math.abs(token.metrics.change[changePeriod][currency]), 0);

	let radiusMultiplier;
	if (changeSum < 500) {
			radiusMultiplier = 1 + (changeSum / 2000) + adjusments.radius / 500; // Accelerate growth
	} else {
		radiusMultiplier = 1 - (changeSum / 10000) - adjusments.radius / 5000;
	}

	// console.log(radiusMultiplier)

	return radiusMultiplier;
}

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function calculateDynamicAdjustments(width, height) {
	const baseWidth = 1512;
	const baseHeight = 823;
	const baseArea = baseWidth * baseHeight;  // Area for the reference resolution
	const currentArea = width * height;       // Area for the current resolution

	// Calculate area ratio using square root
	const areaRatio = Math.sqrt(currentArea / baseArea);

	// Adjustments for radius
	const baseRadius = 72;
	const dynamicRadius = baseRadius * areaRatio;

	// Adjustments for Point
	const basePointIncrement = 50;
	const dynamicPointIncrement = basePointIncrement * areaRatio;

	return {
			radius: dynamicRadius,
			pointIncrement: Math.min(60, Math.max(dynamicPointIncrement, 20))
	};
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