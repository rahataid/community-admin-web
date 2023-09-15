'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { SplashScreen } from '@components/loading-screen';
import { useSettingsContext } from '@components/settings';
import { Card, CardContent, Container, Stack } from '@mui/material';
import { useFlickr } from 'src/api/flickr';
import { paths } from 'src/routes/paths';
import CarouselThumbnail from './carousel-thumbnail';

const GalleryView = () => {
  const settings = useSettingsContext();

  const { flickr, isLoading } = useFlickr();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Photo Gallery"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Photos' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack spacing={3}>
        <Card>
          <CardContent>
            {isLoading ? <SplashScreen /> : <CarouselThumbnail data={flickr} />}
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
};

export default GalleryView;
