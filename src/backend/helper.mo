import Nat "mo:base/Nat";
import Hash "mo:base/Hash";

module Helper {
  public func transactionKeyEqual(key1: (Nat, Nat), key2: (Nat, Nat)) : Bool {
    return key1.0 == key2.0 and key1.1 == key2.1;
  };

  public func transactionKeyHash((n1, n2): (Nat, Nat)): Hash.Hash {
    // Get individual hashes
    let hash1 = Hash.hash(n1);
    let hash2 = Hash.hash(n2);

    // Combine the two hashes using a robust mix with modular arithmetic
    let combinedHash = hash1 ^ (hash2 +% 0x9e3779b9 +% (hash1 << 6) +% (hash1 >> 2));

    // Return the combined hash
    combinedHash
  };
};