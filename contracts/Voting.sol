pragma solidity >0.4.22;

contract Voting{
    address private creator;
    mapping(bytes32 => Candidate) private candidates;
    mapping(uint => Candidate) private candidatesWithInd;
    mapping(address => mapping(bytes32 => bool)) private voted;
    uint private candidateCount;

    struct Candidate{
        bytes32 name;
        bytes description;
        bytes32 image_hash;
        uint num_votes;
    }

    constructor () public{
        creator = msg.sender;
    }

    function vote(bytes32 name_) public{
        address sender = msg.sender;
        if(voted[sender][name_]) 
            return;
        voted[sender][name_] = true;
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
            candidatesWithInd[candidateCount]=new_candidate;
            candidateCount++;
        }

    }

    function getCandidateWithName(bytes32 name_) public view returns(bytes32, bytes memory,bytes32, uint){
        return (candidates[name_].name, candidates[name_].description, candidates[name_].image_hash, candidates[name_].num_votes);
    }
    function getCandidateCount() public view returns(uint){
        return candidateCount;
    }
    function getCandidateWithIndex(uint ind) public view returns(bytes32, bytes memory,bytes32, uint){
        return (candidates[ind].name, candidates[ind].description, candidates[ind].image_hash, candidates[ind].num_votes);
    }

}