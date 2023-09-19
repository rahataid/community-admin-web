import { axiosInstance, endpoints } from '@utils/axios';
import { ICommunityApiFilters, ICommunityDetails } from 'src/types/community';

const CommunityService = {
  list: (params?: ICommunityApiFilters) =>
    axiosInstance.get(endpoints.communitiy.list, { params }),
  create: (data: ICommunityDetails) =>
    axiosInstance.post(endpoints.communitiy.create, { ...data }),
 };

export default CommunityService;
