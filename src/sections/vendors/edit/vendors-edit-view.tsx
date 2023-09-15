'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import VendorsEditForm from './vendors-new-edit-form';

const VendorsEditView = () => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Vendors: Update"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Vendors', href: paths.dashboard.general.vendors.list },
          { name: 'Update' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <VendorsEditForm />
    </Container>
  );
};

export default VendorsEditView;
