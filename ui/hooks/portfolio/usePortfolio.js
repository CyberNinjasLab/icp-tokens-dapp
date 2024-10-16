import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../contexts/auth/Auth.Context';
import { GeneralContext } from '../../../contexts/general/General.Context';
import { useLoading } from '../../../contexts/general/Loading.Provider';
import useFetchTokens from '../token/useFetchTokens';
import { Principal } from "@dfinity/principal";
import usePriceNearTimestamp from '../token/usePriceNearTimestamp';

const usePortfolio = (tokenCanisterId = null) => {
    const { backendCoreActor, portfolioActor, isAuthenticated } = useContext(AuthContext);
    const { currency } = useContext(GeneralContext);
    const { loadingState, setLoadingState } = useLoading();
    const { data: tokens, loaded } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`);
    const { fetchPricesNearTimestamps } = usePriceNearTimestamp();

    const [portfolio, setPortfolio] = useState(null);
    const [portfolioProcessedData, setPortfolioProcessedData] = useState(null);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [tokenTransactions, setTokenTransactions] = useState(null);

    useEffect(() => {
        if (isAuthenticated && loaded && tokens.length > 0) {
            fetchPortfolioData();
        }
    }, [isAuthenticated, loaded, tokens, currency]);

    const fetchPortfolioData = async () => {
      try {
          const portfolioData = await portfolioActor.getPortfolios();

          if (portfolioData && portfolioData.length > 0) {
              setPortfolio(portfolioData[0][0][1]);

              const tokensOfPortfolio = await portfolioActor.getTokensOfPortfolio(portfolioData[0][0][0]);

              if(tokenCanisterId) {
                fetchTokenTransactions(portfolioData[0][0][1].id, tokenCanisterId)
              }

              if (tokensOfPortfolio?.ok && tokensOfPortfolio.ok.length > 0 && loaded && tokens.length > 0) {
                  const processedPortfolioTokens = processPortfolioTokens(tokensOfPortfolio.ok, tokens);
                  setPortfolioProcessedData(processedPortfolioTokens);
              } else if (tokensOfPortfolio?.err) {
                  console.error("Error fetching portfolio tokens:", tokensOfPortfolio.err);
              }
          } else {
              await migrateOldPortfolios();

              fetchPortfolioData();
          }
      } catch (error) {
          console.error("Error fetching or migrating portfolios:", error);
      }
  };

    const processPortfolioTokens = (portfolioTokens, tokens) => {
        const tokensByCanisterId = tokens.reduce((acc, token) => {
            acc[token.canister_id] = token;
            return acc;
        }, {});

        let totalPortfolioBuyCost = { icp: 0, usd: 0 };
        let totalPortfolioSold = { icp: 0, usd: 0 };
        let totalPortfolioWorth = { icp: 0, usd: 0 };

        const processedTokens = portfolioTokens.reduce((acc, portfolioToken) => {
            const tokenData = tokensByCanisterId[portfolioToken[0].toText()];
            if (tokenData) {
                // If tokenCanisterId is passed, only process the token with the matching canister_id
                if (tokenCanisterId && tokenCanisterId !== portfolioToken[0].toText()) {
                    return acc; // Skip the tokens that don't match the canister_id
                }

                const portfolioTokenDetails = portfolioToken[1];

                const { 
                    total_icp_buy_cost, 
                    total_icp_sold, 
                    total_usd_buy_cost, 
                    total_usd_sold, 
                    total_quantity_bought, 
                    quantity 
                } = portfolioTokenDetails;

                totalPortfolioBuyCost.icp += total_icp_buy_cost;
                totalPortfolioSold.icp += total_icp_sold;
                totalPortfolioBuyCost.usd += total_usd_buy_cost;
                totalPortfolioSold.usd += total_usd_sold;

                const tokenPriceUsd = tokenData.metrics.price?.['usd'] || 0;
                const tokenPriceIcp = tokenData.metrics.price?.['icp'] || 0;
                const tokenWorthUsd = quantity * tokenPriceUsd;
                const tokenWorthIcp = quantity * tokenPriceIcp;

                totalPortfolioWorth.usd += tokenWorthUsd;
                totalPortfolioWorth.icp += tokenWorthIcp;

                acc.push({
                    token: tokenData,
                    total_icp_buy_cost,
                    total_icp_sold,
                    total_usd_buy_cost,
                    total_usd_sold,
                    total_quantity_bought,
                    quantity,
                    tokenWorthUsd,
                    tokenWorthIcp
                });
            }
            return acc;
        }, []);

        return {
            tokens: processedTokens,
            summary: {
                totalPortfolioBuyCost,
                totalPortfolioSold,
                totalPortfolioWorth
            }
        };
    };

    const migrateOldPortfolios = async () => {
        const oldPortfolios = await backendCoreActor.getPortfolios();

        if (oldPortfolios && oldPortfolios.length > 0) {
            for (const oldPortfolio of oldPortfolios[0]) {
                const portfolioName = oldPortfolio.name || 'Unnamed Portfolio';
                const createdAt = Date.now();

                try {
                    const tokensWithTransactions = await Promise.all(oldPortfolio.transactions.map(transformOldTransaction));
                    const validTokensWithTransactions = tokensWithTransactions.filter(Boolean);

                    if (tokensWithTransactions.length !== validTokensWithTransactions.length) {
                        throw new Error("One or more price fetches failed during portfolio migration.");
                    }

                    await portfolioActor.importPortfolio(portfolioName, createdAt, validTokensWithTransactions);
                    const newPortfolio = await portfolioActor.getPortfolios();
                    setPortfolio(newPortfolio[0][0]);

                    const tokensOfPortfolio = await portfolioActor.getTokensOfPortfolio(newPortfolio[0][0][0]);
                } catch (error) {
                    console.error("Error during portfolio migration:", error);
                }
            }
        } else {
            await portfolioActor.createPortfolio("Default");
        }
    };

    const transformOldTransaction = async (transaction) => {
        const tokenPrincipal = Principal.fromText(transaction.canister_id);
        const priceRequest = {
            canister_id: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
            timestamp: transaction.timestamp,
            currency: 'USD'
        };

        try {
            const priceResponse = await fetchPricesNearTimestamps([priceRequest]);

            if (priceResponse[0].status === 200) {
                const icpUsdPrice = parseFloat(priceResponse[0].value);
                return [
                    tokenPrincipal,
                    [{
                        id: [],
                        quantity: transaction.quantity,
                        price_icp: transaction.price_per_token,
                        price_usd: transaction.price_per_token * icpUsdPrice,
                        price_btc: [],
                        timestamp: parseInt(transaction.timestamp),
                        note: transaction.note || '',
                        direction: transaction.direction ? { Buy: null } : { Sell: null }
                    }]
                ];
            } else {
                throw new Error(`Failed to fetch price for transaction ${transaction.id}`);
            }
        } catch (error) {
            console.error("Error in transforming transaction:", error);
            return null;
        }
    };

    const toggleTransactionModal = () => {
        setShowTransactionModal(!showTransactionModal);
    };

    // Function to fetch token transactions
    const fetchTokenTransactions = async (portfolio_id, token_canister_id) => {
      try {
          const transactions = await portfolioActor.getTokenTransactions(portfolio_id, Principal.fromText(token_canister_id));
          if (transactions?.ok) {
              const sortedTransactions = transactions.ok.sort((a, b) => {
                  const timestampA = a[0][1];
                  const timestampB = b[0][1];
        
                  // Sorting in desc order (latest first)
                  return Number(timestampB) - Number(timestampA);
              });
              setTokenTransactions(sortedTransactions);
          } else if (transactions?.err) {
              if(transactions?.err.includes('Token not found')) {
                setTokenTransactions([]);
              } else {
                alert(transactions.err);
              } 
          }
      } catch (error) {
          console.error("Error fetching token transactions:", error);
      }
    };

    const addTransaction = async (token_canister_id, transaction) => {
        try {
          const result = await portfolioActor.addTransactionToPortfolio(
            portfolio.id,
            Principal.fromText(token_canister_id),
            transaction
          );
      
          if (result?.ok) {
            // Refetch portfolio data
            await fetchPortfolioData()

            return result.ok;
          } else if (result?.err) {
            throw new Error(result.err);
          }
        } catch (error) {
          console.error("Error adding transaction:", error);
          throw error;
        }
    };

    return {
        portfolio,
        portfolioProcessedData,
        showTransactionModal,
        toggleTransactionModal,
        loadingState,
        isAuthenticated,
        fetchPortfolioData,
        fetchTokenTransactions,
        addTransaction,
        tokenTransactions,
        loaded
    };
};

export default usePortfolio;
