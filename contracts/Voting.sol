pragma solidity >0.4.22;

contract Voting{
    address private creator;
    mapping(uint => Candidate) private candidates;
    mapping(address => mapping(uint => bool)) private voted;
    uint private candidateCount;
    event voteEvent(address _from, bool _value);

    struct Candidate{
        uint id;
        string name;
        string description;
        string image_hash;
        uint num_votes;
    }

    constructor () public{
        creator = msg.sender;
    }

    function vote(uint id) public returns(bool){
        address sender = msg.sender;
        require (id >= 0 && id < candidateCount, "Id out of bounds");
        if(voted[sender][id]){
            emit voteEvent(sender,false);
            return false;
        }
        voted[sender][id] = true;
        candidates[id].num_votes++;
        emit voteEvent(sender,true);
        return true;
    }

    function addCandidate(string memory _name, string memory _description, string memory _image_hash) public{
        if (creator == msg.sender){
            Candidate memory new_candidate = Candidate({
                id : candidateCount,
                name : _name,
                description : _description,
                image_hash : _image_hash,
                num_votes : 0
            });
            candidates[candidateCount] = new_candidate;
            candidateCount++;
        }
    }

    function getCandidateCount() public view returns(uint count){
        return candidateCount;
    }
    
    function getCandidate(uint ind) public view 
    returns(uint id, string memory name, string memory description, string memory image_hash, uint num_votes){
        return (candidates[ind].id,
        candidates[ind].name, 
        candidates[ind].description, 
        candidates[ind].image_hash,
        candidates[ind].num_votes);
    }


}