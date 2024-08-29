import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../ui/components/_base/Layout';
import { AuthContext } from '../../contexts/auth/Auth.Context';
import AddTransaction from '../../ui/components/portfolio/AddTransactions';
import { Button } from '@mui/material';
import LoginMessage from '../../ui/components/_base/LoginMessage';
import useFetchTokens from '../../ui/hooks/token/useFetchTokens';
import PortfolioTokensTable from '../../ui/components/portfolio/PortfolioTokensTable';
import useTransactionSummary from '../../ui/hooks/portfolio/useTransactionSummary';
import { useLoading } from '../../contexts/general/Loading.Provider';
import PortfolioSummary from '../../ui/components/portfolio/PortfolioSummary';
import Head from 'next/head';
import { GeneralContext } from '../../contexts/general/General.Context';

const Portfolio = () => {
    const { backendCoreActor, isAuthenticated } = useContext(AuthContext);
    const { currency } = useContext(GeneralContext);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const { setLoadingState, loadingState } = useLoading();
    const { data: tokens, loaded, error } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens?list_all=true`);
    const [summaries, summarizeTransactions] = useTransactionSummary(tokens, currency);

    useEffect(() => {
        if (summarizeTransactions && tokens) {
            const resetSummaries = async () => {
                setLoadingState(true); // Start loading state
    
                const portfoliosData = await backendCoreActor.getPortfolios(); // Fetch portfolios again or use existing data

                try {
                    if (portfoliosData.length && portfoliosData[0].length) {
                        await summarizeTransactions(portfoliosData[0][0].transactions); // Recalculate summaries with the new currency
                    }
                } catch (error) {
                    console.error('Error summarizing transactions:', error);
                } finally {
                    if(portfoliosData.length) {
                        setTimeout(function() {
                            setLoadingState(false); // End loading state after summarization is complete
                        }, 500);
                    }
                }
            };
    
            resetSummaries();
        }
    }, [currency, tokens]); // Add necessary dependencies

    const toggleTransactionModal = () => {
        setShowTransactionModal(!showTransactionModal);
    };

    const processPortfolios = async (portfoliosRawData) => {
        if (portfoliosRawData[0].length) {
            await summarizeTransactions(portfoliosRawData[0][0].transactions);
        }
    };

    const fetchPortfolios = async () => {
        if (!backendCoreActor || !isAuthenticated || !tokens) return;

        try {
            let portfoliosData = await backendCoreActor.getPortfolios(); // Adjust this call based on your backend API

            if (!portfoliosData.length) {
                portfoliosData = [await createPortfolio('Main')];
            }

            await processPortfolios(portfoliosData);

            window.scrollTo(0, 0);
        } catch (err) {
            console.error('Failed to fetch portfolios:', err);
            throw err;
        } finally {
            setLoadingState(false);
        }
    };

    useEffect(() => {
        if(isAuthenticated) {
            setLoadingState(true);
            fetchPortfolios();

            if(error) {
                setLoadingState(false);
            }
        }
    }, [backendCoreActor, isAuthenticated, tokens, error]); // dependencies updated

    const createPortfolio = async (name) => {
        try {
            return await backendCoreActor.createPortfolio(name);
            // Optionally refresh the portfolio list or add to state directly
        } catch (err) {
            console.error(err.message);
        }
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
                        { isAuthenticated && (
                            <Button variant="contained" color="primary" onClick={toggleTransactionModal}>
                                Add Transaction
                            </Button>
                        ) }
                    </div>
                    { !isAuthenticated && <LoginMessage /> }
                    { isAuthenticated && loaded && summaries.tokens && (
                        <div>
                            {showTransactionModal && (
                                    <AddTransaction
                                        closeModal={toggleTransactionModal}
                                        fetchPortfolios={fetchPortfolios}
                                        backendCoreActor={backendCoreActor}
                                />
                            )}
                            <div className={`${loadingState ? 'opacity-0' : ''}`}>
                                <PortfolioSummary summary={summaries} />
                                <PortfolioTokensTable tokens={summaries.tokens}/>
                            </div>
                        </div>
                    )}
            </div>
        </Layout>
        </>
    );
};

export default Portfolio;
