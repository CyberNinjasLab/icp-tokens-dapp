import Principal "mo:base/Principal";

actor Core {
  public shared ({ caller }) func whoami() : async Principal {
    caller;
  };
}