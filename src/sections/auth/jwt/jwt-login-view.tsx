'use client';

import Iconify from '@components/iconify/iconify';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Divider } from '@mui/material';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { RouterLink } from '@routes/components';
import { paths } from '@routes/paths';
import { setToken, setUser as setUserLocal } from '@utils/storage-available';
import { useWeb3React } from '@web3-react/core';
import MetaMaskCard, {
  MetamaskCardWalletProps,
} from '@web3/components/connectorCards/MetaMaskCard';
import { hooks as metamaskHooks } from '@web3/connectors/metaMask';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin, useRequestOtp } from 'src/api/auths';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useRouter, useSearchParams } from 'src/routes/hook';
import useAppStore from 'src/store/app';
import useAuthStore from 'src/store/auths';
import * as Yup from 'yup';

type LoginFormValues = {
  email: string;
};

type OtpFormValues = {
  otp: string;
};

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email must be a valid email address'),
});

const OtpSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required'),
});

export default function JwtLoginView() {
  const { connector } = useWeb3React();
  const isMetamaskActive = metamaskHooks.useIsActive();
  const account = metamaskHooks.useAccount();
  const login = useLogin();
  const requestOtp = useRequestOtp();

  const { user, error, setUser } = useAuthStore((state) => ({
    loginWallet: state.loginWallet,
    user: state.user,
    error: state.error,
    setUser: state.setUser,
  }));
  const networkSettings = useAppStore((state) => state.blockchain);

  const [userNotRegistered, setUserNotRegistered] = useState(false);
  const [loginEmail, setLoginEmail] = useState<string>('');

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const defaultValues: LoginFormValues = {
    email: '',
  };

  const defaultOtpValues: OtpFormValues = {
    otp: '',
  };

  const methods = useForm<LoginFormValues>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const otpMethods = useForm<OtpFormValues>({
    resolver: yupResolver(OtpSchema),
    defaultValues: defaultOtpValues,
  });

  const {
    reset: resetOtp,
    handleSubmit: handleOtpSubmit,
    formState: { isSubmitting: isOtpSubmitting },
  } = otpMethods;

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    await requestOtp.mutateAsync(data);
    setLoginEmail(data.email);
  });

  useEffect(() => {
    if (requestOtp.isSuccess) {
      reset();
    }
  }, [requestOtp.isSuccess, reset]);

  const onOtpSubmit = handleOtpSubmit(async (data) => {
    login.mutate({ email: loginEmail, otp: data.otp });
  });

  useEffect(() => {
    if (login.isSuccess) {
      resetOtp();
      setLoginEmail('');
      setUser(login.data);
      setUserLocal(login.data);
      console.log('login.data?.refresh_token', login.data?.refresh_token);

      setToken(login.data?.refresh_token);
      router.replace(returnTo || paths.dashboard.root);
    }
  }, [login.data, login.isSuccess, resetOtp, returnTo, router, setUser]);

  const onWalletButtonClick = useCallback(
    async ({ connector: metamaskConnector }: MetamaskCardWalletProps) => {
      if (isMetamaskActive) {
        if (metamaskConnector?.deactivate) {
          metamaskConnector.deactivate();
        } else {
          metamaskConnector.resetState();
        }
        return;
      }
      await metamaskConnector.activate(networkSettings);
    },
    [isMetamaskActive, networkSettings]
  );

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Rahat</Typography>
    </Stack>
  );

  const renderWalletLogin = (
    <Stack spacing={0.5}>
      {!!error && isMetamaskActive && <Alert severity="error">{error.message}</Alert>}

      <MetaMaskCard
        component={LoadingButton}
        title="Metamask"
        description="MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and  web3."
        walletAvatar="logos:metamask-icon"
        onClick={onWalletButtonClick}
        props={{
          fullWidth: true,
          color: 'inherit',
          size: 'large',
          variant: 'outlined',
          sx: {
            mt: 2,
          },
          startIcon: <Iconify icon="logos:metamask-icon" />,
        }}
      >
        {isMetamaskActive ? 'Disconnect Metamask' : 'Login with Metamask'}
      </MetaMaskCard>

      {userNotRegistered && (
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
            Create an account
          </Link>
        </Stack>
      )}
    </Stack>
  );

  const renderEmailForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="email" label="Email address" />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={requestOtp.isLoading}
          disabled={requestOtp.isLoading}
        >
          Send OTP
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  const renderOtpForm = (
    <FormProvider methods={otpMethods} onSubmit={onOtpSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField name="otp" label="OTP" />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={login.isLoading}
          disabled={login.isLoading}
        >
          Login
        </LoadingButton>
        <Button
          variant="text"
          onClick={() => {
            setLoginEmail('');
          }}
        >
          Go Back
        </Button>
      </Stack>
    </FormProvider>
  );

  const dividerView = (
    <Stack mt={2}>
      <Divider>
        <Typography textTransform="uppercase">or</Typography>
      </Divider>
    </Stack>
  );
  return (
    <>
      {renderHead}
      {!loginEmail && renderEmailForm}
      {loginEmail && renderOtpForm}
      {dividerView}
      {renderWalletLogin}
    </>
  );
}
