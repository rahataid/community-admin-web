'use client';

// @mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
// routes
// utils
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useCallback, useState } from 'react';
import { Upload } from 'src/components/upload';

// ----------------------------------------------------------------------



export default function UploadImage({onUpload}) {
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
  return (
    <>
      <Stack spacing={5}>
        <Card>
          <CardHeader
            title="Upload Multi Photos"
            action={
              <FormControlLabel
                control={<Switch checked={preview.value} onClick={preview.onToggle} />}
                label="Show Thumbnail"
              />
            }
          />
          <CardContent>
            <Upload
              multiple
              thumbnail={preview.value}
              files={files}
              onDrop={handleDropMultiFile}
              onRemove={handleRemoveFile}
              onRemoveAll={handleRemoveAllFiles}
              onUpload={() => console.info('ON UPLOAD')}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upload Cover Photo" />
          <CardContent>
            <Upload
              file={file}
              onDrop={handleDropSingleFile}
              onDelete={() => setFile(null)}
              onUpload={onUpload}
            />
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}
