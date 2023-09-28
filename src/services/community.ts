import { axiosInstance, endpoints } from '@utils/axios';
import { ICommunityApiFilters, ICommunityDetails } from 'src/types/community';

export type UploadAssetParams = {
  file: Buffer;
  mimeType: string;
  folderName: string;
  fileName: string;
};

const CommunityService = {
  list: (params?: ICommunityApiFilters) => axiosInstance.get(endpoints.communitiy.list, { params }),
  create: (data: ICommunityDetails) => axiosInstance.post(endpoints.communitiy.create, { ...data }),
  detail: (address: string) => axiosInstance.post(endpoints.communitiy.details(address)),
  updateMultipleAssets: (id: string,key:string, data: any,) =>
    axiosInstance.post(endpoints.communitiy.updateMultipleAssets(id,key), data ),
  uploadAssets: (id: string,key:string, data: any,) =>
    axiosInstance.post(endpoints.communitiy.uploadAssets(id,key), data),
};

export default CommunityService;
