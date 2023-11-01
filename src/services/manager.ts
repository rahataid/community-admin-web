import { axiosInstance, endpoints } from '@utils/axios';
import { ICommunityManagerDetails, ICommunityManagerUpdateDetails } from 'src/types/community';

const ManagerService = {
  list: (params?: any) => axiosInstance.get(endpoints.manager.list, { params }),
  create: (data: ICommunityManagerDetails) => axiosInstance.post(endpoints.manager.create, data),
  update: (data?: ICommunityManagerUpdateDetails) =>
    axiosInstance.patch(endpoints.manager.update, { ...data }),
};

export default ManagerService;
