const express = require('express')
const fs = require('fs');
var ipfsClient = require('ipfs-http-client')
const app = express()
const port = 3000
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/client.js', function (req, res) {
    res.sendFile(__dirname + '/client.js');
});
app.get('/web3.js', function (req, res) {
    res.sendFile(__dirname + '/js/web3.min.js');
});
app.get('/smart-contract-info', function (req, res) {
    var obj = JSON.parse(fs.readFileSync('build/contracts/Voting.json', 'utf8'));

    let abi = obj.abi;

    let networks = obj.networks;
    let something_weird = Object.keys(networks)[0];
    let address = networks[something_weird].address;

    let ans = {
        "abi": abi,
        "address": address
    };
    res.json(ans);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
