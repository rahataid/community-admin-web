'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
// routes
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// auth
// components
import Iconify from '@components/iconify/iconify';
import { useWeb3React } from '@web3-react/core';
import MetaMaskCard from '@web3/components/connectorCards/MetaMaskCard';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import useAppStore from 'src/store/app';
import useAuthStore from 'src/store/auths';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const router = useRouter();
  const { account } = useWeb3React();
  const { register } = useAuthStore((state) => ({
    register: state.register,
  }));
  const networkSettings = useAppStore((state) => state.blockchain);

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Name required'),
    email: Yup.string().optional().email('Email must be a valid email address'),
    walletAddress: Yup.string().required('Wallet Address is required'),
  });

  const defaultValues = {
    name: '',
    email: '',
    walletAddress: account ?? '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await register?.(data.name, data.walletAddress, data.email);

      router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      // reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{ color: 'text.secondary', mt: 2.5, typography: 'caption', textAlign: 'center' }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="email" label="Email address" />
        </Stack>

        <RHFTextField
          name="walletAddress"
          label="Wallet Address"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <MetaMaskCard
                  onClick={async ({ connector }) => {
                    await connector.activate(networkSettings);
                    setValue('walletAddress', account || '');
                  }}
                  component={IconButton}
                  props={{
                    edge: 'end',
                  }}
                >
                  <Iconify icon="solar:wallet-outline" />
                </MetaMaskCard>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Create account
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {renderTerms}
    </>
  );
}
