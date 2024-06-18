import React from 'react';
import ReactMarkdown from 'react-markdown';
import Layout from '../../ui/components/_base/Layout';
import Head from 'next/head';
import LinkRenderer from '../../ui/components/_base/markdown/LinkRenderer';

const ICRC1 = () => {
  return (
    <>
      <Head>
        <title>ICRC-2 Token Standard | Approve and Transfer | ICP Tokens</title>
      </Head>
      <Layout>
        <div className="markdown-content changelog-wrap max-w-xl mx-auto lg:mt-6 min-h-screen">
          <ReactMarkdown className="markdown-body" components={{ a: LinkRenderer }}>
            {`
# Overview of ICRC-2 Token Standard

ICRC-2 is an extension of the ICRC-1 standard on the Internet Computer, designed to allow token holders to authorize others to manage their tokens. This could be useful in situations like automatic payments or third-party trading on your behalf.

## Key Features of ICRC-2

- **Approve and Transfer Mechanism**: You can allow another party (like a service or another user) to transfer a certain amount of your tokens to someone else. This two-step process includes:
  1. **Approval**: You specify how many tokens someone else can use. For example, Alice can allow Bob to use up to 100 of her tokens.
  2. **Transfer**: The authorized party (like Bob) can then make transfers within the approved limit without needing further permission for each transaction.

- **Non-transitive Approvals**: If you authorize someone to use your tokens, they can't pass that authorization on to someone else. Only the person or service you directly authorize has the ability to use the tokens.

## Practical Uses

- **Recurring Payments**: You can approve a service to periodically withdraw funds for subscriptions or rent, eliminating the need to manually make each payment.
  
- **Flexible Spending for Services**: If you're using a service that may need to spend tokens on your behalf, like a trading platform, you can set a spending limit they can use as needed, which is useful when costs aren’t fixed upfront.

## How It Works

- **Approval Setting**: You specify how much someone else can spend and possibly an expiration for this approval. You don’t need to have all the tokens you’re authorizing available; just enough to cover any associated fees for setting the approval.
  
- **Making Transfers**: Once authorized, the service or individual can transfer tokens from your account to any other account until they hit the limit you've set.

- **Transaction Conditions**: Several checks ensure the security of transactions:
  - The system checks whether the allowed amount of tokens or the approval hasn’t expired.
  - Transactions will be declined if the amount exceeds what was authorized or if token balances are insufficient to cover a transaction and fees.

## Examples

- **Alice and a Subscription Service**: Alice approves a subscription service to withdraw a set amount each month for her subscription. The service then makes monthly withdrawals without further input from Alice.

- **Alice, Bob, and Trading**: Alice authorizes Bob to use up to a certain amount of tokens for trading. Bob can make trades on Alice’s behalf until he reaches the spending limit Alice set.

## Benefits

This standard simplifies interactions where you might not want to manage every transaction personally but need a secure way to allow others to handle tokens for you. It's a foundation for more complex and automated interactions within the Internet Computer ecosystem, enabling a richer experience in decentralized finance and beyond.

## Useful Links

- [ICRC-1: base fungible token standard](/standards/ICRC-1)
- [ICRC-2: the official token standard documentation](https://github.com/dfinity/ICRC-1/tree/main/standards/ICRC-2)
            `}
          </ReactMarkdown>
        </div>
      </Layout>
    </>
  );
};

export default ICRC1;
