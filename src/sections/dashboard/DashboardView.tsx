'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import SummaryCard from '@components/summary-card';
import { Container, Grid } from '@mui/material';
import { paths } from '@routes/paths';
import MapView from '@sections/map-view';
import { useCategory } from 'src/api/category';
import { useCommunities, useGeoLocation } from 'src/api/community';

const DashboardView = () => {
  const settings = useSettingsContext();
  const { communities, meta, totalBeneficiariesSum } = useCommunities();
  const { categories } = useCategory();
  const { geoData } = useGeoLocation();

  const uniqueNames = categories.reduce((acc, item) => {
    if (!acc.includes(item.name)) {
      acc.push(item.name);
    }
    return acc;
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Dashboard"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Grid container spacing={2} mx={0.5}>
        <Grid container xs={12} spacing={8} gap={4}>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="primary"
              icon="material-symbols:groups-rounded"
              title="Communities"
              total={meta?.total}
              subtitle="Total"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="primary"
              icon="material-symbols:person-4"
              title="Beneficiaries"
              total={totalBeneficiariesSum}
              subtitle="Total"
            />
          </Grid>
        </Grid>
        <Grid container xs={12} spacing={3} mt={1}>
          {/* <Grid item xs={12} md={6}>
            <Bargraph
              title="Beneficiaries by distribution point"
              subheader="(+43%) than last year"
              chart={{
                categories: uniqueNames,
                series: [
                  {
                    year: '2019',
                    data: [
                      {
                        name: 'Asia',
                        data: [10, 41, 35],
                      },
                      {
                        name: 'America',
                        data: [10, 34, 13, 56],
                      },
                    ],
                  },
                  {
                    year: '2020',
                    data: [
                      {
                        name: 'Asia',
                        data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                      },
                      {
                        name: 'America',
                        data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid> */}

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
      </Grid>
    </Container>
  );
};

export default DashboardView;
