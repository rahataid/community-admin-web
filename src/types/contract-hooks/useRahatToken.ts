import { Contract } from 'ethers';

export interface UseRahatTokenReturn {
  contract: Contract | null;
  contractWS: Contract | null;
  getAllowance: (from: string, to: string) => Promise<number | undefined>;
}
