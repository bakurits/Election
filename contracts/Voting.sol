pragma solidity >0.4.22;

contract Voting{
    address public creator;
    mapping(bytes32 => Candidate) public candidates;
    mapping(address => mapping(bytes32 => bool)) public voted;

    struct Candidate{
        bytes32 name;
        bytes description;
        bytes32 image_hash;
        uint num_votes;
    }

    constructor () public{
        creator = msg.sender;
    }

    function stringToBytes32(string memory src)returns (bytes32 result) {
        require(src.length<=32);

        if (src.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(src, 32))
        }

    }

    function vote(bytes32 name_) public{
        address sender = msg.sender;
        if(voted[sender][name_]) return;

        voted[sender][name] =true;
        candidates[name_].num_votes++;
    }

    function addCandidate(bytes32 name_, bytes memory description_, bytes32 image_hash_) public{
        if (creator == msg.sender){
            Candidate memory new_candidate = Candidate({
                name : name_,
                description : description_,
                image_hash : image_hash_,
                num_votes : 0
            });
            candidates[name_] = new_candidate;
        }
    }

    function getCandidate(bytes32 name_) returns(Candidate candidate){
        return candidates[name_];
    }

}