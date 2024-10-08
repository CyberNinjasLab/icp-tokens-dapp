import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../ui/components/_base/Layout';
import { useLoading } from '../contexts/general/Loading.Provider';
import Head from 'next/head';

const Changelog = () => {
  const [markdown, setMarkdown] = useState('');
  const { setLoadingState } = useLoading();

  useEffect(() => {
    setLoadingState(true);
    fetch('/CHANGELOG.md')
      .then(response => response.text())
      .then(data => {
        setMarkdown(data);
      })
      .catch(error => console.error('Error fetching CHANGELOG.md:', error))
      .finally(() => {
        setTimeout(function() {
          setLoadingState(false);
        }, 600);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Changelog | ICP Tokens by Market Cap</title>
        <meta name="description" content="Stay updated with the latest improvements and new features on ICP Tokens. Check out our changelog for continuous platform enhancements and updates."></meta>
      </Head>
      <Layout>
        <div className="markdown-content changelog-wrap max-w-xl mx-auto lg:mt-6 min-h-screen">
          <ReactMarkdown className="markdown-body">{markdown}</ReactMarkdown>
        </div>
      </Layout>
    </>
  );
};

export default Changelog;
