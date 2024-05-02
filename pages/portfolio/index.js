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

const Portfolio = () => {
    const { backendCoreActor, isAuthenticated } = useContext(AuthContext);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const { setLoadingState, loadingState } = useLoading();
    const { data: tokens, loaded } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens`);
    const [summaries, summarizeTransactions] = useTransactionSummary(tokens); // Using the custom hook

    const toggleTransactionModal = () => {
        setShowTransactionModal(!showTransactionModal);
    };

    const processPortfolios = async (portfoliosRawData) => {
        if (portfoliosRawData[0].length) {
            const summary = await summarizeTransactions(portfoliosRawData[0][0].transactions);

						console.log(summary);
        }
    };

    const fetchPortfolios = async () => {
        if (!backendCoreActor || !isAuthenticated || !tokens) return;

        try {
            let portfoliosData = await backendCoreActor.getPortfolios(); // Adjust this call based on your backend API

            if (!portfoliosData.length) {
                portfoliosData = await createPortfolio('Main');
            }

            await processPortfolios(portfoliosData);
        } catch (err) {
            console.error('Failed to fetch portfolios:', err);
            throw err;
        } finally {
					setLoadingState(false);
				}
    };

    useEffect(() => {
				setLoadingState(true);
        fetchPortfolios();
    }, [backendCoreActor, isAuthenticated, tokens]); // dependencies updated

    const createPortfolio = async (name) => {
        try {
            return await backendCoreActor.createPortfolio(name);
            // Optionally refresh the portfolio list or add to state directly
        } catch (err) {
            console.error(err.message);
        }
    };

    const deletePortfolio = async (index) => {
        try {
            await backendCoreActor.deletePortfolio(index);
            // Optionally refresh the portfolio list or remove from state directly
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
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
                { isAuthenticated && !loadingState && loaded && summaries.tokens && (
                    <div>
                        {showTransactionModal && (
                            <AddTransaction
                                closeModal={toggleTransactionModal}
                                fetchPortfolios={fetchPortfolios}
                                backendCoreActor={backendCoreActor}
                            />
                        )}
                        <PortfolioSummary summary={summaries} />
                        <PortfolioTokensTable tokens={summaries.tokens} />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Portfolio;
