'use client';

import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';

const DashboardView = () => {
  const settings = useSettingsContext();
  return <Container maxWidth={settings.themeStretch ? false : 'xl'}>Dashboard</Container>;
};

export default DashboardView;
