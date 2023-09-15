import { CONTRACTS } from '@config';
import useContract from '@hooks/contracts/useContract';
import { useErrorHandler } from '@hooks/user-error-handler';
import { TransactionReceipt } from 'ethers';
import { useCallback, useMemo } from 'react';
import useAppStore from 'src/store/app';
import { UseRahatDonorReturn } from 'src/types/contract-hooks/useRahatDonor';

const useRahatDonor = (): UseRahatDonorReturn => {
  const [donorContract] = useContract(CONTRACTS.DONOR);
  const [rahatTokenContract] = useContract(CONTRACTS.RAHATTOKEN);
  const { handleContractError } = useErrorHandler();
  const contracts = useAppStore((state) => state.contracts);

  const sendTokenToProject = useCallback(
    async (amount: string): Promise<TransactionReceipt> => {
      if (!donorContract || !rahatTokenContract) {
        throw new Error('Contracts are not available');
      }

      return donorContract
        .mintTokenAndApprove(
          contracts?.[CONTRACTS.RAHATTOKEN].address,
          contracts?.[CONTRACTS.CVAPROJECT].address,
          amount
        )
        .catch(handleContractError);
    },
    [donorContract, rahatTokenContract, contracts, handleContractError]
  );

  const memoizedValues = useMemo(
    () => ({
      donorContract,
      rahatTokenContract,
      sendTokenToProject,
    }),
    [donorContract, rahatTokenContract, sendTokenToProject]
  );

  return memoizedValues;
};

export default useRahatDonor;
