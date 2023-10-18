'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import CommunityManagerAddForm from './community-manger-add-form';

const CommunityAddView = () => {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Manager: Add"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Manager', href: paths.dashboard.general.manager.list },
          { name: 'Add' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <CommunityManagerAddForm />
    </Container>
  );
};

export default CommunityAddView;
