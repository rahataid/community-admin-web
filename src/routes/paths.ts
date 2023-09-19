// utils
import { paramCase } from 'src/utils/change-case';

// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  BENEFICIARIES: '/beneficiaries',
  PROJECTS: '/projects',
  PHOTO_GALLERY: '/photo-gallery',
  VENDORS: '/vendors',
  CAMPAIGNS: '/campaigns',
  COMMUNITIES: '/communities',
  CATEGORY:'/category'
};

// ----------------------------------------------------------------------

export const paths = {
  page403: '/403',
  page404: '/404',
  page500: '/500',

  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,

    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      projects: {
        list: `${ROOTS.PROJECTS}`,
        add: `${ROOTS.PROJECTS}/add`,
        details: (contractAddress: string) => `${ROOTS.PROJECTS}/${contractAddress}`,
        edit: (contractAddress: string) => `${ROOTS.PROJECTS}/${contractAddress}/edit`,
        beneficiaries: (contractAddress: string) =>
          `${ROOTS.PROJECTS}/${contractAddress}/beneficiaries`,
        vendors: (contractAddress: string) => `${ROOTS.PROJECTS}/${contractAddress}/vendors`,
        campaigns: (contractAddress: string) => `${ROOTS.PROJECTS}/${contractAddress}/campaigns`,
        campaignsadd: (contractAddress: string) =>
          `${ROOTS.PROJECTS}/${contractAddress}/campaigns/add`,
      },
      photoGallery: `${ROOTS.PHOTO_GALLERY}`,
      vendors: {
        list: `${ROOTS.VENDORS}`,
        details: (address: string) => `${ROOTS.VENDORS}/${address}`,
        edit: (address: string) => `${ROOTS.VENDORS}/${paramCase(address)}/edit`,
      },

      transactions: {
        list: `${ROOTS.TRANSACTIONS}`,
        details: (txHash: string) => `${ROOTS.TRANSACTIONS}/${paramCase(txHash)}`,
      },
      beneficiaries: {
        list: `${ROOTS.BENEFICIARIES}`,
        details: (address: string) => `${ROOTS.BENEFICIARIES}/${paramCase(address)}`,
        edit: (address: string) => `${ROOTS.BENEFICIARIES}/${paramCase(address)}/edit`,
        add: `${ROOTS.BENEFICIARIES}/add`,
      },
      campaigns: {
        list: `${ROOTS.CAMPAIGNS}`,
        add: `${ROOTS.CAMPAIGNS}/add`,
        edit: (id: number) => `${ROOTS.CAMPAIGNS}/${id}/edit`,
        details: (id: number) => `${ROOTS.CAMPAIGNS}/${id}`,
      },
    community: {
        list: `${ROOTS.COMMUNITIES}`,
        add: `${ROOTS.COMMUNITIES}/add`,
        details: (walletAddress: string) => `${ROOTS.COMMUNITIES}/${walletAddress}`,
      },
      category: {
        list: `${ROOTS.CATEGORY}`,
        add:`${ROOTS.CATEGORY}/add`,
      }
  },
},
};
