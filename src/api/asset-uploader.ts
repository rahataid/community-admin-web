import CommunityService, { UploadAssetParams } from '@services/community';
import { useMutation } from '@tanstack/react-query';

export const useAWSUploader = () => {
  const uploadFile = useMutation(
    ['asset-uploader'],
    async ({ id, data }: { id: string; data: UploadAssetParams }) => {
      const res = await CommunityService.uploadAssets(id, data);
      return res;
    }
  );

  return {
    uploadFile,
  };
};
