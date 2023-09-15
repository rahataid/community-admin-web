import { CONTRACTS } from '@config';
import useContract from '@hooks/contracts/useContract';
import { useCallback } from 'react';
import { UseRahatTokenReturn } from 'src/types/contract-hooks/useRahatToken';

export const useRahatToken = (): UseRahatTokenReturn => {
  const [contract] = useContract(CONTRACTS.RAHATTOKEN);
  const [contractWS] = useContract(CONTRACTS.RAHATTOKEN, { isWebsocket: true });

  const getAllowance = useCallback(
    async (from: string, to: string): Promise<number | undefined> => {
      const allowance = await contract?.allowance(from, to);
      return allowance?.toNumber();
    },
    [contract]
  );

  return { contract, contractWS, getAllowance };
};
