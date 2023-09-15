import { IBeneficiaryChainData } from 'src/types/contract-hooks/useProject';
import { create } from 'zustand';

export type BeneficiaryStateType = {
  chainData: IBeneficiaryChainData;
};

type BeneficiaryActionsType = {
  setChainData: (chainData: IBeneficiaryChainData) => void;
};

export type BeneficiaryStoreType = BeneficiaryStateType & BeneficiaryActionsType;

const useBeneficiaryStore = create<BeneficiaryStoreType>((set) => ({
  chainData: {
    isBeneficiary: null,
    allowance: 0,
    balance: 0,
  },
  setChainData: (chainData: IBeneficiaryChainData) => {
    set({ chainData });
  },
}));

export default useBeneficiaryStore;
