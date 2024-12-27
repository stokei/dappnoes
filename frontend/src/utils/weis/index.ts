import { ethers } from 'ethers';

export const ethersToWeis = (value: string) => ethers.utils.parseUnits(value, 18);
export const weisToEthers = (value: ethers.BigNumberish) => {
  const weiValue = ethers.BigNumber.from(value);
  return ethers.utils.formatUnits(weiValue, 18);
};
