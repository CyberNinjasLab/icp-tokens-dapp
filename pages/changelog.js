import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../ui/components/_base/Layout';

const Changelog = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/CHANGELOG.md')
      .then(response => response.text())
      .then(data => {
        setMarkdown(data);
      })
      .catch(error => console.error('Error fetching CHANGELOG.md:', error));
  }, []);

  return (
    <Layout>
      <div className="markdown-content max-w-xl mx-auto lg:mt-6">
        <ReactMarkdown className="markdown-body">{markdown}</ReactMarkdown>
      </div>
    </Layout>
  );
};

export default Changelog;
