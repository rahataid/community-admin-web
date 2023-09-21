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
import Iconify from '@components/iconify/iconify';
import { Alert, AlertTitle, Button, MenuItem, Tooltip } from '@mui/material';
import { generateWalletAddress } from '@web3/utils';
import axios from 'axios';
import { useCategory } from 'src/api/category';
import { useCreateCommunities } from 'src/api/community';
import FormProvider, { RHFMultiSelect, RHFSelect, RHFTextField, RHFUpload } from 'src/components/hook-form';
import { useSnackbar } from 'src/components/snackbar';
import {
  ICommunityTableFilterValue
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
  const {error,isLoading,mutate} = useCreateCommunities()
  const {categories}=useCategory()

  console.log(categories)
  const NewCommunitySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    walletAddress: Yup.string().nullable().optional().required('WalletAddress is required'),
    country: Yup.string().optional(),
    latitude:Yup.number().optional(),
    longitude:Yup.number().optional()
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: currentCommunity?.name || '',
      walletAddress: currentCommunity?.walletAddress || '',
      country: currentCommunity?.country || '',
      category: currentCommunity?.category || '',
      latitude:currentCommunity?.latitude,
      longitude:currentCommunity?.longitude,
    }),
    [currentCommunity]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewCommunitySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, trigger } = methods;

  const handleChange = (event:any) => {
    const {value,label} = event.target
    setSelectedValue(value);
    setValue("country",value)
    
  };


  const handleGenerateWalletAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('walletAddress', address);
    trigger('walletAddress');
  }, [setValue, trigger]);

  const onSubmit = useCallback((data: ICommunityTableFilterValue) => 
  console.log(data)
   
  // mutate(data)
  , [mutate]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Creating Community</AlertTitle>
          {error?.message}
        </Alert>
      )}
      <Grid container spacing={3}>
        <Grid xs={12} md={12} >

          <Stack spacing={3}>
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
              <RHFTextField name="name" label="Name"  />

              
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
                sx={{ padding: '0 !important' }}
              />

              {/* <RHFTextField name="category" label="Category" /> */}
              <RHFSelect name="category" label="Category">
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </RHFSelect>
              
              <RHFMultiSelect //Single Select
                name="country"
                options={countries}
                placeholder='Select country'
                value={selectedValue} 
                onChange={handleChange}
                chip={false}
                 checkbox={false}
              />
              
              <RHFTextField name='latitude' label='latitude' />
           <RHFTextField name='longitude' label='longitude' />

            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Create Community
              </LoadingButton>
            </Stack>
          </Card>

          <Card sx = {{p:3}}>
            
          <Box
              rowGap={3}
              columnGap={3}
              display="grid"
            > 
            
             <RHFUpload multiple={true} name='imageUpload'/>
            
             </Box>
             </Card>

          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(CommunityAddForm);
