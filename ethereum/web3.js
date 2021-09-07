const Web3 = require("web3");

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider); // in the browser with metamask installed
} else {
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/037986069c1240fa84ac7e8212d37943'   // if the code is run on the server *OR* metamask is not installed
  );
  web3 = new Web3(provider);
}

module.exports = web3;