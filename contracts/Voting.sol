pragma solidity >0.4.22;

contract Voting{
    address public creator;

    constructor () public{
        creator = msg.sender;
    }

}