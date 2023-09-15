'use client';

import { Contract, TransactionReceipt, ethers } from 'ethers';

import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import type { Connector } from '@web3-react/types';

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return 'MetaMask';
  if (connector instanceof Network) return 'Network';
  if (connector instanceof GnosisSafe) return 'Gnosis Safe';
  return 'Unknown';
}

export function generateWalletAddress() {
  return ethers.Wallet.createRandom();
}

interface MultiCallData {
  encodedData: string[];
  types: string[];
}

const generateMultiCallData = async (
  contract: Contract,
  functionName: string,
  callData: (string | number)[]
): Promise<MultiCallData> => {
  const encodedData = callData.map((callD) =>
    contract.interface.encodeFunctionData(functionName, [callD])
  );
  const types = new Array(encodedData.length).fill('bytes');

  return { encodedData, types };
};

export const multicall = async (
  contract: ethers.Contract,
  functionName: string,
  callData: (string | number)[]
) => {
  const encodedData = await generateMultiCallData(contract, functionName, callData);
  //   TODO:research
  return contract.callStatic;
};

export const multiSend = async (
  contract: ethers.Contract,
  functionName: string,
  callData: (string | number)[]
): Promise<TransactionReceipt> => {
  const { encodedData } = await generateMultiCallData(contract, functionName, callData);
  return contract.multicall(encodedData);
};
