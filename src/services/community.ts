import { axiosInstance, endpoints } from '@utils/axios';
import { ICommunityAddDetails, ICommunityApiFilters } from 'src/types/community';

export type UploadAssetParams = {
  file: Buffer;
  mimeType: string;
  folderName: string;
  fileName: string;
};

const CommunityService = {
  list: (params?: ICommunityApiFilters) => axiosInstance.get(endpoints.communitiy.list, { params }),
  geoLoc: () => axiosInstance.get(endpoints.communitiy.geoLoc),
  create: (data: ICommunityAddDetails) => axiosInstance.post(endpoints.communitiy.create, data),
  detail: (address: string) => axiosInstance.get(endpoints.communitiy.details(address)),
  updateMultipleAssets: (id: string, key: string, data: any) =>
    axiosInstance.post(endpoints.communitiy.updateMultipleAssets(id, key), data),
  uploadAssets: (id: string, key: string, data: any) =>
    axiosInstance.post(endpoints.communitiy.uploadAssets(id, key), data),
  getMultipleAsset: (address: string) =>
    axiosInstance.get(endpoints.communitiy.getMultipleAsset(address)),
  editCommunity: (address: string, data: any) =>
    axiosInstance.patch(endpoints.communitiy.editCommunity(address), { ...data }),
  deleteCommunity: (address: string) =>
    axiosInstance.delete(endpoints.communitiy.deleteCommunity(address)),
  rmvGalleryImageAssetFromCommunity: (address: string, fileName: string) =>
    axiosInstance.patch(endpoints.communitiy.rmvGalleryImageAssetFromCommunity(address), {
      fileName,
    }),
};

export default CommunityService;
