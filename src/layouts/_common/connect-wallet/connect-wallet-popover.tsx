'use client';

// @mui
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// _mock
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
//
import { Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import MetaMaskCard from '@web3/components/connectorCards/MetaMaskCard';
import { getName } from '@web3/utils';
import WalletItem from './wallet-item';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function WalletConnectPopover() {
  const drawer = useBoolean();
  const { connector, isActive } = useWeb3React();

  const smUp = useResponsive('up', 'sm');

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Connect to a wallet
      </Typography>

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        <MetaMaskCard
          component={WalletItem}
          title="Metamask"
          description="MetaMask is the leading self-custodial wallet. The safe and simple way to access blockchain applications and web3."
          walletAvatar="logos:metamask-icon"
        />
      </List>
    </Scrollbar>
  );

  const connectButton = (
    <Button variant="outlined" onClick={drawer.onTrue}>
      {isActive ? `Connected to ${getName(connector)}` : ' Connect Wallet'}
    </Button>
  );

  return (
    <>
      {connectButton}
      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        {renderList}
      </Drawer>
    </>
  );
}
