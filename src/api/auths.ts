import AuthService from '@services/auths';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';

export const useRequestOtp = () => {
  const notify = useSnackbar();
  return useMutation(
    ['login/otp'],
    async ({ email }: { email: string }) => {
      const req = await AuthService.sendOtp(email);
      return req.data;
    },
    {
      onSuccess: (data) => {
        notify.enqueueSnackbar('OTP sent successfully', { variant: 'success' });
      },
      onError: (error) => {
        notify.enqueueSnackbar(error?.response?.data?.message || 'Something went wrong', {
          variant: 'error',
        });
      },
    }
  );
};
export const useLogin = () => {
  const notify = useSnackbar();

  return useMutation(
    ['login/verify'],
    async ({ email, otp }: { email: string; otp: string }) => {
      const req = await AuthService.login({ email, otp });

      return req.data;
    },
    {
      onSuccess: (data) => {
        notify.enqueueSnackbar('Login successful', { variant: 'success' });
        return data;
      },
      onError: (error) => {
        notify.enqueueSnackbar(error?.response?.data?.message || 'Something went wrong', {
          variant: 'error',
        });
        return error;
      },
    }
  );
};

export const useTempLogin = () => {
  const notify = useSnackbar();
  return useMutation(
    ['login/verify/temp'],
    // eslint-disable-next-line consistent-return
    async (data: any) => {
      if (data.password === 'd252508769e2372ee91e0e4e684ca4e8') {
        const value = {
          email: 'admi@rumsan.net',
          name: 'Admin1',
        };
        return value;
      }
      throw new Error('Invalid password');
    },
    {
      onSuccess: (data) => {
        notify.enqueueSnackbar('Login successful', { variant: 'success' });
        return data;
      },
      onError: (error) => {
        notify.enqueueSnackbar('Password Wrong', {
          variant: 'error',
        });
        throw error;
      },
    }
  );
};
