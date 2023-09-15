import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { useBoolean } from '@hooks/use-boolean';
import { Container, Grid, Stack } from '@mui/material';
import { paths } from '@routes/paths';
import MapView from '@sections/map-view';
import useProjectContract from '@services/contracts/useProject';
import { useCallback, useEffect } from 'react';
import { useVendor } from 'src/api/vendors';
import { useParams } from 'src/routes/hook';
import useVendorStore from 'src/store/vendors';
import BasicInfoCard from './basic-info-card';
import VendorsCards from './transaction-info-card';
import TransactionTable from './transaction-list-card';

const VendorView = () => {
  const settings = useSettingsContext();
  const { address } = useParams();
  const { vendor } = useVendor(address);
  const assignTokenDialog = useBoolean();
  const { getVendorChainData, activateVendor, sendTokensToVendor } = useProjectContract();

  const { chainData, setChainData } = useVendorStore((state) => ({
    chainData: state.chainData,
    setChainData: state.setChainData,
  }));

  console.log('chainData', chainData);

  const handleVendorChainData = useCallback(() => {
    if (!vendor.address) return;
    if (chainData.isVendor !== null) return;
    getVendorChainData(vendor?.walletAddress).then((data) => {
      setChainData(data);
    });
  }, [chainData.isVendor, getVendorChainData, setChainData, vendor.address, vendor?.walletAddress]);

  useEffect(() => {
    handleVendorChainData();
  }, [handleVendorChainData]);

  const handleActivateVendor = async (walletAddress: string) => {
    console.log('activate', walletAddress);
    const activated = await activateVendor(walletAddress);
    console.log('actiavat', activated);
  };

  const handleTokenSend = (walletAddress: string, tokenAmount: string) => {
    console.log(walletAddress, tokenAmount);
    sendTokensToVendor(walletAddress, tokenAmount);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Vendors: Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Details' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack direction="column" spacing={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <VendorsCards
              balance={chainData.balance}
              disbursed={chainData.disbursed}
              pending={chainData.pending}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <BasicInfoCard
              data={vendor}
              isVendor={chainData.isVendor}
              assignTokenModal={assignTokenDialog}
              onActivateVendor={handleActivateVendor}
              onSendToken={handleTokenSend}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TransactionTable />
          </Grid>
          <Grid item xs={12} md={6}>
            <MapView />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default VendorView;
