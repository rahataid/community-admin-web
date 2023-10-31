'use client';

// @mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
// routes
// utils
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { AWS_ROOT_FOLDER_NAME } from '@config';
import { Alert, Grid } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Upload } from 'src/components/upload';

// ----------------------------------------------------------------------

type UploadImageProps = {
  handleCoverUpload: (file: File) => void;
  handleUploadMultiple: (files: File[]) => void;
  error?: string;
  isUploading: boolean;
  community: any;
};

export default function UploadImage({
  handleCoverUpload,
  handleUploadMultiple,
  error,
  isUploading,
  community,
}: UploadImageProps) {
  const preview = useBoolean();
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [file, setFile] = useState<File | string | null>(null);
  const handleDropSingleFile = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(
        Object.assign(newFile, {
          preview: URL.createObjectURL(newFile),
        })
      );
    }
  }, []);

  const handleDropMultiFile = useCallback(
    (acceptedFiles: File[]) => {
      setFiles([
        ...files,
        ...acceptedFiles.map((newFile) =>
          Object.assign(newFile, {
            preview: URL.createObjectURL(newFile),
          })
        ),
      ]);
    },
    [files]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filesFiltered = files.filter((fileFiltered) => fileFiltered !== inputFile);
    setFiles(filesFiltered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const onUploadMultiple = () => {
    handleUploadMultiple(files);
  };

  const onUploadCoverPhoto = () => {
    handleCoverUpload(file);
  };

  useEffect(() => {
    setFile(
      `https://rahat-rumsan.s3.us-east-1.amazonaws.com/${AWS_ROOT_FOLDER_NAME}/${community?.name}/${community?.images?.cover}`
    );

    const galleryUrls =
      community?.images?.gallery?.map(
        (gal) =>
          `https://rahat-rumsan.s3.us-east-1.amazonaws.com/${AWS_ROOT_FOLDER_NAME}/${community?.name}/${gal}`
      ) || [];
    setFiles(galleryUrls);
  }, [community]);

  return (
    <Grid sx={{ my: 5 }}>
      <Stack spacing={5}>
        <Card>
          <CardHeader title="Upload Cover Photo" />
          <CardContent>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <Upload
              maxSize={15000000}
              file={file}
              onDrop={handleDropSingleFile}
              onDelete={() => setFile(null)}
              onUpload={onUploadCoverPhoto}
              helperText="Max file size is 15MB"
              thumbnail={preview.value}
              disabled={isUploading}
            />
          </CardContent>
        </Card>

        <Card>
          {/* <CardHeader
            title="Upload Multi Photos"
            action={
              <FormControlLabel
                control={<Switch checked={preview.value} onClick={preview.onTrue} />}
                label="Show Thumbnail"
              />
            }
          /> */}
          <CardContent>
            <Upload
              multiple
              thumbnail={preview.value === false}
              files={files}
              onDrop={handleDropMultiFile}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={onUploadMultiple}
            />
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}
