import { gql } from 'graphql-request';

export const TOKEN_DATA_QUERY = gql`
  query TokenData($tokenId: ID!, $timestamps: [Int!]!, $dateFrom: Int!, $dateTo: Int!) {
    token(id: $tokenId) {
      ...TokenHeader
      totalSupply
      totalLiquidity
      derivedPrice
      fee24Hr
      volume(timestamps: $timestamps)
      pairBase {
        ...PairTable
        __typename
      }
      pairQuote {
        ...PairTable
        __typename
      }
      addLiquidity {
        ...AddLiquidityTransactions
        __typename
      }
      removeLiquidity {
        ...RemoveLiquidityTransactions
        __typename
      }
      swaps {
        ...SwapTransactions
        __typename
      }
      __typename
    }
    bundle(id: 1) {
      icpPrice
      __typename
    }
    tokenDayData(id: $tokenId, dateFrom: $dateFrom, dateTo: $dateTo) {
      id
      totalLiquidityUSD
      dailyVolumeUSD
      priceUSD
      date
      __typename
    }
  }

  fragment PairHeader on Pair {
    token0 {
      id
      name
      symbol
      __typename
    }
    token1 {
      id
      name
      symbol
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

  fragment PairTable on Pair {
    ...PairHeader
    poolId
    fee
    reserveICP
    reserveUSD
    volume(timestamps: $timestamps)
    pairDayData(dateFrom: $dateFrom, dateTo: $dateTo) {
      dailyVolumeICP
      dailyVolumeUSD
      __typename
    }
    __typename
  }

  fragment AddLiquidityTransactions on AddLiquidity {
    pair {
      ...PairHeader
      __typename
    }
    amount0
    amount1
    amountUSD
    timestamp
    liquidityProvider
    __typename
  }

  fragment RemoveLiquidityTransactions on RemoveLiquidity {
    pair {
      ...PairHeader
      __typename
    }
    amount0
    amount1
    amountUSD
    timestamp
    liquidityProvider
    __typename
  }

  fragment SwapTransactions on Swap {
    pair {
      ...PairHeader
      __typename
    }
    tokenInAddr
    tokenOutAddr
    amountUSD
    amount0In
    amount0Out
    amount1In
    amount1Out
    caller
    timestamp
    __typename
  }
`;

export const TOKENS_DATA_QUERY = gql`
  query TokensData($dateFrom: Int!, $dateTo: Int!, $timestamps: [Int!]!, $limit: Int, $desc: Boolean) {
    tokens(limit: $limit, desc: $desc) {
      ...TokenTable
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

  fragment TokenTable on Token {
    ...TokenHeader
    totalLiquidity
    derivedPrice
    volume(timestamps: $timestamps)
    tokenDayData(dateFrom: $dateFrom, dateTo: $dateTo) {
      id
      totalLiquidityUSD
      dailyVolumeUSD
      priceUSD
      date
      __typename
    }
    __typename
  }
`;