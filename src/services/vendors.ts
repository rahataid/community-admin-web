import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiaryApiFilters } from 'src/types/beneficiaries';

const VendorsService = {
  list: (params?: IBeneficiaryApiFilters) => axiosInstance.get(endpoints.vendors.list, { params }),
  details: (walletAddress: string) => axiosInstance.get(endpoints.vendors.details(walletAddress)),
};

export default VendorsService;
