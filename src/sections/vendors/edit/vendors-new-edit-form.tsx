import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle, FormControlLabel, FormGroup, Switch } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { paths } from '@routes/paths';
import BeneficiaryService from '@services/beneficiaries';
import { useMutation } from '@tanstack/react-query';
import { generateWalletAddress } from '@web3/utils';
import { parseISO } from 'date-fns';
import { useParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useBeneficiary } from 'src/api/beneficiaries';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useRouter } from 'src/routes/hook';
import {
  GENDER,
  IApiResponseError,
  IBeneficiariesCreateItem,
  IBeneficiaryDetails,
} from 'src/types/beneficiaries';
import * as Yup from 'yup';

interface FormValues extends IBeneficiariesCreateItem {}

const BeneficiariesForm: React.FC = () => {
  const params = useParams();

  const { beneficiary } = useBeneficiary(params.uuid);

  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { error, isLoading, mutate } = useMutation<
    IBeneficiaryDetails,
    IApiResponseError,
    IBeneficiariesCreateItem
  >({
    mutationFn: async (updateData: IBeneficiariesCreateItem) => {
      const response = await BeneficiaryService.update(beneficiary.uuid, updateData);
      return response.data;
    },
    onError: () => {
      enqueueSnackbar('Error updating beneficiary', { variant: 'error' });
    },
    onSuccess: (data) => {
      enqueueSnackbar('Beneficiary updated successfully', { variant: 'success' });
      reset();

      push(`${paths.dashboard.general.beneficiaries.list}/${data?.uuid}`);
    },
  });

  const NewBeneficiarySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    gender: Yup.mixed<GENDER>().nullable().optional(),
    phoneOwnership: Yup.string().nullable().optional(),
    bankStatus: Yup.string().nullable().optional(),
    internetAccess: Yup.string().nullable().optional(),
    dob: Yup.date().nullable().optional(),
    walletAddress: Yup.string().nullable().required('Wallet address is required'),
    longitude: Yup.number().nullable().optional(),
    latitude: Yup.number().nullable().optional(),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: '',
      gender: null,
      phoneOwnership: null,
      bankStatus: null,
      internetAccess: null,
      dob: null,
      walletAddress: '',
      longitude: null,
      latitude: null,
    }),
    []
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(NewBeneficiarySchema),
    defaultValues,
  });

  const { reset, handleSubmit, setValue, control, trigger } = methods;

  useEffect(() => {
    if (beneficiary) {
      const defaultValuesKeys = Object.keys(defaultValues) as (keyof FormValues)[];
      const beneficiaryKeys = Object.keys(beneficiary) as (keyof FormValues)[];

      const keysToSet = defaultValuesKeys.filter((key) => beneficiaryKeys.includes(key));

      keysToSet.forEach((key) => {
        const value = beneficiary[key];
        const formKey = key as keyof FormValues;

        if (formKey === 'dob') {
          const dateObject: any = parseISO(value as string);
          setValue(formKey, dateObject);
        } else {
          setValue(formKey, value as string);
        }
      });
    }
  }, [defaultValues, beneficiary, setValue]);

  const handleGenerateWalletAddress = useCallback(() => {
    const { address } = generateWalletAddress();
    setValue('walletAddress', address);
    trigger('walletAddress');
  }, [setValue, trigger]);

  const onSubmit = useCallback((data: IBeneficiariesCreateItem) => mutate(data), [mutate]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error">
          <AlertTitle>Error Updating Beneficiary</AlertTitle>
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
              <RHFTextField InputLabelProps={{ shrink: true }} name="name" label="Name" />
              <RHFTextField InputLabelProps={{ shrink: true }} name="address" label="Address" />
              <RHFTextField InputLabelProps={{ shrink: true }} name="number" label="Phone Number" />
              <FormGroup>
                <FormControlLabel
                  control={<Switch name="isActive" color="success" />}
                  label="Active"
                />
              </FormGroup>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" color="success" loading={isLoading}>
                Update Vendor
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default memo(BeneficiariesForm);
