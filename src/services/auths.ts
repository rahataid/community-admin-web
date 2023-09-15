import { axiosInstance, endpoints } from '@utils/axios';

const AuthService = {
  loginWallet: (walletAddress: string) =>
    axiosInstance.post(endpoints.auth.loginWallet, { walletAddress }),
  register: (data) => axiosInstance.post(endpoints.auth.register, data),
  login: (data: { email: string; otp: string }) => axiosInstance.post(endpoints.auth.login, data),
  sendOtp: (email: string) =>
    axiosInstance.post(endpoints.auth.sendOtp, {
      email,
    }),
};

export default AuthService;
