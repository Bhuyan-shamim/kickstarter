import web3 from './web3';
import CampaignFactory from './compiledContracts/CampaignFactory.json';

const factory = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x14b3E204049bBf4d5965Ee088c4a0A710FB8EEeC'
);

export default factory;