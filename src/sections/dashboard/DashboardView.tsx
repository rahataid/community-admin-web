'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import SummaryCard from '@components/summary-card';
import { Container, Grid } from '@mui/material';
import { paths } from '@routes/paths';
import MapView from '@sections/map-view';
import { useCategory, useListCommunityByCategory } from 'src/api/category';
import { useCommunities, useGeoLocation } from 'src/api/community';
import Bargraph from './bargraph';
// import Bargraph from './bar-graph';

const DashboardView = () => {
  const settings = useSettingsContext();
  const { communities, meta, totalBeneficiariesSum } = useCommunities();
  const { categories } = useCategory();
  const { listCommunityByCategory } = useListCommunityByCategory();
  const kk = listCommunityByCategory?.map((item) => item._count);
  console.log(kk);
  const { geoData } = useGeoLocation();

  const uniqueNames = listCommunityByCategory?.reduce((acc, item) => {
    console.log(item);
    if (!acc.includes(item.name)) {
      acc.push(item.name);
    }
    return acc;
  }, []);

  const commData = listCommunityByCategory?.reduce((acc, item) => {
    if (!acc.includes(item._count)) {
      console.log(item._count.communities);
      acc.push(item._count.communities);
    }
    return acc;
  }, []);
  console.log(commData);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Dashboard"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={4}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <SummaryCard
                color="primary"
                icon="material-symbols:groups-rounded"
                title="Communities"
                total={meta?.total}
                subtitle="Total"
              />
            </Grid>
            <Grid item xs={12}>
              <SummaryCard
                color="primary"
                icon="material-symbols:person-4"
                title="Beneficiaries"
                total={totalBeneficiariesSum}
                subtitle="Total"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={8}>
          <Bargraph
            chart={{
              categories: uniqueNames,
              series: commData,
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid item xs={12}>
          <MapView
            geoData={geoData?.map((r) => ({
              latitude: r?.longitude,
              longitude: r?.latitude,
              country: r?.country,
            }))}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardView;
