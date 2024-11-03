export const idlFactory = ({ IDL }) => {
  const Transaction = IDL.Record({
    'id' : IDL.Nat,
    'direction' : IDL.Bool,
    'note' : IDL.Text,
    'canister_id' : IDL.Text,
    'price_per_token' : IDL.Float64,
    'timestamp' : IDL.Int,
    'quantity' : IDL.Float64,
  });
  const Portfolio = IDL.Record({
    'name' : IDL.Text,
    'transactions' : IDL.Vec(Transaction),
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'createdAt' : IDL.Opt(IDL.Int),
    'twitterAcc' : IDL.Text,
  });
  const WatchlistId = IDL.Text;
  return IDL.Service({
    'addPortfolioTransaction' : IDL.Func(
        [IDL.Nat, Transaction],
        [IDL.Opt(Transaction)],
        [],
      ),
    'createPortfolio' : IDL.Func([IDL.Text], [IDL.Opt(Portfolio)], []),
    'createUser' : IDL.Func([], [IDL.Opt(User)], []),
    'deletePortfolio' : IDL.Func([IDL.Nat], [IDL.Bool], []),
    'editPortfolioTransaction' : IDL.Func(
        [IDL.Nat, IDL.Nat, Transaction],
        [IDL.Opt(Transaction)],
        [],
      ),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getCurrentUser' : IDL.Func([], [IDL.Opt(User)], ['query']),
    'getPortfolios' : IDL.Func([], [IDL.Opt(IDL.Vec(Portfolio))], ['query']),
    'getTradingViewChartData' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
    'getWatchlist' : IDL.Func([], [IDL.Opt(IDL.Vec(WatchlistId))], ['query']),
    'removePortfolioTransaction' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Bool], []),
    'storeTradingViewChartData' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Text, IDL.Text],
        [],
      ),
    'updateWatchlist' : IDL.Func(
        [IDL.Vec(WatchlistId)],
        [IDL.Vec(WatchlistId)],
        [],
      ),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
