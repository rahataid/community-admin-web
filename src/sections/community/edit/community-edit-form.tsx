// import FormProvider from "@components/hook-form/form-provider";
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Alert, AlertTitle, Grid } from "@mui/material";
// import { Stack } from "@mui/system";
// import { useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { ICommunityTableFilterValue } from "src/types/community";
// import * as Yup from 'yup';

'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// utils
// routes
import { useParams } from 'src/routes/hook';
// types
// assets
// components
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Card, MenuItem } from '@mui/material';
import { useCategory } from 'src/api/category';
import { useEditCommunity } from 'src/api/community';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { ICommunityTableFilterValue } from 'src/types/community';

interface FormValues extends ICommunityTableFilterValue {}
type Props = {
  community:any,
};

const CommunityEditForm = ({community}:Props) => {
  const { address } = useParams();

  const { error, isLoading, mutate } = useEditCommunity(address);
  const { categories } = useCategory();

  // const { community } = useCommunity(address);
  const NewCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    country: Yup.string(),
    latitude: Yup.number(),
    longitude: Yup.number(),
    fundRaisedUsd: Yup.number(),
    fundRaisedLocal: Yup.string(),
    localCurrency: Yup.string(),
    category: Yup.string(),
    description: Yup.string(),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: '',
      country: '',
      categoryId: '',
      latitude: 0,
      longitude: 0,
      fundRaisedUsd: 0,
      fundRaisedLocal: '',
      localCurrency: '',
      description: '',
    }),
    []
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
      setValue('categoryId', community?.category?.id);
    }
  }, [defaultValues, community, setValue]);

  // const onSubmit = useCallback(
  //   (data: ICommunityTableFilterValue) => console.log(data),
  //   [mutate]
  // );
  const onSubmit = useCallback(
    (data) => {
      mutate(data);
    },
    [mutate]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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

                <RHFSelect name="categoryId" label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </RHFSelect>
                <RHFTextField name="fundRaisedLocal" label="FundRaisedLocal"/>
                <RHFTextField name="fundRaisedUsd" label="FundRaisedUsd"/>
                <RHFTextField name="localCurrency" label="Currency"/>
                <RHFTextField name="country" label="Country" />

                <RHFTextField name="latitude" label="Latitude" InputLabelProps={{ shrink: true }} />
                <RHFTextField
                  name="longitude"
                  label="Longitude"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField name="description" label="Description"  />
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
