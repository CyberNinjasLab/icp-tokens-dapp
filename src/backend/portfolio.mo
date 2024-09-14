import Nat64 "mo:base/Nat64";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Bool "mo:base/Bool";

actor Portfolio {
  // Types
  public type Result<Ok, Err> = Result.Result<Ok, Err>;
  public type HashMap<K, V> = HashMap.HashMap<K, V>;

  public type Direction = { #Buy; #Sell; #Transfer };

  public type Transaction = {
    id: ?Nat;
    quantity: Float;
    price_per_token_icp: Float; // ICP Price
    price_per_token_usd: Float; // USD Price
    price_per_token_btc: Float; // BTC Price
    timestamp: Int;
    note: Text;
    direction: Direction; // True for buy, False for sell
  };

  public type Token = {
    id: Nat;
    portfolio_owner_id: Principal; // Store portfolio owner Principal
    canister_id: Principal; // Token contract address
    quantity: Float;
    next_transaction_id: Nat;
  };

  public type Portfolio = {
    id: Nat;
    name: Text;
    created_at: Int;
  };

  public type PortfolioList = HashMap<Principal, HashMap<Nat, Portfolio>>;
  public type PortfolioTokens = HashMap<Nat, HashMap<Principal, Token>>;
  public type PortfolioTokenTransactions = HashMap<Nat, HashMap<Nat, Transaction>>;

  // Repository
  // WARNING: Consider splitting the dataset into multiple canisters if it grows too large.
  stable var portfolioListRepository: [(Principal, [(Nat, Portfolio)])] = [];
  stable var portfolioTokenRepository: [(Nat, [(Principal, Token)])] = [];
  stable var portfolioTokenTransactionRepository: [(Nat, [(Nat, Transaction)])] = []; // Added missing type

  // Store next repository ID
  stable var nextPortfolioId: Nat = 1;
  stable var nextTokenId: Nat = 1;
  stable var nextTransactionId: Nat = 1;

  // Store count of the total number of portfolios
  stable var totalPortfolioCount: Nat = 0;

  // Variables
  let portfolioList : PortfolioList = HashMap.HashMap<Principal, HashMap.HashMap<Nat, Portfolio>>(100, Principal.equal, Principal.hash);
  let portfolioTokens : PortfolioTokens = HashMap.HashMap<Nat, HashMap<Principal, Token>>(100, Nat.equal, Hash.hash);
  let portfolioTokenTransactions : PortfolioTokenTransactions = HashMap.HashMap<Nat, HashMap<Nat, Transaction>>(100, Nat.equal, Hash.hash);

  // Portfolio Functions
  public shared (msg) func createPortfolio(name: Text) : async Result<Portfolio, Text> {
    let portfoliosResult = portfolioList.get(msg.caller);
    
    let newPortfolio: Portfolio = {
      id = nextPortfolioId;
      name = name;
      created_at = Time.now();
    };

    switch (portfoliosResult) {
      case (null) {
        // If there are no portfolios for this caller, create a new one
        let newMap = HashMap.HashMap<Nat, Portfolio>(3, Nat.equal, Hash.hash);
        newMap.put(nextPortfolioId, newPortfolio);
        portfolioList.put(msg.caller, newMap);
      };
      case (?existingPortfolios) {
        if (existingPortfolios.size() >= 3) {
          // Limit the number of portfolios to 3 per user
          return #err("You have reached the maximum limit of 3 portfolios.");
        };

        // Add new portfolio to the existing map
        existingPortfolios.put(nextPortfolioId, newPortfolio);
        portfolioList.put(msg.caller, existingPortfolios);
      };
    };

    // Increment the portfolio:
    // - ID counter
    // - Total count
    nextPortfolioId += 1;
    totalPortfolioCount += 1;
    
    return #ok(newPortfolio);
  };

  private func addTokenToPortfolio(caller_principal: Principal, portfolio_id: Nat, token_canister_id: Principal) : Result<(Token), Text> {
    let portfoliosResult = portfolioList.get(caller_principal);

    switch (portfoliosResult) {
      case (null) {
        return #err("Create portfolio before add token.");
      };
      case (?existingPortfolios) {
        let portfolioResult = existingPortfolios.get(portfolio_id);

        switch(portfolioResult) {
          case (null) {
            return #err("Portfolio doesn not exists!");
          };
          case (?existingPortfolio) {
            let tokensResult = portfolioTokens.get(portfolio_id);
            var tokensMap : HashMap<Principal, Token> = HashMap.HashMap<Principal, Token>(10, Principal.equal, Principal.hash);

            switch (tokensResult) {
              case (null) {};
              case (?existingTokens) {
                let token = existingTokens.get(token_canister_id);

                tokensMap := existingTokens;

                switch (token) {
                  case (null) {};
                  case (?existingToken) {
                    return #ok(existingToken);
                  }
                }
              }
            };

            let newToken : Token = {
              id = nextTokenId;
              portfolio_owner_id = caller_principal;
              canister_id = token_canister_id;
              quantity = 0;
              next_transaction_id = 1;
            };

            tokensMap.put(token_canister_id, newToken);
            portfolioTokens.put(portfolio_id, tokensMap);
            nextTokenId += 1;

            return #ok(newToken);
          };
        };
      }
    }
  };

  public shared (msg) func addTransactionToPortfolio(portfolio_id: Nat, token_canister_id: Principal, transaction: Transaction) : async Result<Transaction, Text> {
    // Find the portfolio for the caller
    let portfoliosResult = portfolioList.get(msg.caller);

    switch (portfoliosResult) {
      case (null) {
        return #err("No portfolios found for this user. Please create a portfolio to proceed.");
      };
      case (?existingPortfolios) {
        let portfolioResult = existingPortfolios.get(portfolio_id);

        switch (portfolioResult) {
          case (null) {
            return #err("Portfolio not found. Ensure you're using the correct portfolio ID.");
          };
          case (?existingPortfolio) {
            // Add the token to the portfolio if it doesn't exist
            let tokenResult = addTokenToPortfolio(msg.caller, portfolio_id, token_canister_id);

            switch (tokenResult) {
              case (#err(err)) {
                return #err(err);
              };
              case (#ok(token)) {
                // Proceed to get or create the transaction map for the token
                let tokenTransactionsResult = portfolioTokenTransactions.get(token.id);

                var transactionMap: HashMap<Nat, Transaction> = HashMap.HashMap<Nat, Transaction>(100, Nat.equal, Hash.hash);

                switch (tokenTransactionsResult) {
                  case (null) {
                    // Initialize the transaction map for this token
                    portfolioTokenTransactions.put(token.id, transactionMap);
                  };
                  case (?existingTransactions) {
                    // Use existing transactions for this token
                    transactionMap := existingTransactions;
                  };
                };

                let portfolioAllTokens = portfolioTokens.get(portfolio_id);

                switch (portfolioAllTokens) {
                  case (null) {
                    return #err("This portfolio does not contain any tokens. Please add tokens before proceeding.");
                  };
                  case (?existingTokenList) {
                    // Add the new transaction with the next available transaction ID
                    let newTransaction: Transaction = {
                      id = ?token.next_transaction_id;
                      quantity = transaction.quantity;
                      price_per_token_icp = transaction.price_per_token_icp;
                      price_per_token_usd = transaction.price_per_token_usd;
                      price_per_token_btc = transaction.price_per_token_btc;
                      timestamp = transaction.timestamp;
                      note = transaction.note;
                      direction = transaction.direction;
                    };

                    // Update the token's quantity based on the transaction direction
                    let updatedQuantity = switch (transaction.direction) {
                      case (#Buy) { token.quantity + transaction.quantity };
                      case (#Sell) { token.quantity - transaction.quantity };
                      case (#Transfer) { 0.0 };
                    };

                    // Put the new transaction in the transaction map
                    transactionMap.put(token.next_transaction_id, newTransaction);
                    portfolioTokenTransactions.put(token.id, transactionMap);

                    // Increment the token's next_transaction_id and update the token's quantity
                    existingTokenList.put(token.canister_id, {
                      id = token.id;
                      portfolio_owner_id = token.portfolio_owner_id;
                      canister_id = token.canister_id;
                      quantity = updatedQuantity;
                      next_transaction_id = (token.next_transaction_id + 1);
                    });

                    // Update the portfolioTokens with the modified token list
                    portfolioTokens.put(portfolio_id, existingTokenList);

                    // Return the new transaction
                    return #ok(newTransaction);
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  public shared (msg) func updateTransaction(
    portfolio_id: Nat,
    token_canister_id: Principal,
    transaction_id: Nat,
    updatedTransaction: Transaction
  ) : async Result<Text, Text> {
    // Find the portfolio for the caller
    let portfoliosResult = portfolioList.get(msg.caller);

    switch (portfoliosResult) {
      case (null) {
        return #err("No portfolios found for this user. Please create a portfolio to proceed.");
      };
      case (?existingPortfolios) {
        let portfolioResult = existingPortfolios.get(portfolio_id);

        switch (portfolioResult) {
          case (null) {
            return #err("Portfolio not found. Ensure you're using the correct portfolio ID.");
          };
          case (?existingPortfolio) {
            // Find the token within the portfolio
            let tokenResult = portfolioTokens.get(portfolio_id);

            switch (tokenResult) {
              case (null) {
                return #err("No tokens found for this portfolio. Please add a token first.");
              };
              case (?existingTokens) {
                let token = existingTokens.get(token_canister_id);

                switch (token) {
                  case (null) {
                    return #err("Token not found in the portfolio.");
                  };
                  case (?existingToken) {
                    // Find the transaction for the token
                    let transactionsResult = portfolioTokenTransactions.get(existingToken.id);

                    switch (transactionsResult) {
                      case (null) {
                        return #err("No transactions found for the specified token.");
                      };
                      case (?existingTransactions) {
                        let transaction = existingTransactions.get(transaction_id);

                        switch (transaction) {
                          case (null) {
                            return #err("Transaction not found.");
                          };
                          case (?existingTransaction) {
                            // Adjust the token quantity by removing the effect of the old transaction
                            let adjustedQuantity = switch (existingTransaction.direction) {
                              case (#Buy) { existingToken.quantity - existingTransaction.quantity };
                              case (#Sell) { existingToken.quantity + existingTransaction.quantity };
                              case (#Transfer) { 0.0 };
                            };

                            // Apply the new transaction effect to adjust the quantity
                            let finalQuantity = switch (updatedTransaction.direction) {
                              case (#Buy) { adjustedQuantity + updatedTransaction.quantity };
                              case (#Sell) { adjustedQuantity - updatedTransaction.quantity };
                              case (#Transfer) { 0.0 };
                            };

                            // Update the transaction with the new details
                            existingTransactions.put(transaction_id, updatedTransaction);
                            portfolioTokenTransactions.put(existingToken.id, existingTransactions);

                            // Update the token's quantity and save it back to the portfolioTokens
                            existingTokens.put(token_canister_id, {
                              id = existingToken.id;
                              portfolio_owner_id = existingToken.portfolio_owner_id;
                              canister_id = existingToken.canister_id;
                              quantity = finalQuantity;
                              next_transaction_id = existingToken.next_transaction_id;
                            });

                            // Save the updated token map
                            portfolioTokens.put(portfolio_id, existingTokens);

                            return #ok("Transaction updated successfully.");
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  public shared (msg) func deleteTransaction(
    portfolio_id: Nat,
    token_canister_id: Principal,
    transaction_id: Nat
  ) : async Result<Text, Text> {
    // Find the portfolio for the caller
    let portfoliosResult = portfolioList.get(msg.caller);

    switch (portfoliosResult) {
      case (null) {
        return #err("No portfolios found for this user. Please create a portfolio to proceed.");
      };
      case (?existingPortfolios) {
        let portfolioResult = existingPortfolios.get(portfolio_id);

        switch (portfolioResult) {
          case (null) {
            return #err("Portfolio not found. Ensure you're using the correct portfolio ID.");
          };
          case (?existingPortfolio) {
            // Find the token within the portfolio
            let tokenResult = portfolioTokens.get(portfolio_id);

            switch (tokenResult) {
              case (null) {
                return #err("No tokens found for this portfolio. Please add a token first.");
              };
              case (?existingTokens) {
                let token = existingTokens.get(token_canister_id);

                switch (token) {
                  case (null) {
                    return #err("Token not found in the portfolio.");
                  };
                  case (?existingToken) {
                    // Find the transactions for the token
                    let transactionsResult = portfolioTokenTransactions.get(existingToken.id);

                    switch (transactionsResult) {
                      case (null) {
                        return #err("No transactions found for the specified token.");
                      };
                      case (?existingTransactions) {
                        let transaction = existingTransactions.get(transaction_id);

                        switch (transaction) {
                          case (null) {
                            return #err("Transaction not found.");
                          };
                          case (?existingTransaction) {
                            // Adjust the token quantity based on the transaction being deleted
                            let updatedQuantity = switch (existingTransaction.direction) {
                              case (#Buy) { existingToken.quantity - existingTransaction.quantity };
                              case (#Sell) { existingToken.quantity + existingTransaction.quantity };
                              case (#Transfer) { 0.0 };
                            };

                            // Remove the transaction from the transaction map
                            existingTransactions.delete(transaction_id);

                            // Check if there are no more transactions for this token
                            if (existingTransactions.size() == 0) {
                              // If no transactions left, remove the token from the portfolio
                              existingTokens.delete(token_canister_id);
                              portfolioTokenTransactions.delete(existingToken.id);
                            } else {
                              // Update the token quantity in the token map
                              existingTokens.put(token_canister_id, {
                                id = existingToken.id;
                                portfolio_owner_id = existingToken.portfolio_owner_id;
                                canister_id = existingToken.canister_id;
                                quantity = updatedQuantity;
                                next_transaction_id = existingToken.next_transaction_id;
                              });

                              // Save the updated transaction list
                              portfolioTokenTransactions.put(existingToken.id, existingTransactions);
                            };

                            // Save the updated token map
                            portfolioTokens.put(portfolio_id, existingTokens);

                            return #ok("Transaction deleted successfully.");
                          };
                        };
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  public shared query (msg) func getPortfolios() : async ?[(Nat, Portfolio)] {
    let portfoliosResult = portfolioList.get(msg.caller);

    switch (portfoliosResult) {
      case (null) {
        return null;
      };
      case (?existingPortfolios) {
        return ?Iter.toArray<(Nat, Portfolio)>(existingPortfolios.entries());
      }
    }
  };

  public shared query (msg) func getTokensOfPortfolio(portfolio_id: Nat) : async Result<[(Principal, Token)], Text>{
    // Find the portfolio for the caller
    let portfoliosResult = portfolioList.get(msg.caller);

    switch (portfoliosResult) {
      case (null) {
        return #err("No portfolios found for this user. Please create a portfolio to proceed.");
      };
      case (?existingPortfolios) {
        let portfolioResult = existingPortfolios.get(portfolio_id);

        switch (portfolioResult) {
          case (null) {
            return #err("Portfolio not found. Ensure you're using the correct portfolio ID.");
          };
          case (?existingPortfolio) {
            let tokensResult = portfolioTokens.get(portfolio_id);

            switch (tokensResult) {
              case (null) {
                return #ok([]);
              };
              case (?existingTokens) {
                return #ok(Iter.toArray(existingTokens.entries()));
              };
            };
          };
        };
      };
    };
  };

  public shared query (msg) func getTokenTransactions(portfolio_id: Nat, token_canister_id: Principal) : async Result<[(Nat, Transaction)], Text> {
    // Get the portfolios for the caller
    let portfoliosResult = portfolioList.get(msg.caller);

    // Check if portfolios exist for the caller
    switch (portfoliosResult) {
      case (null) {
        return #err("No portfolios found for this user. Please create a portfolio first.");
      };
      case (?existingPortfolios) {
        // Check if the given portfolio ID exists
        let portfolioResult = existingPortfolios.get(portfolio_id);

        switch (portfolioResult) {
          case (null) {
            return #err("Portfolio does not exist. Please check the portfolio ID.");
          };
          case (?existingPortfolio) {
            // Get the tokens for the portfolio
            let tokensResult = portfolioTokens.get(portfolio_id);

            switch (tokensResult) {
              case (null) {
                return #err("No tokens found in this portfolio. Please add a token to the portfolio.");
              };
              case (?existingTokens) {
                // Find the token by the provided token_canister_id
                let foundToken = existingTokens.get(token_canister_id);

                switch (foundToken) {
                  case (null) {
                    return #err("Token not found in the specified portfolio. Please check the token canister ID.");
                  };
                  case (?token) {
                    // Get the transactions for the found token
                    let tokenTransactionsResult = portfolioTokenTransactions.get(token.id);

                    switch (tokenTransactionsResult) {
                      case (null) {
                        return #err("No transactions found for the specified token.");
                      };
                      case (?existingTransactions) {
                        return #ok(Iter.toArray(existingTransactions.entries()));
                      };
                    };
                  };
                };
              };
            };
          };
        };
      };
    };
  };

  public shared (msg) func deletePortfolio(portfolioId: Nat) : async Result<Text, Text> {
    return #err("Functionality not implemented!");
    
    // Retrieve the user's portfolios
    let portfoliosResult = portfolioList.get(msg.caller);

    switch (portfoliosResult) {
      case (null) {
        // If no portfolios exist for the user, return an error message
        return #err("No portfolios found for this user.");
      };
      case (?existingPortfolios) {
        // Check if the portfolio exists
        // TODO 🚨🚨🚨

        // 1. Remove the portfolio from the portfolioList
        existingPortfolios.delete(portfolioId);
        portfolioList.put(msg.caller, existingPortfolios);

        // 2. Decrease the totalPortfolioCount by 1
        totalPortfolioCount -= 1;

        // 3. Clean up related portfolioTokens and portfolioTokenTransactions
        // - Remove associated tokens
        // - Remove associated transactions

        return #ok("Portfolio successfully deleted.");
      };
    };
  };
  
  // System Functions
  system func preupgrade() {
      // Portfolios
      let portfolioEntries : HashMap.HashMap<Principal, [(Nat, Portfolio)]> = HashMap.HashMap<Principal, [(Nat, Portfolio)]>(100, Principal.equal, Principal.hash);

      for ((key: Principal, value: HashMap<Nat, Portfolio>) in portfolioList.entries()) {
        let array : [(Nat, Portfolio)] = Iter.toArray(value.entries());
        portfolioEntries.put(key, array);
      };

      portfolioListRepository := Iter.toArray(portfolioEntries.entries());

      // Portfolio Tokens
      let portfolioTokenEntries : HashMap.HashMap<Nat, [(Principal, Token)]> = HashMap.HashMap<Nat, [(Principal, Token)]>(100, Nat.equal, Hash.hash);

      for ((key: Nat, value: HashMap<Principal, Token>) in portfolioTokens.entries()) {
        let array : [(Principal, Token)] = Iter.toArray(value.entries());
        portfolioTokenEntries.put(key, array);
      };

      portfolioTokenRepository := Iter.toArray(portfolioTokenEntries.entries());

      // Portfolio Token Transactions
      let portfolioTokenTransactionEntries : HashMap.HashMap<Nat, [(Nat, Transaction)]> = HashMap.HashMap<Nat, [(Nat, Transaction)]>(500, Nat.equal, Hash.hash);

      for ((key: Nat, value: HashMap<Nat, Transaction>) in portfolioTokenTransactions.entries()) {
        let array: [(Nat, Transaction)] = Iter.toArray(value.entries());

        portfolioTokenTransactionEntries.put(key, array);
      };

      portfolioTokenTransactionRepository := Iter.toArray(portfolioTokenTransactionEntries.entries());
  };

  system func postupgrade() {
    //Parse Portfolios (Stable -> Heap)
    for ((key: Principal, value: [(Nat, Portfolio)]) in portfolioListRepository.vals()) {
      let map = HashMap.HashMap<Nat, Portfolio>(100, Nat.equal, Hash.hash);
      for(i in value.keys()) {
        map.put(value[i].0, value[i].1);
      };
      portfolioList.put(key, map);
    };
    
    //Parse PortfolioTokens (Stable -> Heap)
    for ((key: Nat, value: [(Principal, Token)]) in portfolioTokenRepository.vals()) {
      let map = HashMap.HashMap<Principal, Token>(100, Principal.equal, Principal.hash);
      for(i in value.keys()) {
        map.put(value[i].0, value[i].1);
      };
      portfolioTokens.put(key, map);
    };

    //Parse PortfolioTokenTransactions (Stable -> Heap)
    for ((key: Nat, value: [(Nat, Transaction)]) in portfolioTokenTransactionRepository.vals()) {
      let map = HashMap.HashMap<Nat, Transaction>(100, Nat.equal, Hash.hash);
      for(i in value.keys()) {
        map.put(value[i].0, value[i].1);
      };
      portfolioTokenTransactions.put(key, map);
    };
    
    // Emptying stable memory arrays to minimize memory usage and cost after an upgrade
    portfolioListRepository := [];
    portfolioTokenRepository := [];
    portfolioTokenTransactionRepository := [];
  };
};
