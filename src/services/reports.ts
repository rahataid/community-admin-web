import { axiosInstance, endpoints } from '@utils/axios';

const ReportsService = {
  list: () => axiosInstance.get(endpoints.reports.dashboard.count),
  reportByAddress: (address: string) =>
    axiosInstance.get(endpoints.reports.byContractAddress(address)),
};

export default ReportsService;
