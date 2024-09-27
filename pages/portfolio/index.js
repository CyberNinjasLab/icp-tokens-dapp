import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/auth/Auth.Context";
import Head from "next/head";
import Layout from "../../ui/components/_base/Layout";
import LoginMessage from "../../ui/components/_base/LoginMessage";
import { Button } from "@mui/material";
import { GeneralContext } from "../../contexts/general/General.Context";
import { useLoading } from "../../contexts/general/Loading.Provider";
import useFetchTokens from "../../ui/hooks/token/useFetchTokens";
import { Principal } from "@dfinity/principal";
import usePriceNearTimestamp from "../../ui/hooks/token/usePriceNearTimestamp";

const Portfolio = () => {
    const { backendCoreActor, portfolioActor, isAuthenticated } = useContext(AuthContext);
    const { currency } = useContext(GeneralContext);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const { loadingState, setLoadingState } = useLoading();
    const { data: tokens, loaded } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`);
    const { fetchPricesNearTimestamps } = usePriceNearTimestamp();
    
    const [portfolio, setPortfolio] = useState(null);
    const [portfolioTokens, setPortfolioTokens] = useState([]);

    // Effect to fetch or migrate portfolio data when authentication status changes
    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                const portfolioData = await portfolioActor.getPortfolios();
    
                if (portfolioData && portfolioData.length > 0) {
                    setPortfolio(portfolioData[0][0]);

                    console.log('Portfolio', portfolioData);
                    
                    const tokensOfPortfolio = await portfolioActor.getTokensOfPortfolio(portfolioData[0][0][0]);
    
                    // Check if tokensOfPortfolio and tokens are ready
                    if (tokensOfPortfolio?.ok && tokensOfPortfolio.ok.length > 0 && loaded && tokens.length > 0) {
                        setPortfolioTokens(tokensOfPortfolio.ok);
    
                        // Process and filter portfolio tokens once tokens are fetched
                        const processedPortfolioTokens = processPortfolioTokens(tokensOfPortfolio.ok, tokens);

                        console.log(processedPortfolioTokens);
    
                        // Calculate current worth based on the processed tokens
                        const totalWorth = calculateCurrentWorth(processedPortfolioTokens, currency);
                        console.log("Total Portfolio Worth:", totalWorth);
                    } else if (tokensOfPortfolio?.err) {
                        console.error("Error fetching portfolio tokens:", tokensOfPortfolio.err);
                    }
                } else {
                    await migrateOldPortfolios();
                }
            } catch (error) {
                console.error("Error fetching or migrating portfolios:", error);
            }
        };
    
        // Only fetch portfolio data if authenticated and tokens are fetched
        if (isAuthenticated && loaded && tokens.length > 0) {
            fetchPortfolioData();
        }

        console.log(isAuthenticated, loaded, tokens, currency);
    }, [isAuthenticated, loaded, tokens, currency]); // Added loaded and tokens as dependencies  

    // This function filters and processes the portfolio tokens before calculating the worth
    const processPortfolioTokens = (portfolioTokens, tokens) => {
        const tokensByCanisterId = tokens.reduce((acc, token) => {
            acc[token.canister_id] = token;
            return acc;
        }, {});

        const filteredTokens = portfolioTokens.reduce((acc, portfolioToken) => {
            const tokenData = tokensByCanisterId[portfolioToken[0].toText()];
            if (tokenData) {
                // Add the portfolio token to the accumulator if its token is found
                acc.push({
                    ...portfolioToken,
                    tokenData
                });
            }
            return acc;
        }, []);

        return filteredTokens; // Return the filtered portfolio tokens
    };

    const calculateCurrentWorth = (processedPortfolioTokens, currency) => {
        return processedPortfolioTokens.reduce((totalWorth, portfolioToken) => {
            const tokenPrice = portfolioToken.tokenData.metrics.price?.[currency] || 0; // Get token price
            const tokenWorth = portfolioToken[1].quantity * tokenPrice; // Calculate worth
            return totalWorth + tokenWorth; // Accumulate total worth
        }, 0);
    };

    // Function to migrate old portfolios to new architecture
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
                    // Fetch the portfolio again after migration
                    const newPortfolio = await portfolioActor.getPortfolios();
                    setPortfolio(newPortfolio[0][0]); // Update state with the newly imported portfolio
                    
                    // Fetch tokens for the newly imported portfolio
                    const tokensOfPortfolio = await portfolioActor.getTokensOfPortfolio(newPortfolio[0][0][0]);
                    setPortfolioTokens(tokensOfPortfolio);
                } catch (error) {
                    console.error("Error during portfolio migration:", error);
                }
            }
        } else {
            await portfolioActor.createPortfolio("Default");
        }
    };

    // Transform old transaction data for new architecture, including fetching prices
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
                        price_btc: [], // Assuming BTC price isn't needed or fetched
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
            return null; // or throw error to stop the migration
        }
    };

    // Toggle function for transaction modal
    const toggleTransactionModal = () => {
        setShowTransactionModal(!showTransactionModal);
    };

    return (
        <>
            <Head>
                <title>Portfolio | ICP Tokens</title>
            </Head>
            <Layout>
                <div className='min-h-[300px]'>
                    <div className="flex justify-between items-center">
                        <h1 className="h1">My Portfolio</h1>
                        {isAuthenticated && (
                            <Button variant="contained" color="primary" onClick={toggleTransactionModal}>
                                Add Transaction
                            </Button>
                        )}
                    </div>
                    {!isAuthenticated && <LoginMessage />}
                    {isAuthenticated && loaded && (
                        <div>
                            {showTransactionModal && (
                                <AddTransaction
                                    closeModal={toggleTransactionModal}
                                />
                            )}
                            <div className={`${loadingState ? 'opacity-0' : ''}`}>
                                {/* Display portfolio and tokens here */}
                                {portfolio && (
                                    <div>
                                        <h2>{portfolio.name}</h2>
                                        {/* Map over portfolioTokens to display them */}
                                        
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Portfolio;
