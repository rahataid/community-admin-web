import { memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import { ConfirmDialog } from '@components/custom-dialog';
import Iconify from '@components/iconify/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useBoolean } from '@hooks/use-boolean';
import { Button, MenuItem, Tooltip } from '@mui/material';
import { generateWalletAddress } from '@web3/utils';
import axios from 'axios';
import { useCategory } from 'src/api/category';
import { useCreateCommunities } from 'src/api/community';
import FormProvider, { RHFMultiSelect, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { ICommunityTableAddValue } from 'src/types/community';

type Props = {
  currentCommunity?: ICommunityTableAddValue;
};

interface FormValues extends ICommunityTableAddValue {}

const CommunityAddForm: React.FC = ({ currentCommunity }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [countries, setCountries] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const communityAddModal = useBoolean();

  useEffect(() => {
    // Fetch countries from the REST Countries API
    axios.get('https://restcountries.com/v2/all').then((response) => {
      const countryOptions = response.data.map((country: any) => ({
        value: country.name,
        label: country.name,
      }));
      setCountries(countryOptions);
    });
  }, []);
  const { isSuccess, error, isLoading, mutate } = useCreateCommunities();
  const { categories } = useCategory();

  const NewCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().nullable().optional().required('WalletAddress is required'),
    country: Yup.string().required('Country is required'),
    categoryId: Yup.number().required('Category is required'),
    description: Yup.string().required('Description is required'),
    localCurrency: Yup.string().optional(),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentCommunity?.name || '',
      address: currentCommunity?.address || '',
      country: currentCommunity?.country || '',
      categoryId: currentCommunity?.categoryId || Yup.number,
      description: currentCommunity?.description || '',
      localCurrency: 'NPR',
      longitude: 0,
      latitude: 0,
    }),
    [currentCommunity]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewCommunitySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, trigger, getValues } = methods;

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSelectedValue(value);
    setValue('country', value);
  };

  const handleGenerateWalletAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('address', address);
    trigger('address');
  }, [setValue, trigger]);

  const onSubmit = useCallback(
    (data: ICommunityTableAddValue) => {
      mutate(data);
      communityAddModal.onFalse();
    },
    // mutate(data)
    [communityAddModal, mutate]
  );

  const handletoAddcommunity = useCallback(
    async (data: ICommunityTableAddValue) => {
      if (data) communityAddModal.onTrue();
    },
    [communityAddModal]
  );

  return (
    <Stack>
      <ConfirmDialog
        open={communityAddModal.value}
        title="Are you sure to add a new community?"
        action={
          <Button variant="text" onClick={handleSubmit(onSubmit)} autoFocus>
            Add
          </Button>
        }
        onClose={communityAddModal.onFalse}
      />
      <FormProvider methods={methods}>
        {/* {error && (
          <Alert severity="error">
            <AlertTitle>Error Creating Community</AlertTitle>
            {error?.message}
          </Alert>
        )} */}
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

                  <RHFSelect name="categoryId" label="Category">
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </RHFSelect>

                  <RHFTextField
                    name="address"
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
                  <RHFMultiSelect // Single Select
                    name="country"
                    options={countries}
                    // placeholder="Select country"
                    value={selectedValue}
                    onChange={handleChange}
                    chip={false}
                    checkbox={false}
                    label="Country"
                  />
                </Box>
                <Box>
                  <RHFTextField
                    name="description"
                    label="Description"
                    multiline
                    sx={{ gridColumn: 'span 3', mt: 4 }}
                    rows={6}
                  />
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton
                    type="button"
                    variant="outlined"
                    color="success"
                    loading={isLoading}
                    onClick={handletoAddcommunity}
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

export default memo(CommunityAddForm);
