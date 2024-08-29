import { useState, useContext } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import usePriceNearTimestamp from '../token/usePriceNearTimestamp';

const useTransactionSummary = (tokens, currency) => {
    const { parseTokensByCanisterId, roundPrice } = useContext(GeneralContext);
    const [summaries, setSummaries] = useState({});
    const { fetchPricesNearTimestamps } = usePriceNearTimestamp();

    const summarizeTransactions = async (transactions) => {
        if (!transactions || !Array.isArray(transactions)) {
            console.error('Invalid transactions data:', transactions);
            return; // Exit early if transactions is not a valid array
        }

        const tokensByCanisterId = parseTokensByCanisterId(tokens);
        const groupedByToken = transactions.reduce((acc, transaction) => {
            if (!tokensByCanisterId[transaction.canister_id]) {
                return acc; // Skip if the token is not found
            }

            if (!acc[transaction.canister_id]) {
                acc[transaction.canister_id] = { 
                    ...tokensByCanisterId[transaction.canister_id], 
                    portfolio: {
                        transactions: [],
                        totalQuantity: 0,
                        buySum: 0,
                        sellSum: 0,
                        realizedProfit: 0,
                        currentFunds: 0,
                        avgBuyPrice: 0,
                    }
                };
            }
            acc[transaction.canister_id].portfolio.transactions.push(transaction);
            return acc;
        }, {});

        if (!Object.keys(groupedByToken).length) {
            console.error('No valid transactions found for the given tokens.');
            return;
        }

        // Prepare requests for batch price fetching
        const priceRequests = transactions.map(transaction => ({
            canister_id: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
            timestamp: transaction.timestamp,
            currency: currency
        }));

        let priceResponses = [];
        try {
            // Fetch prices in a single batch request
            priceResponses = await fetchPricesNearTimestamps(priceRequests);
        } catch (error) {
            console.error('Error fetching prices:', error);
        }

        // Map fetched prices back to transactions
        priceResponses.forEach((priceData, index) => {
            transactions[index].price_per_token_icp = transactions[index].price_per_token; 

            if (priceData && priceData.status === 200) {
                const icpUsdPrice = roundPrice(parseFloat(priceData.value));
                transactions[index].price_per_token_usd = transactions[index].price_per_token_icp * icpUsdPrice;
            } else {
                console.error('Failed to fetch price:', priceData);
                transactions[index].price_per_token_usd = null;  // Handle error case
            }
        });

        // Calculate funds and quantities after all prices are fetched
        Object.values(groupedByToken).forEach(tokenData => {
            tokenData.portfolio.transactions.forEach(transaction => {
                const transactionValue = transaction.quantity * (transaction.price_per_token_usd ?? transaction.price_per_token);
                if (transaction.direction === true) { // Buy
                    tokenData.portfolio.buySum += transactionValue;
                    tokenData.portfolio.totalQuantity += transaction.quantity;
                } else { // Sell
                    tokenData.portfolio.sellSum -= transactionValue;
                    tokenData.portfolio.totalQuantity -= transaction.quantity;
                    tokenData.portfolio.realizedProfit += transactionValue;
                }
            });

            if (tokenData.portfolio.totalQuantity > 0) {
                tokenData.portfolio.avgBuyPrice = tokenData.portfolio.buySum / tokenData.portfolio.totalQuantity;
            } else {
                tokenData.portfolio.avgBuyPrice = 0;  // Avoid division by zero
            }

            const currentMarketValue = tokenData.metrics.price[currency] * tokenData.portfolio.totalQuantity;
            tokenData.portfolio.currentFunds = currentMarketValue;
        });

        // Process the final summary
        const arrayOfTokens = Object.entries(groupedByToken).map(([index, obj]) => ({ index, ...obj }));
        const totalInvested = Object.values(groupedByToken).reduce((sum, token) => sum + token.portfolio.buySum, 0);
        const totalCurrentFunds = Object.values(groupedByToken).reduce((sum, token) => sum + token.portfolio.currentFunds, 0);
        const totalQuantity = Object.values(groupedByToken).reduce((sum, token) => sum + token.portfolio.totalQuantity, 0);

        const output = { tokens: arrayOfTokens, totalInvested, totalCurrentFunds, totalQuantity };
        setSummaries(output);

        return output;
    };

    return [summaries, summarizeTransactions];
};

export default useTransactionSummary;
