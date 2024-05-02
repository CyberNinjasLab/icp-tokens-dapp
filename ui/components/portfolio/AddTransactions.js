import { useContext, useEffect, useState } from 'react';
import { Modal, TextField, Button, ToggleButtonGroup, ToggleButton, Autocomplete, Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import useFetchTokens from '../../hooks/token/useFetchTokens';
import { GeneralContext } from '../../../contexts/general/General.Context';
import { useLoading } from '../../../contexts/general/Loading.Provider';
import usePriceNearTimestamp from '../../hooks/token/usePriceNearTimestamp';


const AddTransaction = ({ closeModal, fetchPortfolios, backendCoreActor }) => {
    const { setLoadingState } = useLoading();
    const [transactionType, setTransactionType] = useState('buy');
    const [coin, setCoin] = useState(null);
    const [quantity, setQuantity] = useState('');
    const [pricePerCoin, setPricePerCoin] = useState('');
    const [date, setDate] = useState(null);
    const [note, setNote] = useState('');
    const { getTokenName, showPriceCurrency, roundPrice } = useContext(GeneralContext);
    const { fetchPriceNearTimestamp } = usePriceNearTimestamp();
    const currency = 'icp';

    const { data: coins, loaded, error } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens/autocomplete`);

    useEffect(() => {
        const fetchPrice = async () => {
            if (coin && date) {
                try {
                    let priceData = await fetchPriceNearTimestamp(coin.canister_id, Math.floor(date.toDate().getTime() / 1000), currency);
                    priceData = roundPrice(parseFloat(priceData.close));

                    setPricePerCoin(priceData.toString());
                } catch (error) {
                    console.error('Error fetching price:', error);
                }
            }
        };

        fetchPrice();
    }, [coin, date]);

    // Calculate total spent dynamically
    const totalSpent = roundPrice(parseFloat(quantity) * parseFloat(pricePerCoin));
    const totalSpentFormatted = totalSpent && !isNaN(totalSpent) ? showPriceCurrency(totalSpent, currency) : '';

    const handleAddTransaction = async () => {
        try {
            setLoadingState(true);
            await backendCoreActor.addPortfolioTransaction(0, {
                canister_id: coin.canister_id,
                quantity: parseFloat(quantity),
                price_per_token: parseFloat(pricePerCoin),
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
                width: 400,  // Sets the width of the modal
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,  // Optional: Adds rounded corners
            }}>
                <h2 className='h1 mb-4'>Add Transaction</h2>
                <ToggleButtonGroup
                    exclusive
                    value={transactionType}
                    onChange={(e, newAlignment) => setTransactionType(newAlignment)}
                    aria-label="Transaction Type"
                    fullWidth>
                    <ToggleButton value="buy">Buy</ToggleButton>
                    <ToggleButton value="sell">Sell</ToggleButton>
                </ToggleButtonGroup>
                    <Autocomplete
                        options={loaded ? coins.data : []}
                        getOptionLabel={(option) => getTokenName(option)}  // Adjust if your data structure requires\
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
                        onChange={(event, newValue) => setCoin(newValue)}
                        sx={{ my: 2 }}
                        disabled={!loaded || error}  // Disable if not loaded or if there's an error
                        disablePortal
                    />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        label="Transaction Date"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                        sx={{
                            width: '100%'
                        }}
                    />
                </LocalizationProvider>
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
                    sx={{ my: 2 }}
                />
                <TextField
                    label="Total Spent"
                    type="text"
                    fullWidth
                    value={totalSpentFormatted}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ my: 2 }}
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
