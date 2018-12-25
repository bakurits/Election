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

    function vote() public{
        
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

}