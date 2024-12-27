const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);
  const Game = await ethers.getContractFactory('DominoGame');
  console.log('Deploying Game contract...');
  const game = await Game.deploy();
  await game.deployed();
  console.log('Game contract deployed to:', game.address);
  console.log('Deployment complete.');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
