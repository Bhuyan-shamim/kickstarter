require("dotenv").config();

const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./compiledContracts/CampaignFactory.json");
const mnemonicPhrase = process.env.ACCOUNT_MNEMONIC;
const network = process.env.RINKEBY_ENDPOINT;

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: "green route unlock slam split apple slogan shallow predict sort civil drift"
  },
  providerOrUrl: "https://rinkeby.infura.io/v3/037986069c1240fa84ac7e8212d37943"
});
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  let result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1500000' });
  console.log(result.options.address);
  
  provider.engine.stop();
};

deploy();