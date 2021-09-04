const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const compiledContractPath = path.resolve(__dirname, "compiledContracts");
const contractFileName = "Campaign.sol";

// if compiledContracts folder already exists, it is deleted
fs.removeSync(compiledContractPath);

const campaignPath = path.resolve(__dirname, "contracts", contractFileName);
const source = fs.readFileSync(campaignPath, "utf8");
const input = {
  language: "Solidity",
  sources: {},
  settings: {
    metadata: {
      useLiteralContent: true
    },
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
};

input.sources[contractFileName] = {
  content: source
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contracts = output.contracts[contractFileName];

// Create "compiled Contracts" folder.
fs.ensureDirSync(compiledContractPath);

// Extract and write the JSON representations of the contracts to the build folder.
for (let contract in contracts) {
  if (contracts.hasOwnProperty(contract)) {
    const element = contracts[contract];
    fs.outputJsonSync(path.resolve(compiledContractPath, `${contract}.json`), contracts[contract]);
  }
}