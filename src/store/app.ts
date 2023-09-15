import AppSettingService from '@services/app-settings';
import { IAppSettingsContractsApiResponse, IAppSettingsNetwork } from 'src/types/app-settings';
import { create } from 'zustand';

export type AppStateType = {
  contracts: IAppSettingsContractsApiResponse | undefined;
  blockchain: IAppSettingsNetwork | undefined;
};

type AppActionsType = {
  setContracts: () => Promise<void>;
  setBlockchain: () => Promise<void>;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = create<AppStoreType>((set) => ({
  contracts: undefined,
  blockchain: undefined,
  setContracts: async () => {
    const { data } = await AppSettingService.getContracts();

    set({ contracts: data?.value });
  },
  setBlockchain: async () => {
    const {
      data: { value },
    } = await AppSettingService.getBlockchainSettings();
    const blockchain = {
      chainId: value?.chainId,
      chainName: value?.chainName,
      rpcUrls: [value?.rpcUrl],
      nativeCurrency: {
        name: value.nativeCurrency.name as string,
        symbol: value?.nativeCurrency?.symbol,
        decimals: value?.nativeCurrency?.decimals,
      },
    };
    set({ blockchain });
  },
}));

export default useAppStore;
