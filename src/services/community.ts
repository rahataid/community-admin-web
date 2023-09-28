import { axiosInstance, endpoints } from '@utils/axios';
import { ICommunityApiFilters, ICommunityDetails, IcommunityAssets } from 'src/types/community';

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
  updateAssets: (id: string, data: IcommunityAssets) =>
    axiosInstance.patch(endpoints.communitiy.updateAssets(id), { ...data }),
  uploadAssets: (id: string, data: UploadAssetParams) =>
    axiosInstance.post(endpoints.communitiy.uploadAssets(id), { ...data }),
};

export default CommunityService;
