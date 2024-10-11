import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Helper "helper";

actor Portfolio {
  // Types
  public type Result<Ok, Err> = Result.Result<Ok, Err>;
  public type HashMap<K, V> = HashMap.HashMap<K, V>;

  public type Direction = { #Buy; #Sell; #Transfer };

  public type TransactionKey = (Nat, Nat); // id, timestamp

  public type Transaction = {
    id: ?Nat;
    quantity: Float;
    price_icp: Float; // ICP Price
    price_usd: Float; // USD Price
    price_btc: ?Float; // BTC Price
    timestamp: Nat;
    note: Text;
    direction: Direction; // True for buy, False for sell
  };

  public type Token = {
    id: Nat;
    portfolio_owner_id: Principal;
    canister_id: Principal;
    quantity: Float;
    next_transaction_id: Nat;
    total_icp_buy_cost: Float; // Total ICP spent on buying the token
    total_usd_buy_cost: Float; // Total USD spent on buying the token
    total_quantity_bought: Float; // Total quantity of token bought
    total_icp_sold: Float; // Total ICP gained from selling the token
    total_usd_sold: Float; // Total USD gained from selling the token
  };

  public type PortfolioKind = {
    #Wallet : {
      walletAddress: Text;
    };
    #Manual;
  };

  public type Portfolio = {
    id: Nat;
    name: Text;
    kind: PortfolioKind;
    created_at: Int;
    updated_at: Int;
  };

  public type PortfolioList = HashMap<Principal, HashMap<Nat, Portfolio>>;
  public type PortfolioTokens = HashMap<Nat, HashMap<Principal, Token>>;
  public type PortfolioTokenTransactions = HashMap<Nat, HashMap<TransactionKey, Transaction>>;

  // Repository
  // WARNING: Consider splitting the dataset into multiple canisters if it grows too large.
  stable var portfolioListRepository: [(Principal, [(Nat, Portfolio)])] = [];
  stable var portfolioTokenRepository: [(Nat, [(Principal, Token)])] = [];
  stable var portfolioTokenTransactionRepository: [(Nat, [((TransactionKey), Transaction)])] = []; // Added missing type

  // Store next repository ID
  stable var nextPortfolioId: Nat = 1;
  stable var nextTokenId: Nat = 1;

  // Store count of the total number of portfolios
  stable var totalPortfolioCount: Nat = 0;

  // Variables
  let portfolioList : PortfolioList = HashMap.HashMap<Principal, HashMap.HashMap<Nat, Portfolio>>(100, Principal.equal, Principal.hash);
  let portfolioTokens : PortfolioTokens = HashMap.HashMap<Nat, HashMap<Principal, Token>>(100, Nat.equal, Hash.hash);
  let portfolioTokenTransactions : PortfolioTokenTransactions = HashMap.HashMap<Nat, HashMap<TransactionKey, Transaction>>(100, Nat.equal, Hash.hash);

  // Portfolio Functions
  public shared (msg) func createPortfolio(name: Text, kind: PortfolioKind) : async Result<Portfolio, Text> {
    let portfoliosResult = portfolioList.get(msg.caller);

    let now = Time.now();
    
    let newPortfolio: Portfolio = {
      id = nextPortfolioId;
      name = name;
      kind = kind;
      created_at = now;
      updated_at = now;
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

  public shared (msg) func importPortfolio(
    name: Text,
    created_at: Int,
    tokensWithTransactions: [(Principal, [Transaction])]
  ) : async Result<Portfolio, Text> {

    // Create a new portfolio manually using the provided name and timestamp
    let portfoliosResult = portfolioList.get(msg.caller);
    let newPortfolio: Portfolio = {
      id = nextPortfolioId;
      name = name;
      kind = #Manual;
      created_at = created_at; // Use custom timestamp
      updated_at = created_at;
    };

    switch (portfoliosResult) {
      case (null) {
        let newMap = HashMap.HashMap<Nat, Portfolio>(3, Nat.equal, Hash.hash);
        newMap.put(nextPortfolioId, newPortfolio);
        portfolioList.put(msg.caller, newMap);
      };
      case (?existingPortfolios) {
        return #err("This function is only for initial portfolio import.");
      };
    };

    // Increment portfolio ID and count
    nextPortfolioId += 1;
    totalPortfolioCount += 1;

    // Loop through each token and its transactions
    for ((tokenCanisterId, transactions) in tokensWithTransactions.vals()) {

      // Add token to the portfolio, initializing with quantity 0 and id 1
      let tokensResult = portfolioTokens.get(newPortfolio.id);
      var tokensMap: HashMap<Principal, Token> = switch (tokensResult) {
        case (null) { HashMap.HashMap<Principal, Token>(10, Principal.equal, Principal.hash) };
        case (?existingTokens) { existingTokens };
      };

      // Initialize token data with quantity 0 and next_transaction_id 1
      var tokenQuantity: Float = 0.0;
      var totalIcpBuyCost: Float = 0.0;  // Track total ICP buy cost
      var totalUsdBuyCost: Float = 0.0;  // Track total USD buy cost
      var totalQuantityBought: Float = 0.0; // Track total quantity bought
      var totalIcpSold: Float = 0.0;
      var totalUsdSold: Float = 0.0;
      var nextTransactionId: Nat = 1;
      var isTokenExists = false;
      var tokenId = nextTokenId;

      // Check if the token already exists in the tokensMap
      let existingToken = tokensMap.get(tokenCanisterId);
      switch (existingToken) {
          case (?token) {
              // Initialize from existing token data
              tokenQuantity := token.quantity;
              totalIcpBuyCost := token.total_icp_buy_cost;
              totalUsdBuyCost := token.total_usd_buy_cost;
              totalQuantityBought := token.total_quantity_bought;
              totalIcpSold := token.total_icp_sold;
              totalUsdSold := token.total_usd_sold;
              nextTransactionId := token.next_transaction_id;
              isTokenExists := true;
              tokenId := token.id;
          };
          case (null) {};
      };

      // Loop through each transaction for the token
      for (transaction in transactions.vals()) {
        // Update the token quantity based on the transaction direction
        tokenQuantity := switch (transaction.direction) {
            case (#Buy) {
                // Update total costs and quantities for buy transactions
                totalIcpBuyCost += transaction.price_icp * transaction.quantity;
                totalUsdBuyCost += transaction.price_usd * transaction.quantity;
                totalQuantityBought += transaction.quantity;
                tokenQuantity + transaction.quantity;
            };
            case (#Sell) { 
              totalIcpSold += transaction.price_icp * transaction.quantity;
              totalUsdSold += transaction.price_usd * transaction.quantity;
              tokenQuantity - transaction.quantity 
            };
            case (#Transfer) { tokenQuantity };  // For transfers, no change in quantity
        };

        // Update the token's transaction map
        let tokenTransactionsResult = portfolioTokenTransactions.get(tokenId);
        var transactionMap: HashMap<TransactionKey, Transaction> = switch (tokenTransactionsResult) {
          case (null) { HashMap.HashMap<TransactionKey, Transaction>(100, Helper.transactionKeyEqual, Helper.transactionKeyHash) };
          case (?existingTransactions) { existingTransactions };
        };

        // Create the new transaction
        let newTransaction: Transaction = {
          id = ?nextTransactionId;
          quantity = transaction.quantity;
          price_icp = transaction.price_icp;
          price_usd = transaction.price_usd;
          price_btc = transaction.price_btc;
          timestamp = transaction.timestamp;
          note = transaction.note;
          direction = transaction.direction;
        };

        // Add the transaction to the transaction map
        transactionMap.put((nextTransactionId, newTransaction.timestamp), newTransaction);
        nextTransactionId += 1;

        // Update portfolioTokenTransactions for this token
        portfolioTokenTransactions.put(tokenId, transactionMap);
      };

      // After processing all transactions, add the token to the tokens map
      let newToken: Token = {
        id = tokenId;
        portfolio_owner_id = msg.caller;
        canister_id = tokenCanisterId;
        quantity = tokenQuantity;
        next_transaction_id = nextTransactionId;
        total_icp_buy_cost = totalIcpBuyCost;      // Set total ICP buy cost
        total_usd_buy_cost = totalUsdBuyCost;      // Set total USD buy cost
        total_quantity_bought = totalQuantityBought;  // Set total quantity bought
        total_icp_sold = totalIcpSold;  // Set total ICP sold
        total_usd_sold = totalUsdSold;  // Set total USD sold
      };

      tokensMap.put(tokenCanisterId, newToken);
      portfolioTokens.put(newPortfolio.id, tokensMap);

      if(not isTokenExists) {
        // Increment token ID for the next token
        nextTokenId += 1;
      }
    };

    return #ok(newPortfolio);
  };

  private func addTokenToPortfolio(caller_principal: Principal, portfolio_id: Nat, token_canister_id: Principal) : Result<Token, Text> {
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
              total_icp_buy_cost = 0.0;
              total_usd_buy_cost = 0.0;
              total_quantity_bought = 0.0;
              total_icp_sold = 0.0;
              total_usd_sold = 0.0;
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

                var transactionMap: HashMap<TransactionKey, Transaction> = HashMap.HashMap<TransactionKey, Transaction>(100, Helper.transactionKeyEqual, Helper.transactionKeyHash);

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
                      price_icp = transaction.price_icp;
                      price_usd = transaction.price_usd;
                      price_btc = transaction.price_btc;
                      timestamp = transaction.timestamp;
                      note = transaction.note;
                      direction = transaction.direction;
                    };

                    // Update the token's quantity based on the transaction direction
                    var updatedQuantity = token.quantity;
                    var totalQuantityBought = token.total_quantity_bought;
                    var totalIcpBuyCost = token.total_icp_buy_cost + (transaction.quantity * transaction.price_icp);
                    var totalUsdBuyCost = token.total_usd_buy_cost + (transaction.quantity * transaction.price_usd);
                    var totalIcpSold = token.total_icp_sold;
                    var totalUsdSold = token.total_usd_sold;
                    
                    switch (transaction.direction) {
                      case (#Buy) { 
                        updatedQuantity := updatedQuantity + transaction.quantity;
                        totalQuantityBought := totalQuantityBought + transaction.quantity;
                        totalIcpBuyCost := totalIcpBuyCost + (transaction.quantity * transaction.price_icp);
                        totalUsdBuyCost := totalUsdBuyCost + (transaction.quantity * transaction.price_usd);
                      };
                      case (#Sell) { 
                        updatedQuantity := updatedQuantity - transaction.quantity;
                        totalIcpSold := totalIcpSold + (transaction.quantity * transaction.price_icp); // Track total ICP sold
                        totalUsdSold := totalUsdSold + (transaction.quantity * transaction.price_usd); // Track total USD sold
                      };
                      case (#Transfer) { };
                    };

                    // Put the new transaction in the transaction map
                    transactionMap.put((token.next_transaction_id, newTransaction.timestamp), newTransaction);
                    portfolioTokenTransactions.put(token.id, transactionMap);

                    // Increment the token's next_transaction_id and update the token's quantity
                    existingTokenList.put(token.canister_id, {
                      id = token.id;
                      portfolio_owner_id = token.portfolio_owner_id;
                      canister_id = token.canister_id;
                      quantity = updatedQuantity;
                      next_transaction_id = (token.next_transaction_id + 1);
                      total_icp_buy_cost = totalIcpBuyCost;
                      total_usd_buy_cost = totalUsdBuyCost;
                      total_quantity_bought = totalQuantityBought;
                      total_icp_sold = totalIcpSold;
                      total_usd_sold = totalUsdSold;
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
    transaction_key: TransactionKey,
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
                        let transaction = existingTransactions.get((transaction_key.0, transaction_key.1));

                        switch (transaction) {
                          case (null) {
                            return #err("Transaction not found.");
                          };
                          case (?existingTransaction) {
                            // Adjust the token quantity and total costs by removing the effect of the old transaction
                            var adjustedQuantity = existingToken.quantity;
                            var adjustedTotalIcpBuyCost = existingToken.total_icp_buy_cost;
                            var adjustedTotalUsdBuyCost = existingToken.total_usd_buy_cost;
                            var adjustedTotalQuantityBought = existingToken.total_quantity_bought;
                            var adjustedTotalIcpSold = existingToken.total_icp_sold;
                            var adjustedTotalUsdSold = existingToken.total_usd_sold;

                            switch (existingTransaction.direction) {
                                case (#Buy) {
                                    // Reverse the effect of the old buy transaction
                                    adjustedQuantity -= existingTransaction.quantity;
                                    adjustedTotalIcpBuyCost -= existingTransaction.price_icp * existingTransaction.quantity;
                                    adjustedTotalUsdBuyCost -= existingTransaction.price_usd * existingTransaction.quantity;
                                    adjustedTotalQuantityBought -= existingTransaction.quantity;
                                };
                                case (#Sell) {
                                    adjustedQuantity += existingTransaction.quantity;
                                    adjustedTotalIcpSold -= existingTransaction.price_icp * existingTransaction.quantity;
                                    adjustedTotalUsdSold -= existingTransaction.price_usd * existingTransaction.quantity;
                                };
                                case (#Transfer) {};
                            };

                            // Apply the new transaction effect
                            var finalQuantity = adjustedQuantity;
                            switch (updatedTransaction.direction) {
                                case (#Buy) {
                                    // Apply the new buy transaction effect
                                    finalQuantity += updatedTransaction.quantity;
                                    adjustedTotalIcpBuyCost += updatedTransaction.price_icp * updatedTransaction.quantity;
                                    adjustedTotalUsdBuyCost += updatedTransaction.price_usd * updatedTransaction.quantity;
                                    adjustedTotalQuantityBought += updatedTransaction.quantity;
                                };
                                case (#Sell) {
                                    finalQuantity -= updatedTransaction.quantity;
                                    adjustedTotalIcpSold += updatedTransaction.price_icp * updatedTransaction.quantity;
                                    adjustedTotalUsdSold += updatedTransaction.price_usd * updatedTransaction.quantity;
                                };
                                case (#Transfer) {};
                            };

                            // Update the transaction with the new details
                            existingTransactions.put((transaction_key.0, transaction_key.1), updatedTransaction);
                            portfolioTokenTransactions.put(existingToken.id, existingTransactions);

                            // Update the token's quantity and save it back to the portfolioTokens
                            existingTokens.put(token_canister_id, {
                              id = existingToken.id;
                              portfolio_owner_id = existingToken.portfolio_owner_id;
                              canister_id = existingToken.canister_id;
                              quantity = finalQuantity;
                              next_transaction_id = existingToken.next_transaction_id;
                              total_icp_buy_cost = adjustedTotalIcpBuyCost;   // Update total ICP buy cost
                              total_usd_buy_cost = adjustedTotalUsdBuyCost;   // Update total USD buy cost
                              total_quantity_bought = adjustedTotalQuantityBought;  // Update total quantity bought
                              total_icp_sold = adjustedTotalIcpSold;  // Update total ICP sold
                              total_usd_sold = adjustedTotalUsdSold;  // Update total USD sold
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
    transaction_key: TransactionKey
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
                        let transaction = existingTransactions.get((transaction_key.0, transaction_key.1));

                        switch (transaction) {
                          case (null) {
                            return #err("Transaction not found.");
                          };
                          case (?existingTransaction) {
                            // Adjust the token quantity and total costs based on the transaction being deleted
                            var updatedQuantity = existingToken.quantity;
                            var updatedTotalIcpBuyCost = existingToken.total_icp_buy_cost;
                            var updatedTotalUsdBuyCost = existingToken.total_usd_buy_cost;
                            var updatedTotalQuantityBought = existingToken.total_quantity_bought;
                            var updatedTotalIcpSold = existingToken.total_icp_sold;
                            var updatedTotalUsdSold = existingToken.total_usd_sold;

                            switch (existingTransaction.direction) {
                                case (#Buy) {
                                    // Reverse the effect of the buy transaction
                                    updatedQuantity -= existingTransaction.quantity;
                                    updatedTotalIcpBuyCost -= existingTransaction.price_icp * existingTransaction.quantity;
                                    updatedTotalUsdBuyCost -= existingTransaction.price_usd * existingTransaction.quantity;
                                    updatedTotalQuantityBought -= existingTransaction.quantity;
                                };
                                case (#Sell) {
                                    updatedQuantity += existingTransaction.quantity;
                                    updatedTotalIcpSold -= existingTransaction.price_icp * existingTransaction.quantity;
                                    updatedTotalUsdSold -= existingTransaction.price_usd * existingTransaction.quantity;
                                };
                                case (#Transfer) {
                                    // For transfers, quantity remains unchanged
                                };
                            };

                            // Remove the transaction from the transaction map
                            existingTransactions.delete((transaction_key.0, transaction_key.1));

                            // Check if there are no more transactions for this token
                            if (existingTransactions.size() == 0) {
                                // If no transactions left, remove the token from the portfolio
                                existingTokens.delete(token_canister_id);
                                portfolioTokenTransactions.delete(existingToken.id);
                            } else {
                                // Update the token quantity and total buy properties in the token map
                                existingTokens.put(token_canister_id, {
                                    id = existingToken.id;
                                    portfolio_owner_id = existingToken.portfolio_owner_id;
                                    canister_id = existingToken.canister_id;
                                    quantity = updatedQuantity;
                                    next_transaction_id = existingToken.next_transaction_id;
                                    total_icp_buy_cost = updatedTotalIcpBuyCost;    // Update total ICP buy cost
                                    total_usd_buy_cost = updatedTotalUsdBuyCost;    // Update total USD buy cost
                                    total_quantity_bought = updatedTotalQuantityBought;  // Update total quantity bought
                                    total_icp_sold = updatedTotalIcpSold;  // Update total ICP sold
                                    total_usd_sold = updatedTotalUsdSold;  // Update total USD sold
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

  public shared query (msg) func getTokenTransactions(portfolio_id: Nat, token_canister_id: Principal) : async Result<[(TransactionKey, Transaction)], Text> {
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
      let portfolioTokenTransactionEntries : HashMap.HashMap<Nat, [(TransactionKey, Transaction)]> = HashMap.HashMap<Nat, [(TransactionKey, Transaction)]>(500, Nat.equal, Hash.hash);

      for ((key: Nat, value: HashMap<TransactionKey, Transaction>) in portfolioTokenTransactions.entries()) {
        let array: [(TransactionKey, Transaction)] = Iter.toArray(value.entries());

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
    for ((key: Nat, value: [(TransactionKey, Transaction)]) in portfolioTokenTransactionRepository.vals()) {
      let map = HashMap.HashMap<TransactionKey, Transaction>(100, Helper.transactionKeyEqual, Helper.transactionKeyHash);
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
