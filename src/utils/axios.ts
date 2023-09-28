import axios from 'axios';
// config
import { HOST_API } from '@config';
import { getToken } from './storage-available';

// ----------------------------------------------------------------------

const token = getToken();

export const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log('error', error);
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

// ----------------------------------------------------------------------

export const endpoints = {
  appSettings: {
    blockchain: '/app/blockchain',
    contracts: '/app/contracts',
  },
  auth: {
    loginWallet: '/auth/login-wallet',
    login: '/auth/login',
    register: '/auth/register',
    sendOtp: '/auth/send-otp',
    create: '/users',
  },
  beneficiaries: {
    list: '/beneficiaries',
    create: '/beneficiaries',
    update: (uuid: string) => `/beneficiaries/${uuid}`,
    details: (address: string) => `/beneficiaries/${address}`,
    assignProject: (address: string) => `/beneficiaries/${address}/projects`,
    disable: (walletAddress: string) => `/beneficiaries/${walletAddress}/disable`,
    stats: '/beneficiaries/stats',
    geoLoc: '/beneficiaries/geo',
  },
  projects: {
    list: '/projects',
    create: '/projects',
    update: (address: string) => `/projects/${address}`,
    updateCampaign: (address: string) => `/projects/${address}/campaigns`,
    removeCampaignFromProject: (address: string) => `/projects/remove/${address}/campaigns`,
    details: (contractAddress: string) => `/projects/${contractAddress}`,

    beneficiaries: {
      list: (address: string) => `/projects/${address}/beneficiaries`,
    },
  },

  campaigns: {
    list: '/campaigns',
  },
  vendors: {
    list: '/vendors',
    details: (walletAddress: string) => `/vendors/${walletAddress}`,
  },
  transactions: {
    list: '/transactions',
    details: (txHash: string) => `/transactions/${txHash}`,
  },
  communitiy: {
    list: '/communities',
    details: (address: string) => `/communities/${address}`,
    create: '/communities',
    updateAssets: (id: string) => `communities/${id}/asset`,
    uploadAssets: (id: string) => `/communities/${id}/upload-asset`,
  },
  category: {
    create: '/categories',
    list: '/categories',
  },
  reports: {
    dashboard: {
      count: '/reports/dashboard/summary',
    },
    byContractAddress: (address: string) => `/reports/project/${address}`,
  },
};
