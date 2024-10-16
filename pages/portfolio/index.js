import React from "react";
import Head from "next/head";
import Layout from "../../ui/components/_base/Layout";
import LoginMessage from "../../ui/components/_base/LoginMessage";
import { Button } from "@mui/material";
import PortfolioSummary from '../../ui/components/portfolio/PortfolioSummary';
import PortfolioTokensTable from "../../ui/components/portfolio/PortfolioTokensTable";
import AddTransaction from "../../ui/components/portfolio/AddTransaction";
import usePortfolio from "../../ui/hooks/portfolio/usePortfolio";
import PortfolioPieChart from "../../ui/components/portfolio/PortfolioPieChart";

const Portfolio = () => {
    const { 
        portfolio,
        portfolioProcessedData, 
        addTransaction,
        showTransactionModal, 
        toggleTransactionModal, 
        loadingState, 
        isAuthenticated, 
        loaded 
    } = usePortfolio();

    return (
        <>
            <Head>
                <title>Portfolio | ICP Tokens</title>
                <meta name="description" content="Manage your ICP Tokens portfolio effortlessly. Track token performance, monitor gains, and make informed decisions within the Internet Computer ecosystem"></meta>
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
                                    closeModal={toggleTransactionModal} addTransaction={addTransaction}
                                />
                            )}
                            <div className={`${loadingState ? 'opacity-0' : ''}`}>
                                <PortfolioSummary data={portfolioProcessedData} />
                                <PortfolioPieChart tokens={portfolioProcessedData ? portfolioProcessedData.tokens : []} />
                                <PortfolioTokensTable tokens={portfolioProcessedData ? portfolioProcessedData.tokens : []} portfolio={portfolio} />
                            </div>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Portfolio;
