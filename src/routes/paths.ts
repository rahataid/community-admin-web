// utils

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
  CATEGORY: '/categories',
  MANAGER: '/communitymanager',
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

      community: {
        list: `${ROOTS.COMMUNITIES}`,
        add: `${ROOTS.COMMUNITIES}/add`,
        edit: (address: string) => `${ROOTS.COMMUNITIES}/${address}/edit`,
        details: (walletAddress: string) => `${ROOTS.COMMUNITIES}/${walletAddress}`,
      },
      category: {
        list: `${ROOTS.CATEGORY}`,
        add: `${ROOTS.CATEGORY}/add`,
        edit: (id: string) => `${ROOTS.CATEGORY}/${id}/edit`,
      },
      manager: {
        list: `${ROOTS.MANAGER}`,
        add: `${ROOTS.MANAGER}/add`,
      },
    },
  },
};
