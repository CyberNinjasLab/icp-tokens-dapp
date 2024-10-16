import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../../ui/components/_base/Layout";
import usePortfolio from "../../../ui/hooks/portfolio/usePortfolio";
import BackLink from "../../../ui/components/_base/BackLink";
import { Button } from "@mui/material";
import AddTransaction from "../../../ui/components/portfolio/AddTransaction";
import TokenLogoAndName from "../../../ui/components/tokens/TokenLogoAndName";
import TokenTransactionsSummary from '../../../ui/components/portfolio/TokenTransactionsSummary';
import LoginMessage from "../../../ui/components/_base/LoginMessage";
import Link from "next/link";
import PortfolioTransactionsTable from "../../../ui/components/portfolio/PortfolioTransactionsTable";

const TokenTransactions = () => {
    const router = useRouter();
    const { tokenCanisterId } = router.query;  // Get tokenCanisterId from the URL
    const [tokenSummary, setTokenSummary] = useState(null);

    const {
        portfolio, 
        portfolioProcessedData, 
        tokenTransactions, 
        fetchPortfolioData, 
        showTransactionModal, 
        toggleTransactionModal,
        addTransaction, 
        isAuthenticated, 
        loaded 
    } = usePortfolio(tokenCanisterId);

    useEffect(() => {
        console.log(tokenTransactions);
        if(Array.isArray(tokenTransactions) && tokenTransactions.length == 0) {
            router.push('/portfolio');
        }
    }, [tokenTransactions])

    useEffect(() => {
        if(portfolioProcessedData) {
            setTokenSummary(portfolioProcessedData.tokens[0]);
        }
    }, [portfolioProcessedData])

    return (
        <>
            <Head>
                <title>Portfolio Transactions - {tokenSummary?.token.name}</title>
            </Head>
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
                    { isAuthenticated && loaded && tokenSummary && (
                        <div>
                            {showTransactionModal && (
                                <AddTransaction
                                    closeModal={toggleTransactionModal}
                                    addTransaction={addTransaction}
                                    selectedCoinId={tokenCanisterId}
                                />
                            )}
                            <div className='mt-4'>
                                <Link href={`/token/${tokenSummary.token.canister_id}`} className="inline-block">
                                    <TokenLogoAndName data={tokenSummary.token} showFullContent={true} />
                                </Link>
                            </div>
                            <div>
                                <TokenTransactionsSummary tokenSummary={portfolioProcessedData} tokenData={tokenSummary} />
                            </div>
                            {tokenTransactions && (
                                <PortfolioTransactionsTable tokenTransactions={tokenTransactions} portfolio={portfolio} tokenCanisterId={tokenCanisterId} fetchPortfolioData={fetchPortfolioData} />
                            )}
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default TokenTransactions;
