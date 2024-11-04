import { gql } from 'graphql-request';

export const TOKEN_DATA_QUERY = gql`
  query TokenData($tokenId: ID!, $now: Int!, $weekAgo: Int!, $dayAgo: Int!) {
    token(id: $tokenId) {
      ...TokenHeader
      volume24Hr(timestamps: [$dayAgo, $now])
      transactions24Hr(timestamps: [$dayAgo, $now])
      totalLiquidity
      derivedPrice
      pairBase {
        ...PairTable
        __typename
      }
      pairQuote {
        ...PairTable
        __typename
      }
      __typename
    }
    tokenDayData(id: $tokenId, dateTo: $now, dateFrom: 0) {
      dailyVolumeUSD
      totalLiquidityUSD
      priceUSD
      dailyTxs
      date
      __typename
    }
    bundle(id: 1) {
      icpPrice
      __typename
    }
  }

  fragment TokenHeader on Token {
    id
    symbol
    name
    __typename
  }

  fragment PairTable on Pair {
    id
    token0 {
      ...TokenHeader
      __typename
    }
    token1 {
      ...TokenHeader
      __typename
    }
    reserveICP
    token0Price
    token1Price
    reserveUSD
    volume24Hr(timestamps: [$now])
    pairDayData(dateTo: $now, dateFrom: $weekAgo) {
      dailyVolumeUSD
      date
      reserveUSD
      __typename
    }
    __typename
  }
`;

export const TOKENS_DATA_QUERY = gql`
  query TokensData($now: Int!, $twoDaysAgo: Int!, $limit: Int = 200) {
    tokens(limit: $limit) {
      ...TokenTable
      __typename
    }
    bundle(id: 1) {
      icpPrice
      __typename
    }
  }

  fragment TokenTable on Token {
    ...TokenHeader
    totalLiquidity
    derivedPrice
    volume24Hr(timestamps: [$now])
    tokenDayData(toDate: $now, fromDate: $twoDaysAgo) {
      dailyVolumeUSD
      priceUSD
      __typename
    }
    __typename
  }

  fragment TokenHeader on Token {
    id
    symbol
    name
    __typename
  }
`;