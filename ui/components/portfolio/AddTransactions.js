import { useContext, useEffect, useState } from 'react';
import { Modal, TextField, Button, ToggleButtonGroup, ToggleButton, Autocomplete, Box, createTheme } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import useFetchTokens from '../../hooks/token/useFetchTokens';
import { GeneralContext } from '../../../contexts/general/General.Context';
import { useLoading } from '../../../contexts/general/Loading.Provider';
import usePriceNearTimestamp from '../../hooks/token/usePriceNearTimestamp';
import { ThemeProvider } from '@emotion/react';

const AddTransaction = ({ closeModal, fetchPortfolios, backendCoreActor, selectedCoinId }) => {
    const { setLoadingState } = useLoading();
    const [transactionType, setTransactionType] = useState('buy');
    const [coin, setCoin] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [pricePerCoin, setPricePerCoin] = useState('');
    const [date, setDate] = useState(null);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [tempDate, setTempDate] = useState(null);
    const [note, setNote] = useState('');
    const { getTokenName, showPriceCurrency, roundPrice, theme } = useContext(GeneralContext);
    const { fetchPricesNearTimestamps } = usePriceNearTimestamp();
    const [currency, setCurrency] = useState('usd');

    const datePickerTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        components: {
            MuiInputBase: {
              styleOverrides: {
                root: {
                    'font-size': '0.8571428571428571rem'
                }
              }
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        color: '#fff',
                        'font-family': 'inherit',
                        'font-weight': '400',
                        'font-size': '0.8571428571428571rem',
                        '&.Mui-focused': { 
                            color: '#28abe596'
                        }
                    }
                }
            },
            MuiOutlinedInput: {
                styleOverrides: {
                  root: {
                    '& fieldset': {
                      borderColor: 'rgb(75 85 99) !important', // Default border color
                    },
                  },
                },
            },
        }
    })

    const { data: coins, loaded, error } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens/autocomplete`);

    const handleOpen = () => {
        setPickerOpen(true);
    };
    
    const handleClose = () => {
        if (pickerOpen) {
            setDate(tempDate);  // Set the date when the picker is closed
        }
        setPickerOpen(false);
    };
    
    const handleAccept = (newDate) => {
        setDate(newDate);  // Set the date when "OK" is clicked
        setPickerOpen(false);
    };
    
    const handleChange = (newDate) => {
        setTempDate(newDate);
    };
    
    // Debounce effect to update date after typing stops
    useEffect(() => {
        const handler = setTimeout(() => {
            if (!pickerOpen) {
                setDate(tempDate);  // Update date when typing stops
            }
        }, 1000);  // 500ms debounce time

        return () => {
            clearTimeout(handler);
        };
    }, [tempDate, pickerOpen]);

    useEffect(() => {
        const fetchPrice = async () => {
            if (coin && date) {
                try {
                    setLoadingState(true);

                    const timestamp = Math.floor(date.toDate().getTime() / 1000);

                    // Prepare the requests array
                    const requests = [
                        { canister_id: coin.canister_id, timestamp, currency },
                    ];

                    if (coin.canister_id !== 'ryjl3-tyaaa-aaaaa-aaaba-cai' && currency !== 'icp') {
                        requests.push({ canister_id: coin.canister_id, timestamp, currency: 'icp' });
                    }

                    // Fetch prices in a batch request
                    const prices = await fetchPricesNearTimestamps(requests);

                    if (prices && prices.length > 0) {
                        const priceData = roundPrice(parseFloat(prices[0]?.value || 0));
                        setPricePerCoin(priceData.toString());
                    }

                    setLoadingState(false);
                } catch (error) {
                    console.error('Error fetching price:', error);
                    setLoadingState(false);
                }
            }
        };

        fetchPrice();
    }, [coin, date, currency]);

    // Effect to handle selectedCoinId
    useEffect(() => {
        if (selectedCoinId && loaded) {
            const selectedCoin = coins.data.find(coin => coin.canister_id === selectedCoinId);
            if (selectedCoin) {
                setCoin(selectedCoin);
                setCurrency(selectedCoinId == 'ryjl3-tyaaa-aaaaa-aaaba-cai' ? 'usd' : 'icp')
            }
        }
    }, [selectedCoinId, coins, loaded]);

    const handleAutocompleteChange = (event, newValue) => {
        setCoin(newValue);
        if(newValue) {
            setCurrency(newValue.canister_id == 'ryjl3-tyaaa-aaaaa-aaaba-cai' ? 'usd' : 'icp')
        }
    };

    // Calculate total spent dynamically
    const totalSpent = roundPrice(parseFloat(quantity) * parseFloat(pricePerCoin));
    const totalSpentFormatted = totalSpent && !isNaN(totalSpent) ? showPriceCurrency(totalSpent, currency) : '';

    const handleAddTransaction = async () => {
        try {
            setLoadingState(true);
            await backendCoreActor.addPortfolioTransaction(0, {
                id: 0,
                canister_id: coin.canister_id,
                quantity: parseFloat(quantity),
                price_per_token: coin.canister_id == 'ryjl3-tyaaa-aaaaa-aaaba-cai' ? 1 : parseFloat(pricePerCoin),
                timestamp: Math.floor(date.toDate().getTime() / 1000),
                note: note,
                direction: transactionType === 'buy'
            });
            await fetchPortfolios();
            closeModal();
        } catch (err) {
            console.error('Failed to add transaction:', err);
        } finally {
            setLoadingState(false);
        }
    };

    return (
        <Modal open onClose={closeModal}>
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
                borderRadius: 0,  // Optional: Adds rounded corners
                maxHeight: '100vh',
                overflowY: 'auto',
            }}>
                <h2 className='h1 mb-4'>Add Transaction</h2>
                <ToggleButtonGroup
                    exclusive
                    value={transactionType}
                    onChange={(e, newAlignment) => setTransactionType(newAlignment)}
                    aria-label="Transaction Type"
                    fullWidth
                >
                    <ToggleButton value="buy">Buy</ToggleButton>
                    <ToggleButton value="sell">Sell</ToggleButton>
                </ToggleButtonGroup>
                    <Autocomplete
                        readOnly={selectedCoinId}
                        options={loaded ? coins.data : []}
                        getOptionLabel={(option) => getTokenName(option)}  // Adjust if your data structure requires
                        getOptionKey={(option) => option.canister_id}
                        renderOption={(props, option) => {
                            return (
                              <div {...props}>
                                {option.logo && (
                                    <div style={{
                                        width: '22px',
                                        height: '22px',
                                        marginRight: '7px'
                                    }}>
                                        <img
                                            alt={`${getTokenName(option)} Logo`}
                                            src={`${process.env.NEXT_PUBLIC_WEB2_API_URL}/storage/${option.logo}`}
                                            style={{
                                                
                                            }}
                                        />
                                    </div>
                                )}
                                <span>{getTokenName(option)}</span>
                              </div>
                            );
                          }}
                        renderInput={(params) => <TextField {...params} label="Select Coin" fullWidth />}
                        value={coin}
                        onChange={handleAutocompleteChange}
                        sx={{ my: 2 }}
                        disabled={!loaded || error}  // Disable if not loaded or if there's an error
                        disablePortal
                    />
                {theme === 'dark' ? (
                    <ThemeProvider theme={datePickerTheme} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Transaction Date"
                                value={date}
                                onChange={handleChange}
                                onAccept={handleAccept}
                                onOpen={handleOpen}
                                onClose={handleClose}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                sx={{ width: '100%' }}
                            />
                        </LocalizationProvider>
                    </ThemeProvider>
                ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Transaction Date"
                            value={date}
                            onChange={setDate}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{
                                width: '100%'
                            }}
                        />
                    </LocalizationProvider>
                )}
                <TextField
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{
                        mt: 2
                    }}
                />
                <TextField
                    label="Price Per Coin"
                    type="number"
                    fullWidth
                    value={pricePerCoin}
                    onChange={(e) => setPricePerCoin(e.target.value)}
                    InputProps={{
                        readOnly: coin?.canister_id == 'ryjl3-tyaaa-aaaaa-aaaba-cai',
                    }}
                    sx={{ my: 2 }}
                />
                <TextField
                    label="Total Amount"
                    type="text"
                    fullWidth
                    value={totalSpentFormatted}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Note"
                    multiline
                    rows={1}
                    fullWidth
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button variant="contained" onClick={handleAddTransaction}>Add Transaction</Button>
                </div>
            </Box>
        </Modal>
    );
};

export default AddTransaction;
