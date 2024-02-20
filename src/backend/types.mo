import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Bool "mo:base/Bool";

module {
    public type HashMap<K, V> = HashMap.HashMap<K, V>;
    public type TrieMap<K, V> = TrieMap.TrieMap<K, V>;

    public type User = {
        id : Principal;
        twitterAcc : Text;
        hasAccess : Bool;
    };
    public type UsersList = HashMap<Principal, User>;
}