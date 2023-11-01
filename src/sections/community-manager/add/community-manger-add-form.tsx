import { memo, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
import { useRouter } from 'src/routes/hook';
// types
// assets
// components
import Iconify from '@components/iconify/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Tooltip } from '@mui/material';
import { generateWalletAddress } from '@web3/utils';
import { useCreateManager } from 'src/api/manager';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { ICommunityManagerAddValue } from 'src/types/community';

type Props = {
  currentManager?: ICommunityManagerAddValue;
};

interface FormValues extends ICommunityManagerAddValue {}

const CommunityManagerAddForm: React.FC = ({ currentManager }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { isSuccess, error, isLoading, mutate } = useCreateManager();

  const NewCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    walletAddress: Yup.string().nullable().optional().required('WalletAddress is required'),
    email: Yup.string().required('Email is required'),
    phone: Yup.string().required('Phone is required'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentManager?.name || '',
      email: currentManager?.email || '',
      walletAddress: currentManager?.walletAddress || '',
      phone: currentManager?.phone || '',
    }),
    [currentManager]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewCommunitySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, trigger, getValues } = methods;

  const handleGenerateWalletAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('walletAddress', address);
    trigger('walletAddress');
  }, [setValue, trigger]);

  const onSubmit = useCallback(
    (data: ICommunityManagerAddValue) => {
      mutate(data);
    },
    // mutate(data)
    [mutate]
  );

  return (
    <Stack>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid xs={12} md={12}>
            <Stack spacing={5}>
              <Card sx={{ p: 3, m: 2 }}>
                <Box
                  rowGap={4}
                  columnGap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    lg: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFTextField name="name" label="Name" />
                  <RHFTextField name="email" label="Email" />
                  <RHFTextField name="phone" label="Phone" />

                  <RHFTextField
                    name="walletAddress"
                    label="Wallet Address"
                    InputProps={{
                      endAdornment: (
                        <Tooltip title="Generate Wallet Address" sx={{ margin: '0 !important' }}>
                          <Button
                            sx={{
                              padding: 0,
                              margin: 0,
                              minWidth: '40px !important',
                              width: '40px !important',
                              height: '40px !important',
                              borderRadius: '50%',
                              marginRight: '-12px !important',
                            }}
                            startIcon={
                              <Iconify
                                sx={{
                                  width: 24,
                                  height: 24,
                                  margin: '0px !important',
                                  marginRight: '-12px !important',
                                }}
                                icon="ph:wallet-duotone"
                                onClick={handleGenerateWalletAddress}
                              />
                            }
                          />
                        </Tooltip>
                      ),
                    }}
                    // sx={{ padding: '0 !important' }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="submit"
                    variant="outlined"
                    color="success"
                    loading={isLoading}
                  >
                    Add
                  </LoadingButton>
                </Stack>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>
    </Stack>
  );
};

export default memo(CommunityManagerAddForm);
