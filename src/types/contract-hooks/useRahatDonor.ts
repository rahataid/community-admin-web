import { Contract, ContractTransactionResponse } from 'ethers';

export interface UseRahatDonorReturn {
  donorContract: Contract | null;
  rahatTokenContract: Contract | null;
  sendTokenToProject: (amount: string) => Promise<ContractTransactionResponse>;
}
