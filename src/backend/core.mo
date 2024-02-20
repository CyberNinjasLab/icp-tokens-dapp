import Principal "mo:base/Principal";
import Types "types";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor Core {
  stable var usersRepository : [(Principal, Types.User)] = [];
  let users : Types.UsersList = HashMap.fromIter<Principal, Types.User>(usersRepository.vals(), 10, Principal.equal, Principal.hash);

  public shared ({ caller }) func addTwitterAcc(twitterAcc : Text) : async Text {
    let userResult : ?Types.User = users.get(caller);

    switch(userResult) {
      case(null) {
        users.put(caller, {
          id = caller;
          twitterAcc = twitterAcc;
          hasAccess = false;
        });
      };
      case(?user) {
        users.put(caller, {
          id = caller;
          twitterAcc = twitterAcc;
          hasAccess = user.hasAccess;
        });
      };
    };

    return "OK";
  };

  public shared ({ caller }) func addAccessToUser(userId : Principal) : async Principal {
    // Set principal of master acc
    if(Principal.equal(caller, Principal.fromText("2vxsx-fae"))) {
      let userResult : ?Types.User = users.get(userId);

      switch(userResult) {
        case(null) {};
        case(?user) {
          users.put(userId, {
            id = userId;
            twitterAcc = user.twitterAcc;
            hasAccess = true;
          });
        };
      };
    };

    return userId;
  };

  public query func getAllUsers() : async [Types.User] {
    let entries = users.entries();
    let memberIter : Iter.Iter<Types.User> = {
      next = func () : ?Types.User {
        switch (entries.next()) {
          case (?(_, member)) { return ?member; };
          case null { return null; };
        };
      };
    };

    return Iter.toArray<Types.User>(memberIter);
  };

  public shared query (msg) func getCurrentUser() : async ?Types.User {
    let userResult = users.get(msg.caller);

    if(Principal.equal(msg.caller, Principal.fromText("2vxsx-fae")) == false) {
      switch(userResult) {
        case(null) {
          let data = {
            id = msg.caller;
            twitterAcc = "";
            hasAccess = false;
          };

          users.put(msg.caller, data);

          return ?data;
        };
        case(?user) {
        };
      };
    };

    return userResult;
  };
  
  public shared ({ caller }) func whoami() : async Principal {
    caller;
  };

  system func preupgrade() {
    usersRepository := Iter.toArray(users.entries());
  };

  system func postupgrade() {
    usersRepository := [];
  };
}