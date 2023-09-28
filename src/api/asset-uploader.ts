import CommunityService from '@services/community';
import { useMutation } from '@tanstack/react-query';

export const useAWSUploader = () => {
  const uploadFile = useMutation(
    ['asset-uploader'],
    async ({ walletAddress, data }: { walletAddress: string; data: any }) => {
      const res = await CommunityService.uploadAssets(walletAddress, data);
      return res;
    }
  );

  return {
    uploadFile,
  };
};
