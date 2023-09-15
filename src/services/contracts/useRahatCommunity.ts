import { CONTRACTS } from '@config';
import useContract from '@hooks/contracts/useContract';
import { useErrorHandler } from '@hooks/user-error-handler';
import { useCallback, useMemo } from 'react';
import { CommunityHooks } from 'src/types/contract-hooks/useRahatCommunity';

export const useRahatCommunity = (): CommunityHooks => {
  const [contract] = useContract(CONTRACTS.COMMUNITY);
  const { handleContractError } = useErrorHandler();

  const vendorRoles = useCallback(async (): Promise<string> => {
    const role = await contract?.VENDOR_ROLE().catch(handleContractError);
    if (!role) throw new Error('Failed to get vendor role');
    return role;
  }, [contract, handleContractError]);

  const checkIfBeneficiary = useCallback(
    async (walletAddress: string): Promise<boolean> => {
      const isBeneficiary = await contract?.isBeneficiary(walletAddress);
      if (isBeneficiary === undefined) throw new Error('Failed to check if beneficiary');
      return isBeneficiary;
    },
    [contract]
  );

  const addBeneficiaryToCommunity = useCallback(
    async (walletAddress: string): Promise<void> => {
      await contract?.addBeneficiary(walletAddress).catch(handleContractError);
    },
    [contract, handleContractError]
  );

  const communityName = useCallback(async (): Promise<string> => {
    const name = await contract?.name().catch(handleContractError);
    if (!name) throw new Error('Failed to get community name');
    return name;
  }, [contract, handleContractError]);

  const addVendorToCommunity = useCallback(
    async (vendorAddress: string): Promise<void | Error> => {
      const vendorHasRole = await contract
        ?.hasRole(await vendorRoles(), vendorAddress)
        .catch(handleContractError);
      if (vendorHasRole === undefined) throw new Error('Failed to check if vendor has role');

      if (vendorHasRole) {
        return new Error('Vendor has already been added');
      }
      return contract?.grantRole(await vendorRoles(), vendorAddress).catch(handleContractError);
    },
    [contract, vendorRoles, handleContractError]
  );

  const memoizedValues = useMemo(
    () => ({
      contract,
      vendorRoles,
      checkIfBeneficiary,
      addBeneficiaryToCommunity,
      communityName,
      addVendorToCommunity,
    }),
    [
      contract,
      vendorRoles,
      checkIfBeneficiary,
      addBeneficiaryToCommunity,
      communityName,
      addVendorToCommunity,
    ]
  );

  return memoizedValues;
};
