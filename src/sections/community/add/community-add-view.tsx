'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import UserAddForm from './community-new-add-form';

const UserAddView = () => {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Community: Add"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Community', href: paths.dashboard.general.community.list },
          { name: 'Add' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <UserAddForm />
    </Container>
  );
};

export default UserAddView;
