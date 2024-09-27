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
    const { data: tokens, loaded } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens?list_all=true`);
    const [summaries, summarizeTransactions] = useTransactionSummary(tokens, currency);

    const fetchAndSummarizePortfolios = async () => {
        if (!backendCoreActor || !isAuthenticated || !tokens) return;

        setLoadingState(true);

        try {
            let portfoliosData = await backendCoreActor.getPortfolios();

            if (!portfoliosData.length) {
                portfoliosData = [await createPortfolio('Main')];
            }

            if (portfoliosData.length && portfoliosData[0].length) {
                await summarizeTransactions(portfoliosData[0][0].transactions);
            }
        } catch (error) {
            console.error('Error fetching portfolios or summarizing transactions:', error);
        } finally {
            setLoadingState(false);
        }
    };

    const createPortfolio = async (name) => {
        try {
            return await backendCoreActor.createPortfolio(name);
            // Optionally refresh the portfolio list or add to state directly
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchAndSummarizePortfolios();
        }
    }, [isAuthenticated, tokens, currency]); // Ensure summarize only when necessary

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
                        { isAuthenticated && (
                            <Button variant="contained" color="primary" onClick={toggleTransactionModal}>
                                Add Transaction
                            </Button>
                        )}
                    </div>
                    { !isAuthenticated && <LoginMessage /> }
                    { isAuthenticated && loaded && (
                        <div>
                            {showTransactionModal && (
                                <AddTransaction
                                    closeModal={toggleTransactionModal}
                                    fetchPortfolios={fetchAndSummarizePortfolios}
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