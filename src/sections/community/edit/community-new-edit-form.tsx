'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { memo, useCallback, useState } from 'react';

// @mui
// utils
// routes
// types
// assets
// components
import { ConfirmDialog } from '@components/custom-dialog';
import Iconify from '@components/iconify/iconify';
import { useBoolean } from '@hooks/use-boolean';
import { Button, Stack, Tooltip } from '@mui/material';
import { paths } from '@routes/paths';
import { useParams, useRouter } from 'next/navigation';
import { useAWSUploader } from 'src/api/asset-uploader';
import { useCommunity, useRemoveCommunity } from 'src/api/community';
import CommunityEditForm from './community-edit-form';
import UploadImage from './image-upload/upload-image';

const CommunityAddForm: React.FC = () => {
  const { address } = useParams();
  const { community } = useCommunity(address);
  const communityRemoveModal = useBoolean();
  const removeCommunity = useRemoveCommunity();
  const [selectedAddress, setSelectedAddress] = useState('');
  const { push } = useRouter();

  const awsUploader = useAWSUploader();

  const handleMultipleAssetUpload = async (files: File[]) => {
    const formData = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const file of files) {
      formData.append('file', file);
    }
    const result = await awsUploader.uploadMultipleFile.mutateAsync({
      key: 'gallery',
      walletAddress: address,
      data: formData,
    });
    console.log(result);
  };

  const handleCoverUpload = async (file: File) => {
    const formData = new FormData();

    formData.append('file', file);
    const result = await awsUploader.uploadFile.mutateAsync({
      key: 'cover',
      walletAddress: address,
      data: formData,
    });
    console.log(result);
  };

  const handleModalToDeleteRow = useCallback(
    async (address1) => {
      communityRemoveModal.onTrue();
      setSelectedAddress(address1);
    },
    [communityRemoveModal]
  );

  const handleDeleteRow = useCallback(() => {
    removeCommunity.mutate(selectedAddress);
    push(paths.dashboard.general.community.list);
    communityRemoveModal.onFalse();
  }, [communityRemoveModal, push, removeCommunity, selectedAddress]);

  return (
    <Stack>
      <ConfirmDialog
        open={communityRemoveModal.value}
        title="Selected community will be Permanently Removed"
        action={
          <Button variant="text" onClick={handleDeleteRow} autoFocus>
            Remove
          </Button>
        }
        onClose={communityRemoveModal.onFalse}
      />
      <CustomBreadcrumbs
        heading={community?.name}
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Edit' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Tooltip title="Delete" placement="top" arrow>
            <Button
              variant="outlined"
              endIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              color="error"
              onClick={() => handleModalToDeleteRow(community?.address)}

            >
             Delete
            </Button>

          </Tooltip>
        }
      />

      <CommunityEditForm community={community} />

      <UploadImage
        handleUploadMultiple={handleMultipleAssetUpload}
        handleCoverUpload={handleCoverUpload}
        isUploading={awsUploader.uploadFile.isLoading}
        error={awsUploader.uploadFile.error?.message}
        community={community}
      />
    </Stack>
  );
};

export default memo(CommunityAddForm);
