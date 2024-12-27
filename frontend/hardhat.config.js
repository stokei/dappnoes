require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  defaultNetwork: 'ganache',
  networks: {
    ganache: {
      url: process.env.NEXT_PUBLIC_GANACHE_URL,
      accounts: [process.env.NEXT_PUBLIC_GANACHE_PRIVATE_KEY]
    }
  },
  solidity: {
    version: '0.8.28',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: './blockchain/contracts',
    tests: './blockchain/test',
    cache: './blockchain/cache',
    artifacts: './blockchain/artifacts'
  }
};
