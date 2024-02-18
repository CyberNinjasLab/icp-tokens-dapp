import Principal "mo:base/Principal";
import Types "types";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";

actor Core {
  stable var usersRepository : [(Principal, Types.User)] = [];
  let users : Types.UsersList = HashMap.fromIter<Principal, Types.User>(usersRepository.vals(), 10, Principal.equal, Principal.hash);

  public shared ({ caller }) func addMember(twitterAcc : Text) : async Text {
    users.put(caller, {
      twitterAcc = twitterAcc;
    });

    return "Yes";
  };

  public shared query (msg) func getCurrentUser() : async ?Types.User {
    let user = users.get(msg.caller);

    return user;
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