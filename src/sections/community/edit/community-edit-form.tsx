// import FormProvider from "@components/hook-form/form-provider";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Alert, AlertTitle, Grid } from "@mui/material";
// import { Stack } from "@mui/system";
// import { useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { ICommunityTableFilterValue } from "src/types/community";
// import * as Yup from 'yup';

'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
import { useParams, useRouter } from 'src/routes/hook';
// types
// assets
// components
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle, Box, Card, MenuItem } from '@mui/material';
import { useCategory } from 'src/api/category';
import { useCommunity, useCreateCommunities } from 'src/api/community';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import { ICommunityTableFilterValue } from 'src/types/community';
interface FormValues extends ICommunityTableFilterValue {}
type Props = {
  currentCommunity?: ICommunityTableFilterValue;
};

const CommunityEditForm = ({ currentCommunity }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { address } = useParams();
  // useEffect(() => {
  //   // Fetch countries from the REST Countries API
  //   axios.get('https://restcountries.com/v2/all').then((response) => {
  //     const countryOptions = response.data.map((country: any) => ({
  //       value: country.name,
  //       label: country.name,
  //     }));
  //     setCountries(countryOptions);
  //   });
  // }, []);
  const { error, isLoading, mutate } = useCreateCommunities();
  const { categories } = useCategory();
  const { community } = useCommunity(address);
  const NewCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    walletAddress: Yup.string().nullable().optional().required('WalletAddress is required'),
    country: Yup.string().optional(),
    latitude: Yup.number().optional(),
    longitude: Yup.number().optional(),
    undRaisedUsd: Yup.number().optional(),
    fundRaisedLocal: Yup.string().optional(),
    localCurrency: Yup.string().optional(),
    category: Yup.string().optional(),
    description: Yup.string().optional(),
    categoryId: Yup.number().optional()
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentCommunity?.name || '',
      country: currentCommunity?.country || '',
      category: currentCommunity?.category || '',
      latitude: currentCommunity?.latitude,
      longitude: currentCommunity?.longitude,
      undRaisedUsd: currentCommunity?.undRaisedUsd,
      fundRaisedLocal: currentCommunity?.fundRaisedLocal || '',
      localCurrency: currentCommunity?.localCurrency || '',
      description: currentCommunity?.description || '',
      categoryId: currentCommunity?.categoryId || Yup.number
    }),
    [currentCommunity]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewCommunitySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, trigger } = methods;
  useEffect(() => {
    if (community) {
      const defaultValuesKeys = Object.keys(defaultValues) as (keyof FormValues)[];
      const communityKeys = Object.keys(community) as (keyof FormValues)[];

      const keysToSet = defaultValuesKeys.filter((key) => communityKeys.includes(key));

      keysToSet.forEach((key) => {
        const value = community[key];
        const formKey = key as keyof FormValues;
        setValue(formKey, value as string);
      });
    }
  }, [defaultValues, community, setValue]);

  useEffect(() => {
    if (community) {
      setValue('category', community?.category?.name);
    }
  }, [defaultValues, community, setValue]);

  const onSubmit = useCallback(
    (data: ICommunityTableFilterValue) => console.log(data),

    // mutate(data)
    []
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating Community</AlertTitle>
          {error?.message}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Stack spacing={5}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
              >
                <RHFTextField name="name" label="Name" />

                <RHFSelect name="category" label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFTextField name="country" label="Country" />

                <RHFTextField name="latitude" label="Latitude" InputLabelProps={{ shrink: true }} />
                <RHFTextField
                  name="longitude"
                  label="Longitude"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField name="description" label="Description" />
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                  Update Community
                </LoadingButton>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
export default CommunityEditForm;
