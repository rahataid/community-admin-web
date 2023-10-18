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
  community: icon('fluent:people-community-24-filled'),
  category: icon('carbon:category'),
  manager: icon('ion:people-sharp'),
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
          {
            title: 'Community',
            path: paths.dashboard.general.community.list,
            icon: ICONS.community,
            show: true,
          },
          {
            title: 'Category',
            path: paths.dashboard.general.category.list,
            icon: ICONS.category,
            show: true,
          },
          // {
          //   title: 'Managers',
          //   path: paths.dashboard.general.manager.list,
          //   icon: ICONS.manager,
          //   show: true,
          // },
        ],
      },

      // DEMO MENU STATES
    ],
    []
  );

  return data;
}
