import { Contract, ContractTransactionResponse, InterfaceAbi, TransactionReceipt } from 'ethers';

export type IProjectChainData = {
  balance: number | undefined;
  tokenAllowance: number | undefined;
  isLocked: boolean | undefined;
  isApproved: boolean | undefined;
};

export type IBeneficiaryChainData = {
  isBeneficiary: boolean | null;
  balance: number;
  allowance: number;
};
export type IVendorChainData = {
  isVendor: boolean | null;
  balance: number;
  pending: number;
  disbursed: number;
};

export interface ProjectContract {
  projectContract: Contract | null;
  abi: InterfaceAbi | null;
  getProjectBalance: (contractAddress: string) => Promise<number>;
  communityContract: Contract | null;
  isProjectLocked: () => Promise<boolean>;
  isProjectApproved: (contractAddress: string) => Promise<boolean>;
  getProjectChainData: (contractAddress: string) => Promise<IProjectChainData>;
  approveProject: (contractAddress: string) => Promise<void>;
  lockProject: (contractAddress: string) => Promise<ContractTransactionResponse>;
  unLockProject: (contractAddress: string) => Promise<ContractTransactionResponse>;
  acceptToken: (amount: string) => Promise<ContractTransactionResponse | void>;
  getTokenAllowance: () => Promise<number | undefined>;
  getVendorBalance: (walletAddress: string) => Promise<number | undefined>;
  getVendorAllowance: (vendorAddress: string) => Promise<number | undefined>;
  checkActiveVendor: (address: string) => Promise<boolean>;
  activateVendor: (address: string) => Promise<void>;
  sendTokensToVendor: (vendorAddress: string, amount: string) => Promise<void>;
  pendingVendorAllowance: (vendorAddress: string) => Promise<number | undefined>;
  acceptTokensByVendors: (numberOfTokens: string) => Promise<void>;
  checkActiveBeneficiary: (address: string) => Promise<boolean>;
  activateBeneficiary: (address: string) => Promise<ContractTransactionResponse>;
  addBeneficiaryToProject: (address: string) => Promise<ContractTransactionResponse>;
  assignClaimsToBeneficiaries: (
    walletAddress: string,
    amount: string
  ) => Promise<ContractTransactionResponse>;
  beneficiaryBalance: (walletAddress: string) => Promise<number | undefined>;
  getBeneficiaryChainData: (walletAddress: string) => Promise<IBeneficiaryChainData>;
  beneficiaryCounts: () => Promise<number | undefined>;
  getVendorChainData: (address: string) => Promise<IVendorChainData>;
  multiAssignClaimsToBeneficiary: (walletAddresses: string[]) => Promise<TransactionReceipt>;
  multiAssignBenToProject: (walletAddresses: string[]) => Promise<TransactionReceipt>;
  multiActivateBen: (walletAddresses: string[]) => Promise<TransactionReceipt>;
}
