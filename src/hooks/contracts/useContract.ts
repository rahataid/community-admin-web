import { useWeb3React } from '@web3-react/core';
import { Contract, ContractRunner, InterfaceAbi } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import useAppStore from 'src/store/app';

interface UseContractOptions {
  isWebsocket?: boolean;
  contractAddress?: string;
}

type UseContractReturn = [Contract | null, InterfaceAbi | null];

type UseContract = (contractName: string, options?: UseContractOptions) => UseContractReturn;

const useContract: UseContract = (contractName, options = {}) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const { provider } = useWeb3React();
  const contracts = useAppStore((state) => state.contracts);

  const contractInstance = useMemo(() => {
    if (contracts && contractName) {
      return new Contract(
        options?.contractAddress || contracts[contractName].address,
        contracts[contractName].abi,
        provider?.getSigner() as unknown as ContractRunner
      );
    }
    return null;
  }, [contracts, contractName, options?.contractAddress, provider]);

  useEffect(() => {
    setContract(contractInstance);
  }, [contractInstance]);

  return [contract, contracts?.[contractName]?.abi || null];
};

export default useContract;
