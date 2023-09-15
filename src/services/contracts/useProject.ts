import { CONTRACTS } from '@config';
import useContract from '@hooks/contracts/useContract';
import { useErrorHandler } from '@hooks/user-error-handler';
import { multiSend } from '@web3/utils';
import { ContractTransactionResponse } from 'ethers';
import { useCallback, useMemo } from 'react';
import {
  IBeneficiaryChainData,
  IVendorChainData,
  ProjectContract,
} from 'src/types/contract-hooks/useProject';

const useProjectContract = (): ProjectContract => {
  const { handleContractError } = useErrorHandler();
  const [projectContract, abi] = useContract(CONTRACTS.CVAPROJECT);
  const [tokenContract] = useContract(CONTRACTS.RAHATTOKEN);
  const [donorContract] = useContract(CONTRACTS.DONOR);
  const [communityContract] = useContract(CONTRACTS.COMMUNITY);

  const getProjectBalance = useCallback(
    async (contractAddress: string): Promise<number> => {
      const balance = await tokenContract?.balanceOf(contractAddress);
      return balance?.toString();
    },
    [tokenContract]
  );

  const isProjectLocked = useCallback(async (): Promise<boolean> => {
    if (!projectContract) {
      return false;
    }
    return projectContract.isLocked();
  }, [projectContract]);

  const isProjectApproved = useCallback(
    async (contractAddress: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      return communityContract.isProject(contractAddress);
    },
    [communityContract]
  );

  const getTokenAllowance = useCallback(async (): Promise<number | undefined> => {
    if (!tokenContract || !donorContract || !projectContract) {
      return undefined;
    }
    const allowance = await tokenContract.allowance(donorContract.target, projectContract.target);
    return allowance.toString();
  }, [tokenContract, donorContract, projectContract]);

  const approveProject = useCallback(
    async (contractAddress: string): Promise<void> => {
      if (!communityContract) {
        return;
      }
      await communityContract.approveProject(contractAddress).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const lockProject = useCallback(
    async (contractAddress: string): Promise<ContractTransactionResponse> =>
      donorContract?.lockProject(contractAddress).catch(handleContractError),
    [donorContract, handleContractError]
  );

  const unLockProject = useCallback(
    async (contractAddress: string): Promise<ContractTransactionResponse> =>
      donorContract?.unlockProject(contractAddress).catch(handleContractError),
    [donorContract, handleContractError]
  );

  const acceptToken = useCallback(
    async (amount: string): Promise<ContractTransactionResponse | void> => {
      if (!projectContract || !donorContract) {
        return;
      }
      await projectContract.acceptToken(donorContract.target, amount).catch(handleContractError);
    },
    [projectContract, donorContract, handleContractError]
  );

  const getVendorBalance = useCallback(
    async (walletAddress: string): Promise<number | undefined> => {
      if (!tokenContract) {
        return undefined;
      }
      const balance = await tokenContract.balanceOf(walletAddress);
      return balance?.toString();
    },
    [tokenContract]
  );

  const getVendorAllowance = useCallback(
    async (vendorAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return undefined;
      }
      const allowance = await projectContract.vendorAllowance(vendorAddress);
      return allowance?.toString();
    },
    [projectContract]
  );

  const checkActiveVendor = useCallback(
    async (address: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      const role = await communityContract.VENDOR_ROLE();
      return communityContract.hasRole(role, address).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const activateVendor = useCallback(
    async (address: string): Promise<void> => {
      if (!communityContract) {
        return;
      }
      const role = await communityContract.VENDOR_ROLE();
      await communityContract.grantRoleWithEth(role, address).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const sendTokensToVendor = useCallback(
    async (vendorAddress: string, amount: string): Promise<void> => {
      if (!projectContract) {
        return;
      }
      await projectContract
        .createAllowanceToVendor(vendorAddress, amount)
        .catch(handleContractError);
    },
    [projectContract, handleContractError]
  );

  const pendingVendorAllowance = useCallback(
    async (vendorAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return undefined;
      }
      const pending = await projectContract.vendorAllowancePending(vendorAddress);
      return pending?.toString();
    },
    [projectContract]
  );

  const acceptTokensByVendors = useCallback(
    async (numberOfTokens: string): Promise<void> => {
      if (!projectContract) {
        return;
      }
      await projectContract
        .acceptAllowanceByVendor(numberOfTokens.toString())
        .catch(handleContractError);
    },
    [projectContract, handleContractError]
  );

  const checkActiveBeneficiary = useCallback(
    async (address: string): Promise<boolean> => {
      if (!communityContract) {
        return false;
      }
      return communityContract.isBeneficiary(address).catch(handleContractError);
    },
    [communityContract, handleContractError]
  );

  const addBeneficiaryToProject = useCallback(
    async (address: string): Promise<ContractTransactionResponse> =>
      projectContract?.addBeneficiary(address).catch(handleContractError),
    [projectContract, handleContractError]
  );

  const activateBeneficiary = useCallback(
    async (address: string): Promise<ContractTransactionResponse> =>
      communityContract?.addBeneficiary(address).catch(handleContractError),
    [communityContract, handleContractError]
  );

  const assignClaimsToBeneficiaries = useCallback(
    async (walletAddress: string, amount: string): Promise<ContractTransactionResponse> =>
      projectContract?.assignClaims(walletAddress, amount?.toString()).catch(handleContractError),
    [projectContract, handleContractError]
  );

  // use when assigning ben to project
  const multiAssignBenToProject = useCallback(
    async (walletAddresses: string[]) => {
      if (!projectContract) throw new Error('No community contract');
      return multiSend(projectContract, 'addBeneficiary', walletAddresses);
    },
    [projectContract]
  );

  // use when bulk adding benefiiary(import)
  const multiActivateBen = useCallback(
    async (walletAddresses: string[]) => {
      if (!communityContract) throw new Error('No community contract');
      return multiSend(communityContract, 'addBeneficiary', walletAddresses);
    },
    [communityContract]
  );

  // use when bulk assigning claims (from inside project beneficiaries)
  const multiAssignClaimsToBeneficiary = useCallback(
    async (walletAddresses: string[], amount: string) => {
      if (!projectContract) throw new Error('No community contract');
      return multiSend(projectContract, 'assignClaims', [...walletAddresses, amount]);
    },
    [projectContract]
  );

  const beneficiaryBalance = useCallback(
    async (walletAddress: string): Promise<number | undefined> => {
      if (!projectContract) {
        return 0;
      }
      const balance = await projectContract.beneficiaryClaims(walletAddress);
      return balance?.toString();
    },
    [projectContract]
  );

  const beneficiaryCounts = useCallback(async (): Promise<number | undefined> => {
    if (!projectContract) {
      return undefined;
    }
    return projectContract.beneficiaryCount();
  }, [projectContract]);

  const getBeneficiaryChainData = useCallback(
    async (walletAddress: string): Promise<IBeneficiaryChainData> => {
      const [isBeneficiary, balance] = await Promise.all([
        checkActiveBeneficiary(walletAddress),
        beneficiaryBalance(walletAddress),
      ]);

      return {
        isBeneficiary,
        balance: balance || 0,
        // todo:add beneficiary pending tokens
        allowance: 0,
      };
    },
    [beneficiaryBalance, checkActiveBeneficiary]
  );

  const getVendorChainData = useCallback(
    async (address: string): Promise<IVendorChainData> => {
      const [balance, allowance, isVendor, pending] = await Promise.all([
        getVendorBalance(address),
        getVendorAllowance(address),
        checkActiveVendor(address),
        pendingVendorAllowance(address),
      ]);
      return {
        balance: allowance || 0,
        isVendor,
        pending: pending || 0,
        disbursed: balance || 0,
      };
    },
    [checkActiveVendor, getVendorAllowance, getVendorBalance, pendingVendorAllowance]
  );

  const getProjectChainData = useCallback(
    async (contractAddress: string) => {
      const [balance, tokenAllowance, isLocked, isApproved] = await Promise.all([
        getProjectBalance(contractAddress),
        getTokenAllowance(),
        isProjectLocked(),
        isProjectApproved(contractAddress),
      ]);
      return {
        balance,
        tokenAllowance,
        isLocked,
        isApproved,
      };
    },
    [getProjectBalance, isProjectApproved, getTokenAllowance, isProjectLocked]
  );

  return useMemo(
    () => ({
      projectContract,
      abi,
      getProjectBalance,
      communityContract,
      isProjectLocked,
      isProjectApproved,
      getProjectChainData,
      approveProject,
      lockProject,
      unLockProject,
      acceptToken,
      getTokenAllowance,
      getVendorBalance,
      getVendorAllowance,
      checkActiveVendor,
      activateVendor,
      sendTokensToVendor,
      pendingVendorAllowance,
      acceptTokensByVendors,
      checkActiveBeneficiary,
      addBeneficiaryToProject,
      assignClaimsToBeneficiaries,
      beneficiaryBalance,
      getBeneficiaryChainData,
      beneficiaryCounts,
      getVendorChainData,
      activateBeneficiary,
      multiAssignBenToProject,
      multiAssignClaimsToBeneficiary,
      multiActivateBen,
    }),
    [
      projectContract,
      abi,
      getProjectBalance,
      communityContract,
      isProjectLocked,
      isProjectApproved,
      getProjectChainData,
      approveProject,
      lockProject,
      unLockProject,
      acceptToken,
      getTokenAllowance,
      getVendorBalance,
      getVendorAllowance,
      checkActiveVendor,
      activateVendor,
      sendTokensToVendor,
      pendingVendorAllowance,
      acceptTokensByVendors,
      checkActiveBeneficiary,
      addBeneficiaryToProject,
      assignClaimsToBeneficiaries,
      beneficiaryBalance,
      getBeneficiaryChainData,
      beneficiaryCounts,
      getVendorChainData,
      activateBeneficiary,
      multiAssignBenToProject,
      multiAssignClaimsToBeneficiary,
      multiActivateBen,
    ]
  );
};

export default useProjectContract;
