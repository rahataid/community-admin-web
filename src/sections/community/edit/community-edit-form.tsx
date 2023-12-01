// import { yupResolver } from '@hookform/resolvers/yup';
// import { Alert, AlertTitle, Grid } from "@mui/material";
// import { Stack } from "@mui/system";
// import { useMemo } from "react";
// import { useForm } from "react-hook-form";
// import { ICommunityTableFilterValue } from "src/types/community";
// import * as Yup from 'yup';

'use client';

import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
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
import MapView from '@sections/map-view';
import { useCategory } from 'src/api/category';
import { useEditCommunity } from 'src/api/community';
import { useListManager } from 'src/api/manager';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { ICommunityTableFilterValue } from 'src/types/community';

interface FormValues extends ICommunityTableFilterValue {}
type Props = {
  community: any;
};

const CommunityEditForm = ({ community }: Props) => {
  const { address } = useParams();

  const { isLoading, mutate } = useEditCommunity(address);
  const { categories } = useCategory();
  const [latLang, setLatLang] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [updateLatLang, setUpdateLatLang] = useState();
  const { managers } = useListManager();

  // const { community } = useCommunity(address);
  const NewCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    country: Yup.string(),
    latitude: Yup.number().moreThan(-90).lessThan(90),
    longitude: Yup.number().lessThan(90).moreThan(-90),
    fundRaisedUsd: Yup.number(),
    fundRaisedLocal: Yup.string(),
    localCurrency: Yup.string(),
    category: Yup.string(),
    description: Yup.string(),
    district: Yup.string(),
    managers: Yup.array(),
    summary: Yup.array(),
    beneficiaries: Yup.number(),
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
      district: '',
      managers: [],
      summary: [],
      beneficiaries: 0,
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewCommunitySchema),
    defaultValues,
  });

  const { handleSubmit, setValue, getValues, watch } = methods;
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

  const onSubmit = useCallback(
    async (data) => {
      mutate(data);
    },
    [mutate]
  );

  useEffect(() => {
    if (community) {
      setLatLang({
        latitude: getValues('latitude'),
        longitude: getValues('longitude'),
      });
    }
  }, [community, getValues]);

  const getUpdateLatLang = (data: any) => {
    setUpdateLatLang(data);
  };

  useEffect(() => {
    if (updateLatLang) {
      setValue('latitude', updateLatLang.latitude);
      setValue('longitude', updateLatLang.longitude);
    }
  }, [setValue, updateLatLang]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // const trimmedValue = value.trim();
    const namesArray = value
      .split(',')
      .map((name: string) => name.charAt(0).toUpperCase() + name.slice(1));

    setValue('managers', namesArray);
  };

  useEffect(() => {
    if (community) {
      const summary = getValues('summary');
      summary.reduce((acc, item) => {
        acc[item.id] = item;
        return setValue('beneficiaries', item.total_beneficiaries);
      }, {});
    }
  }, [community, getValues, setValue]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Stack spacing={5}>
            <Card sx={{ p: 1 }}>
              <Box
                rowGap={3}
                columnGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                }}
                sx={{ m: 1 }}
              >
                <RHFTextField name="name" label="Name" />

                <RHFSelect name="categoryId" label="Category">
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </RHFSelect>

                <RHFTextField name="district" label="District" />

                <RHFTextField name="localCurrency" label="Currency" />
                <RHFTextField name="fundRaisedLocal" label="FundRaisedLocal" />
                <RHFTextField name="fundRaisedUsd" label="FundRaisedUsd" />
                <RHFTextField name="country" label="Country" />
                {/* <RHFMultiSelect
                  name="managers"
                  label="Managers"
                  options={managers?.map((item: any) => ({
                    value: item.id.toString(),
                    label: item.name,
                  }))}
                  multiple
                  chip
                  checkbox
                /> */}

                <RHFTextField name="managers" label="Managers" onChange={handleChange} />
                <RHFTextField name="beneficiaries" label="Beneficiaries" />
                <RHFTextField
                  name="description"
                  label="Description"
                  multiline
                  sx={{ gridColumn: 'span 3' }}
                  rows={6}
                />
              </Box>
            </Card>
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack spacing={5}>
            <Card sx={{ p: 1 }}>
              <Box
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(2, 1fr)',
                }}
                sx={{ m: 1 }}
              >
                <RHFTextField name="latitude" label="Latitude" InputLabelProps={{ shrink: true }} />
                <RHFTextField
                  name="longitude"
                  label="Longitude"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              {/* @ts-ignore */}

              <MapView geoData={latLang} onDataChange={getUpdateLatLang} lap="communities" />
            </Card>
            <Stack alignItems="flex-end">
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
};
export default CommunityEditForm;
