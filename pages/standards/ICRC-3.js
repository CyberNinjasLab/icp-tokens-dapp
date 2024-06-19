import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../../ui/components/_base/Layout';
import Head from 'next/head';
import LinkRenderer from '../../ui/components/_base/markdown/LinkRenderer';

const ICRC1 = () => {
  return (
    <>
      <Head>
        <title>ICRC-3 Block Log Token Standard | ICP Tokens</title>
      </Head>
      <Layout>
        <div className="markdown-content changelog-wrap max-w-xl mx-auto lg:mt-6 min-h-screen">
          <ReactMarkdown className="markdown-body" components={{ a: LinkRenderer }}>
            {`
# Overview of ICRC-3 Token Standard

ICRC-3 is an extension of the ICRC-1 and ICRC-2 standards on the Internet Computer, specifically aimed at handling and verifying block logs. This means ICRC-3 allows users and applications to track and validate the history of transactions on the blockchain in a transparent and secure manner.

## Key Features of ICRC-3

- **Archive Nodes**: ICRC-3 provides a method to access nodes containing historical blocks of transactions, which is useful for verifying past activities and auditing.

- **Block Log**: This is essentially a record of all transactions, where each block in the log points back to its predecessor, creating a linked list of blocks. Each block is verified against its parent, ensuring the integrity of the blockchain.

- **Client-side Verification**: Users can verify blocks on their own, ensuring the data they receive has not been tampered with. This is crucial for trust in the system.

- **Extensibility**: ICRC-3 is designed to be compatible with future transaction types and blockchain innovations, making it a forward-looking standard.

## How It Works

- **Fetching Archive Nodes**: You can retrieve a list of all the archive nodes that contain the blocks of the ledger, giving you access to the entire history of the ledger.

- **Accessing the Block Log**: The block log can be accessed in a format that ensures no information is lost during transmission between servers and clients. This is important for audits and verifying the integrity of the blockchain.

- **Verifying Block Logs**: The standard provides a mechanism for clients to verify each block by checking its hash against the parent's hash. This ensures that each block in the chain is authentic and unaltered.

- **Support for New Standards**: ICRC-3 allows for the integration of new transaction types, ensuring the ledger can adapt to future needs without compatibility issues.

## Practical Uses

- **Auditing**: Financial institutions or any party requiring audits can use ICRC-3 to verify transactions over specific periods, ensuring all activities are recorded accurately.

- **Data Integrity**: Users can verify the authenticity of transaction records themselves, enhancing trust in the platform.

- **Compliance**: Organizations needing to comply with regulatory requirements for data transparency and integrity can leverage ICRC-3 to maintain and prove compliance.

## Benefits

This standard enhances the transparency and reliability of the Internet Computer's ledger, providing tools necessary for verifying historical data and ensuring that the blockchain's integrity is maintained over time. It supports future blockchain developments and helps integrate new types of transactions seamlessly into the ecosystem.

## Useful Links

- [ICRC-1](/standards/ICRC-1) - ICRC-1: base fungible token standard
- [ICRC-2](/standards/ICRC-2) - ICRC-2 Approve and Transfer From
- [ICRC-3](https://github.com/dfinity/ICRC-1/blob/main/standards/ICRC-3) - ICRC-3: the official token standard documentation
            `}
          </ReactMarkdown>
        </div>
      </Layout>
    </>
  );
};

export default ICRC1;
