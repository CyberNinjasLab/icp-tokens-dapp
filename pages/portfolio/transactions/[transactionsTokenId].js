import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../../ui/components/_base/Layout';
import { AuthContext } from '../../../contexts/auth/Auth.Context';
import AddTransaction from '../../../ui/components/portfolio/AddTransactions';
import { Button } from '@mui/material';
import LoginMessage from '../../../ui/components/_base/LoginMessage';
import useFetchTokens from '../../../ui/hooks/token/useFetchTokens';
import { useLoading } from '../../../contexts/general/Loading.Provider';
import BackLink from '../../../ui/components/_base/BackLink';
import { useRouter } from 'next/router';
import PortfolioTransactionsTable from '../../../ui/components/portfolio/PortfolioTransactionsTable';
import TokenLogoAndName from '../../../ui/components/tokens/TokenLogoAndName';
import useTransactionSummary from '../../../ui/hooks/portfolio/useTransactionSummary';
import TokenTransactionsSummary from '../../../ui/components/portfolio/TokenTransactionsSummary';
import { GeneralContext } from '../../../contexts/general/General.Context';

const Transactions = () => {
    const router = useRouter();
    const { transactionsTokenId } = router.query;
    const { backendCoreActor, isAuthenticated } = useContext(AuthContext);
    const { currency } = useContext(GeneralContext);
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const { setLoadingState } = useLoading();
    const { data: tokens, loaded, error } = useFetchTokens(`${process.env.NEXT_PUBLIC_WEB2_API_URL}/api/tokens?list_all=true`);
    const [token, setToken] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [summaries, summarizeTransactions] = useTransactionSummary(tokens, currency);

    const toggleTransactionModal = () => {
        setShowTransactionModal(!showTransactionModal);
    };

    const processPortfolios = async (portfoliosRawData) => {
        const filteredTransactions = [];
        if (portfoliosRawData[0].length && portfoliosRawData[0][0].transactions) {
            for (const transaction of portfoliosRawData[0][0].transactions) {
                if (transaction.canister_id === transactionsTokenId) {
                    filteredTransactions.push(transaction);
                }
            }
            if (filteredTransactions.length === 0) {
                router.push('/portfolio');
            } else {
                // Sort the filtered transactions by timestamp
                filteredTransactions.sort((a, b) => {
                    // Convert BigInts to strings and compare numerically
                    if (BigInt(a.timestamp) < BigInt(b.timestamp)) {
                        return 1;
                    } else if (BigInt(a.timestamp) > BigInt(b.timestamp)) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                  
                setTransactions(filteredTransactions); // Update state with sorted transactions
                await summarizeTransactions(filteredTransactions); // Await the summarizatio
            }
        }
    };

    const fetchPortfolios = async () => {
        if (!backendCoreActor || !isAuthenticated || !tokens) return;

        try {
            const portfoliosData = await backendCoreActor.getPortfolios(); // Adjust this call based on your backend API
            if (!portfoliosData.length) {
                router.push('/portfolio');
            } else {
                await processPortfolios(portfoliosData);
            }
        } catch (err) {
            console.error('Failed to fetch portfolios:', err);
            throw err;
        } finally {
            setLoadingState(false); // Ensure loading state is reset after all async operations
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        if(loaded && tokens) {
            const currentToken = tokens.find(coin => coin.canister_id === transactionsTokenId);
            setToken(currentToken);
        }
    }, [loaded, tokens, transactionsTokenId]);

    useEffect(() => {
        if(isAuthenticated === true) {
            setLoadingState(true);
            fetchPortfolios();

            if(error) {
                setLoadingState(false);
            }
        } else {
            if(isAuthenticated === false) {
                router.push('/portfolio');
            }
        }
    }, [backendCoreActor, isAuthenticated, tokens, error]);

    // Re-summarize transactions when currency or tokens change
    useEffect(() => {
        if (summarizeTransactions && transactions.length > 0) {
            const resetSummaries = async () => {
                setLoadingState(true); // Start loading state
    
                try {
                    await summarizeTransactions(transactions); // Recalculate summaries with the new currency
                } catch (error) {
                    console.error('Error summarizing transactions:', error);
                } finally {
                    setLoadingState(false); // End loading state after summarization is complete
                }
            };
    
            resetSummaries();
        }
    }, [currency, tokens]);

    return (
        <Layout>
            <div className='min-h-[300px]'>
                <div className="flex justify-between items-center">
                    <BackLink to={'/portfolio'} text={'Back'} />
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
                                selectedCoinId={transactionsTokenId}
                            />
                        )}
                        <div className='mt-4'>
                            <TokenLogoAndName data={token} showFullContent={true} />
                        </div>
                        <div>
                            <TokenTransactionsSummary summary={summaries} token={token} />
                        </div>
                        {summaries.tokens.length && (
                            <PortfolioTransactionsTable summary={summaries} fetchPortfolios={fetchPortfolios} />
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Transactions;
