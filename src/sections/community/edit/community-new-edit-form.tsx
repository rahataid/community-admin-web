'use client';

import { memo } from 'react';
// @mui
// utils
// routes
// types
// assets
// components

import { Stack } from '@mui/material';
import { useParams } from 'next/navigation';
import { useAWSUploader } from 'src/api/asset-uploader';
import { useCommunity } from 'src/api/community';
import CommunityEditForm from './community-edit-form';
import UploadImage from './image-upload/upload-image';

const CommunityAddForm: React.FC = () => {
  const { address } = useParams();
  const { community } = useCommunity(address);



  const awsUploader = useAWSUploader();

  const handleMultipleAssetUpload = async (files: File[]) => {   
   
  const formData = new FormData();
  // eslint-disable-next-line no-restricted-syntax
  for (const file of files){
    
    formData.append('file', file);
  }
  const result = await awsUploader.uploadMultipleFile.mutateAsync({
    key:'gallery',
    walletAddress: address,
    data: formData,
  });
  console.log(result);

  };

  const handleCoverUpload = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);
    const result = await awsUploader.uploadFile.mutateAsync({
      key:'cover',
      walletAddress: address,
      data: formData,
    });
    console.log(result);
  };


  return (

     <Stack>
        <h3 style={{textAlign:'center'}}>Community: {community?.name}</h3>
    
      <UploadImage
        handleUploadMultiple={handleMultipleAssetUpload}
        handleCoverUpload={handleCoverUpload}
        isUploading={awsUploader.uploadFile.isLoading}
        error={awsUploader.uploadFile.error?.message}
        community={community}
      />
      <CommunityEditForm community={community}  />
     </Stack>

  );
};

export default memo(CommunityAddForm);
