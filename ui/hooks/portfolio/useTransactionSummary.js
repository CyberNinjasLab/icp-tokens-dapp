import { useState, useContext } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import usePriceNearTimestamp from '../token/usePriceNearTimestamp';

const useTransactionSummary = (tokens, currency) => {
    const { parseTokensByCanisterId, roundPrice } = useContext(GeneralContext);
    const [summaries, setSummaries] = useState({});
    const { fetchPriceNearTimestamp } = usePriceNearTimestamp();

    const summarizeTransactions = async (transactions) => {
        const tokensByCanisterId = parseTokensByCanisterId(tokens);
        const groupedByToken = transactions.reduce((acc, transaction) => {
            if (!tokensByCanisterId[transaction.canister_id]) {
                return acc; // Skip this transaction if the token is not found
            }

            if (!acc[transaction.canister_id]) {
                acc[transaction.canister_id] = tokensByCanisterId[transaction.canister_id];
                acc[transaction.canister_id].portfolio = {
                    transactions: [],
                    totalQuantity: 0,
                    investedFunds: 0,
                    realizedProfit: 0,
                    currentFunds: 0,
                    avgBuyPrice: 0,  // Initialize avgBuyPrice
                };
            }
            acc[transaction.canister_id].portfolio.transactions.push(transaction);
            return acc;
        }, {});

        let totalInvested = 0;
        let totalCurrentFunds = 0;
        let totalQuantity = 0;

        for (const tokenId of Object.keys(groupedByToken)) {
            const tokenData = groupedByToken[tokenId];
            for (const transaction of tokenData.portfolio.transactions) {
                let usdPrice = null;

                // If currency set to USD, get token usd price for the current timestamp:
                if(currency == 'usd') {
                    let usdPriceData = await fetchPriceNearTimestamp(transaction.canister_id, transaction.timestamp, currency);
                    usdPrice = roundPrice(parseFloat(usdPriceData.value));
                }

                transaction.price_per_token_usd = usdPrice;
                transaction.price_per_token_icp = transaction.price_per_token;

                const transactionValue = transaction.quantity * (currency == 'usd' ? usdPrice : transaction.price_per_token);

                if (transaction.direction === true) { // Buy
                    tokenData.portfolio.investedFunds += transactionValue;
                    tokenData.portfolio.totalQuantity += transaction.quantity;
                } else { // Sell
                    tokenData.portfolio.investedFunds -= transactionValue;
                    tokenData.portfolio.totalQuantity -= transaction.quantity;
                    tokenData.portfolio.realizedProfit += transactionValue;
                }

                if(currency == 'usd') {
                    tokenData.portfolio.investedFunds
                }
            }
            // console.log(tokenData.portfolio);
            if (tokenData.portfolio.totalQuantity > 0) {
                tokenData.portfolio.avgBuyPrice = tokenData.portfolio.investedFunds / tokenData.portfolio.totalQuantity;
            } else {
                tokenData.portfolio.avgBuyPrice = 0;  // Handle zero quantity to avoid division by zero
            }

            const currentMarketValue = tokenData.metrics.price[currency] * tokenData.portfolio.totalQuantity;

            tokenData.portfolio.currentFunds = currentMarketValue;

            totalInvested += tokenData.portfolio.investedFunds;
            totalCurrentFunds += currentMarketValue;
            totalQuantity += tokenData.portfolio.totalQuantity;
        }

        const arrayOfTokens = Object.entries(groupedByToken).map(([index, obj]) => ({
            index,
            ...obj,
        }));

        const output = { tokens: arrayOfTokens, totalInvested, totalCurrentFunds, totalQuantity };

        setSummaries(output);

        return output;
    };

    return [summaries, summarizeTransactions];
};

export default useTransactionSummary;
