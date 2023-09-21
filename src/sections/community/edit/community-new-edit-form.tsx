'use client';

import { memo } from 'react';
// @mui
// utils
// routes
// types
// assets
// components
import { useParams } from 'next/navigation';
import { useUpdateCommunityAssets } from 'src/api/community';
import CommunityEditForm from './community-edit-form';
import UploadImage from './image-upload/upload-image';

const CommunityAddForm: React.FC = () => {
 const {address} = useParams();

const updateCommunityAssets = useUpdateCommunityAssets()

const handleMultipleAssetUpload=(files:File[])=>{
  console.log(files)

}

const handleCoverUpload = (file:File)=>{
  console.log(file)
}


 console.log(typeof(address))
  return (
    <>
      <UploadImage handleUploadMultiple={handleMultipleAssetUpload} handleCoverUpload={handleCoverUpload}/>
      <CommunityEditForm/>

    </>
  );
};

export default memo(CommunityAddForm);
