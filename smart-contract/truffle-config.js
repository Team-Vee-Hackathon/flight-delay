const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    sepolia: {
      provider: () => {
        console.log("Using HDWalletProvider");
        return new HDWalletProvider({
          mnemonic: {
            phrase: process.env.MNEMONIC
          },
          providerOrUrl: `https://sepolia.drpc.org`,
          pollingInterval: 8000
        });
      },
      network_id: 11155111,
      timeoutBlocks: 200,
      confirmations: 2,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.18",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
