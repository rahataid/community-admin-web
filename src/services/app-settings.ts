import { axiosInstance, endpoints } from '@utils/axios';
import { AxiosInstance } from 'axios';
import { IAppSettingsNetworkApiResponse } from 'src/types/app-settings';

interface BlockchainSettingsApiResponse extends AxiosInstance {
  data: {
    value: IAppSettingsNetworkApiResponse;
  };
}

const AppSettingService = {
  getBlockchainSettings: (): Promise<BlockchainSettingsApiResponse> =>
    axiosInstance.get(endpoints.appSettings.blockchain),
  getContracts: () => axiosInstance.get(endpoints.appSettings.contracts),
};

export default AppSettingService;
