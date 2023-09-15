import { AddEthereumChainParameter } from '@web3-react/types';
import { InterfaceAbi } from 'ethers';

export type IAppSettingsContractsApiResponse = {
  [key: string]: {
    address: string;
    abi: InterfaceAbi;
  };
};

export type IAppSettingsNetworkApiResponse = {
  chainId: number;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrl: string;
  blockExplorerUrls?: string;
  iconUrls?: string[];
  chainWebSocket?: string;
  networkId: number;
};
export type IAppSettingsNetwork = AddEthereumChainParameter;
