import { yupResolver } from '@hookform/resolvers/yup';
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
import { Alert, AlertTitle } from '@mui/material';
import { paths } from '@routes/paths';
import CommunityService from '@services/community';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import FormProvider, { RHFMultiSelect, RHFTextField } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import {
  IApiResponseError,
  ICommunityDetails,
  ICommunityTableFilterValue,
} from 'src/types/community';

type Props = {
  currentCommunity?: ICommunityTableFilterValue;
};

interface FormValues extends ICommunityTableFilterValue {}

const CommunityAddForm: React.FC = ({ currentCommunity }: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [countries, setCountries] = useState<any>([]);
  const [selectedValue, setSelectedValue] = useState<any>([]);
  const [coordinates, setCoordinates] = useState({
    latitude:'',
    longitude:''
  });


  useEffect(() => {
    // Fetch countries from the REST Countries API
    axios.get('https://restcountries.com/v2/all').then((response) => {
      const countryOptions = response.data.map((country: any) => ({
        value: country.alpha2Code,
        label: country.name,
      }));
      setCountries(countryOptions);
    });
  }, []);
  

  useEffect(() => { 
     if(!selectedValue){
      setCoordinates({})
      return
     }
     axios.get(`https://restcountries.com/v2/alpha/${selectedValue}`).then((response)=>{
     const newCoordinates= {
       latitude:response?.data?.latlng[0],
       longitude:response?.data?.latlng[1]
      }
      
    setCoordinates(newCoordinates);
     })
  }, [selectedValue]);

  const handleChange = (event:any) => {
    setSelectedValue(event?.target?.value);
  };
  
 console.log(coordinates?.latitude)
  const { error, isLoading, mutate } = useMutation<
    ICommunityDetails,
    IApiResponseError,
    ICommunityTableFilterValue
  >({
    mutationFn: async (createData: ICommunityTableFilterValue) => {
      const response = await CommunityService.create(createData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error creating Community', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Community created successfully', { variant: 'success' });
      reset();
      push(paths.dashboard.general.community.list);
    },
  });

  const NewCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().nullable().optional().email('Email is invalid'),
    country: Yup.string().optional(),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentCommunity?.name || '',
      address: currentCommunity?.address || '',
      country: currentCommunity?.country || undefined,
      category: currentCommunity?.category || '',
    }),
    [currentCommunity]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewCommunitySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, trigger } = methods;

  const onSubmit = useCallback((data: ICommunityTableFilterValue) => mutate(data), [mutate]);

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
              <RHFTextField name="name" label="Name"  />

              <RHFTextField name="address" label="Address" />

              <RHFTextField name="categoryId" label="Category" />
              
              
              <RHFMultiSelect //Single Select
                name="Country"
                options={countries}
                placeholder='Select country'
                value={selectedValue} 
                onChange={handleChange}
                chip={false}
                 checkbox={false}
              />
           <RHFTextField name='latitude' label='latitude' value={coordinates?.latitude} />
           <RHFTextField name='longitude' label='longitude' value={coordinates?.longitude} />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Create Community
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(CommunityAddForm);
