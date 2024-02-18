import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";

module {
    public type HashMap<K, V> = HashMap.HashMap<K, V>;
    public type TrieMap<K, V> = TrieMap.TrieMap<K, V>;

    public type User = {
        twitterAcc : Text;
    };
    public type UsersList = HashMap<Principal, User>;
}