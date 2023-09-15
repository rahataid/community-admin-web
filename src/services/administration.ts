import { axiosInstance, endpoints } from '@utils/axios';
import { IUsersApiFilters } from 'src/types/administration';
import { IUserDetails } from 'src/types/user';

const AdministrationService = {
  list: (params?: IUsersApiFilters) =>
    axiosInstance.get(endpoints.administration.users.list, { params }),
  approve: (walletAddress: string) =>
    axiosInstance.patch(endpoints.administration.users.approve(walletAddress)),
  disable: (id: number) => axiosInstance.delete(endpoints.administration.users.disable(id)),
  create: (data: IUserDetails) =>
    axiosInstance.post(endpoints.administration.users.create, { ...data }),
  updateRole: (walletAddress: string, role: string) =>
    axiosInstance.patch(endpoints.administration.users.updateRole(walletAddress), { role }),
};

export default AdministrationService;
