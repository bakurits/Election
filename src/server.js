const express = require('express')
const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const Web3 = require('web3')
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // Set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
}
const app = express()
const port = 3000


app.get('/', (req, res) => res.sendFile( __dirname + '/index.html'))

app.get('/addfile', function(req, res){
    const fileBuffer = req.file;

    ipfs.files.add(fileBuffer, function (err, file) {
        if (err) {
          console.log(err);
        }
        console.log(file)
      })

})

app.get('/getfile', function(req, res) {
    
    //This hash is returned hash of addFile router.
    const validCID = req.hashCode;

    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path)
          console.log(file.content.toString('utf8'))
        })
      })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

