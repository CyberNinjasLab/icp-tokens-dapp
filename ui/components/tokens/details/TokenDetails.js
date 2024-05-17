import React from 'react';
import ReactMarkdown from 'react-markdown';

// Define the TokenDetails component
const TokenDetails = ({ data }) => {
  // Check if long_description exists and render it using ReactMarkdown
  const renderLongDescription = () => {
    if (data.details && data.details.long_description) {
      return <ReactMarkdown className="mt-12">{data.details.long_description}</ReactMarkdown>;
    }
    return null; // Return null if long_description does not exist
  };

  // Render token details
  return (
    <div className='markdown-content'>
      {renderLongDescription()}
    </div>
  );
};

export default TokenDetails;
