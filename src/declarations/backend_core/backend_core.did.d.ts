import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Portfolio {
  'name' : string,
  'transactions' : Array<Transaction>,
}
export interface Transaction {
  'id' : bigint,
  'direction' : boolean,
  'note' : string,
  'canister_id' : string,
  'price_per_token' : number,
  'timestamp' : bigint,
  'quantity' : number,
}
export interface User {
  'id' : Principal,
  'createdAt' : [] | [bigint],
  'twitterAcc' : string,
}
export type WatchlistId = string;
export interface _SERVICE {
  'addPortfolioTransaction' : ActorMethod<
    [bigint, Transaction],
    [] | [Transaction]
  >,
  'createPortfolio' : ActorMethod<[string], [] | [Portfolio]>,
  'createUser' : ActorMethod<[], [] | [User]>,
  'deletePortfolio' : ActorMethod<[bigint], boolean>,
  'editPortfolioTransaction' : ActorMethod<
    [bigint, bigint, Transaction],
    [] | [Transaction]
  >,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getCurrentUser' : ActorMethod<[], [] | [User]>,
  'getPortfolios' : ActorMethod<[], [] | [Array<Portfolio>]>,
  'getTradingViewChartData' : ActorMethod<[string], [] | [[string, string]]>,
  'getWatchlist' : ActorMethod<[], [] | [Array<WatchlistId>]>,
  'removePortfolioTransaction' : ActorMethod<[bigint, bigint], boolean>,
  'storeTradingViewChartData' : ActorMethod<[string, string], [string, string]>,
  'updateWatchlist' : ActorMethod<[Array<WatchlistId>], Array<WatchlistId>>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
