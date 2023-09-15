import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiariesCreateItem, IBeneficiaryApiFilters } from 'src/types/beneficiaries';

const BeneficiaryService = {
  list: (params?: IBeneficiaryApiFilters) =>
    axiosInstance.get(endpoints.beneficiaries.list, { params }),
  create: (data: IBeneficiariesCreateItem) =>
    axiosInstance.post(endpoints.beneficiaries.create, { ...data }),
  update: (uuid: string, data: IBeneficiariesCreateItem) =>
    axiosInstance.patch(endpoints.beneficiaries.update(uuid), { ...data }),
  details: (uuid: string) => axiosInstance.get(endpoints.beneficiaries.details(uuid)),
  assignProject: (uuid: string, data: any) =>
    axiosInstance.post(endpoints.beneficiaries.assignProject(uuid), { ...data }),
  disable: (walletAddress: string) =>
    axiosInstance.patch(endpoints.beneficiaries.disable(walletAddress)),
  getStats: () => axiosInstance.get(endpoints.beneficiaries.stats),
  geoLoc: () => axiosInstance.get(endpoints.beneficiaries.geoLoc),
};

export default BeneficiaryService;
