import { useState, useContext } from 'react';
import { GeneralContext } from '../../../contexts/general/General.Context';
import usePriceNearTimestamp from '../token/usePriceNearTimestamp';

const useTransactionSummary = (tokens) => {
    const { parseTokensByCanisterId } = useContext(GeneralContext);
    const { fetchPriceNearTimestamp } = usePriceNearTimestamp();
    const [summaries, setSummaries] = useState({});

    const summarizeTransactions = async (transactions) => {
        const tokensByCanisterId = parseTokensByCanisterId(tokens);
        const groupedByToken = transactions.reduce((acc, transaction) => {
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

        for (const tokenId of Object.keys(groupedByToken)) {
            const tokenData = groupedByToken[tokenId];
            for (const transaction of tokenData.portfolio.transactions) {
                const transactionValue = transaction.quantity * transaction.price_per_token;
                if (transaction.direction === true) { // Buy
                    tokenData.portfolio.investedFunds += transactionValue;
                    tokenData.portfolio.totalQuantity += transaction.quantity;
                } else { // Sell
                    tokenData.portfolio.investedFunds -= transactionValue;
                    tokenData.portfolio.totalQuantity -= transaction.quantity;
                    tokenData.portfolio.realizedProfit += transactionValue;
                }
            }

            if (tokenData.portfolio.totalQuantity > 0) {
                tokenData.portfolio.avgBuyPrice = tokenData.portfolio.investedFunds / tokenData.portfolio.totalQuantity;
            } else {
                tokenData.portfolio.avgBuyPrice = 0;  // Handle zero quantity to avoid division by zero
            }

            const currentPriceData = await fetchPriceNearTimestamp(tokenId, Math.floor((new Date()).getTime() / 1000), 'icp');
            const currentMarketValue = currentPriceData.close * tokenData.portfolio.totalQuantity;

            tokenData.portfolio.currentFunds = currentMarketValue;

            totalInvested += tokenData.portfolio.investedFunds;
            totalCurrentFunds += currentMarketValue;
        }

        const arrayOfTokens = Object.entries(groupedByToken).map(([index, obj]) => ({
            index,
            ...obj,
        }));

        const output = { tokens: arrayOfTokens, totalInvested, totalCurrentFunds };

        setSummaries(output);

        return output;
    };

    return [summaries, summarizeTransactions];
};

export default useTransactionSummary;
