import Iconify from '@components/iconify/iconify';
import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
import useAuthStore from 'src/store/auths';
// locales
// components

// ----------------------------------------------------------------------

const icon = (name: string) => <Iconify icon={name} />;

const ICONS = {
  dashboard: icon('material-symbols:dashboard-outline-rounded'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const roles = useAuthStore((state) => state.role);
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'overview',
        show: true,
        items: [
          {
            title: 'dashboard',
            path: paths.dashboard.root,
            icon: ICONS.dashboard,
            show: true,
          },
        ],
      },

      // DEMO MENU STATES
    ],
    []
  );

  return data;
}
