const express = require('express')

const Web3 = require('web3')

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
}
const app = express()
const port = 3000


app.get('/', (req, res) => res.sendFile( __dirname + '/index.html'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

