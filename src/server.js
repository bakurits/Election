const express = require('express')
const ipfsAPI = require('ipfs-api');
const Web3 = require('web3')
const fs = require('fs');
const bodyParser = require('body-parser');
var ipfsClient = require('ipfs-http-client')
const bitswap = require('ipfs-http-client/src/bitswap')('/ip4/127.0.0.1/tcp/8080')
var ipfs = ipfsClient('/ip4/127.0.0.1/tcp/8080')
const app = express()
const port = 3000
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/client.js', function(req, res) {
    res.sendFile(__dirname + '/client.js');
});
app.get('/web3.js', function(req, res) {
    res.sendFile(__dirname + '/js/web3.min.js');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
