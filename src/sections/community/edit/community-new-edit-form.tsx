'use client';

import { memo } from 'react';
// @mui
// utils
// routes
// types
// assets
// components

import { useParams } from 'next/navigation';
import { useAWSUploader } from 'src/api/asset-uploader';
import { useUpdateCommunityAssets } from 'src/api/community';
import CommunityEditForm from './community-edit-form';
import UploadImage from './image-upload/upload-image';

const CommunityAddForm: React.FC = () => {
  const { address } = useParams();
  // const { community } = useCommunity(address);

  const updateCommunityAssets = useUpdateCommunityAssets();

  const awsUploader = useAWSUploader();

  const handleMultipleAssetUpload = (files: File[]) => {
    console.log(files);
  };

  const handleCoverUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      console.log(reader.result);
      const buffer = Buffer.from(reader.result, 'utf-8');
      await awsUploader.uploadFile.mutateAsync({
        id: address,
        data: {
          file: buffer,
          fileName: file.name,
          mimeType: file.type,
          folderName: 'development',
          // folderName: community?.name,
        },
      });
    };
  };

  console.log(awsUploader.uploadFile);
  return (
    <>
      <UploadImage
        handleUploadMultiple={handleMultipleAssetUpload}
        handleCoverUpload={handleCoverUpload}
        isUploading={awsUploader.uploadFile.isLoading}
        error={awsUploader.uploadFile.error?.message}
      />
      <CommunityEditForm />
    </>
  );
};

export default memo(CommunityAddForm);
