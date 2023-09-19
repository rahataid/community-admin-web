import { yupResolver } from '@hookform/resolvers/yup';
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
import { Alert, AlertTitle, Button, MenuItem, Tooltip } from '@mui/material';
import { paths } from '@routes/paths';
import AdministrationService from '@services/administration';
import { useMutation } from '@tanstack/react-query';
import { generateWalletAddress } from '@web3/utils';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { IApiResponseError } from 'src/types/project';
import { IUserDetails, IUserTableFilters } from 'src/types/user';

type Props = {
  currentUser?: IUserTableFilters;
};

interface FormValues extends IUserTableFilters {}

const UserAddForm: React.FC = ({ currentUser }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, mutate } = useMutation<
    IUserDetails,
    IApiResponseError,
    IUserTableFilters
  >({
    mutationFn: async (createData: IUserTableFilters) => {
      const response = await AdministrationService.create(createData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error creating user', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('User created successfully', { variant: 'success' });
      reset();
      push(paths.dashboard.administration.users.list);
    },
  });

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().nullable().optional().email('Email is invalid'),
    roles: Yup.string().optional(),
    walletAddress: Yup.string().nullable().required('Wallet address is required'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      roles: currentUser?.roles || undefined,
      walletAddress: currentUser?.walletAddress || '',
    }),
    [currentUser]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, trigger } = methods;
  const handleGenerateWalletAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('walletAddress', address);
    trigger('walletAddress');
  }, [setValue, trigger]);

  // const onSubmit = useCallback((data: IUserTableFilters) => mutate(data), [mutate]);
  const onSubmit = useCallback(
    (data: IUserTableFilters) => {
      const modifiedData: any = {
        ...data,
        // eslint-disable-next-line no-nested-ternary
        roles: data.roles ? (Array.isArray(data.roles) ? data.roles : [data.roles]) : ['USER'],
      };

      mutate(modifiedData);
    },
    [mutate]
  );

  const roleOptions = useMemo(() => ['USER', 'ADMIN'], []);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating User</AlertTitle>
          {error?.message}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Name" />

              <RHFTextField name="email" label="Email" />

              <RHFSelect name="roles" label="Role" defaultValue={['USER']}>
                {roleOptions.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFTextField
                name="walletAddress"
                label="Wallet Address"
                InputProps={{
                  endAdornment: (
                    <Tooltip title="Generate Contract Address" sx={{ margin: '0 !important' }}>
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
                sx={{ padding: '0 !important' }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Create User
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(UserAddForm);
