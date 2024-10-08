import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../../ui/components/_base/Layout';
import Head from 'next/head';
import LinkRenderer from '../../ui/components/_base/markdown/LinkRenderer';

const ICRC1 = () => {
  return (
    <>
      <Head>
        <title>ICRC-1 Token Standard | ICP Tokens</title>
        <meta name="description" content=""></meta>
      </Head>
      <Layout>
        <div className="markdown-content changelog-wrap max-w-xl mx-auto lg:mt-6 min-h-screen">
          <ReactMarkdown className="markdown-body" components={{ a: LinkRenderer }}>
            {`
# ICRC-1 Token Standard Overview

The **ICRC-1** token standard is a recognized format used on the Internet Computer platform, enabling the creation and management of digital currencies or tokens, similar to those on other blockchain platforms.

## Key Features of ICRC-1 Tokens

- **Token Identification**: Each token has a distinct name and symbol, akin to stock tickers. For instance, a token could be named "MyToken" and have the symbol "MTK".
  
- **Precision**: Tokens can be divided into smaller parts through decimals. For example, a token with 8 decimals can be split up to 100 million times, facilitating the ownership or transfer of fractional amounts.

- **Fees**: There may be a small fee associated with transferring tokens. This fee varies but is typically set to prevent network congestion by discouraging too many trivial transactions.

- **Supply Information**: It's easy to check the total supply of tokens, which provides insights into how many tokens are in circulation.

- **Transfers**: Users can send and receive tokens. During a transfer, you can attach a note (memo) to the transaction, which might help in identifying it later.

- **Additional Details**:
  - Some systems may allow for the creation (minting) or destruction (burning) of tokens through specific accounts.
  - The system can provide various additional token details through metadata, which could include things like the token's official logo or other identifiers.
  
## Extra Technical Bits

The standard includes robust features to ensure reliable transaction processing, such as preventing duplicate transaction recording and gracefully handling errors—for instance, notifying users if a transaction is outdated or erroneously set in the future.

For a more detailed look at the technical aspects and capabilities of the ICRC-1 standard, refer to the **[official documentation on GitHub](https://github.com/dfinity/ICRC-1)**.

This overview gives you a basic understanding of how the ICRC-1 standard functions on the Internet Computer, facilitating everything from daily transactions to more intricate actions like minting and burning tokens.

## Useful Links

- [ICRC-2: Approve & Transfer Token Standard](/standards/ICRC-2)
- [ICRC-3: Block Log Token Standard](/standards/ICRC-3)
            `}
          </ReactMarkdown>
        </div>
      </Layout>
    </>
  );
};

export default ICRC1;
