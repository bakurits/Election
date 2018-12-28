# Election
Simple election website with etherium

## Prerequisites
* IPFS
* truffle
* ganache
* metamask(optional)

## Running instructions
1. install dependencies
```
npm install
```

2. start IPFS server
```
ipfs init
ipfs daemon
```

3. start ganache client
```
ganache-cli -p 7545
```

4. start truffle
```
truffle compile
truffle migrate
```

5. start server
```
node src/server.js
```
6. start metamask(optional)
in metamask setting choose custom RPC on url http://localhost:7545
