import CommunityService from '@services/community';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export const useAWSUploader = () => {
  const { enqueueSnackbar } = useSnackbar();

  const uploadFile = useMutation(
    ['asset-uploader'],
    async ({ walletAddress, data ,key}: {key:string, walletAddress: string; data: any }) => {
      const res = await CommunityService.uploadAssets(walletAddress, key,data);
      return res;
    },
    {
      onError: () => {
        enqueueSnackbar('Error while Uploading', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Uploaded Successfully', { variant: 'success' });
      },
    }
  );

  const uploadMultipleFile = useMutation(
    ['asset-uploaders'],
    async ({ walletAddress, data ,key}: {key:string, walletAddress: string; data: any }) => {
      console.log(data)
      const res = await CommunityService.updateMultipleAssets(walletAddress, key,data);
      return res;
    }
  );
  return {
    uploadFile,
    uploadMultipleFile
  };
};
