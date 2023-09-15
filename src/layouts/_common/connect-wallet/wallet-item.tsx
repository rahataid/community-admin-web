// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import type { Web3ReactHooks } from '@web3-react/core';
import { Status } from '@web3/components/Status';
import Iconify from 'src/components/iconify/iconify';
import { truncateEthAddress } from 'src/utils/strings';

import { MetaMask } from '@web3-react/metamask';
import useAppStore from 'src/store/app';
import useAuthStore from 'src/store/auths';

// const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

type WalletItemProps = {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  accounts?: string[];
  title: string;
  description: string;
  walletAvatar: string;
};

export default function WalletItem({
  title,
  walletAvatar,
  description,
  isActivating,
  isActive,
  connector,
  setError,
  accounts,
  error,
  activeChainId,
}: WalletItemProps) {
  const authStore = useAuthStore();
  const networkSettings = useAppStore((state) => state.blockchain);

  const renderAvatar = (
    <ListItemAvatar>
      {walletAvatar && (
        <Iconify icon={walletAvatar} sx={{ bgcolor: 'background.neutral', fontSize: 24 }} />
      )}
    </ListItemAvatar>
  );

  const renderText = (
    <ListItemText
      disableTypography
      primary={reader(title)}
      secondary={
        <Stack
          direction="row"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
          divider={
            <Box
              sx={{ width: 2, height: 2, bgcolor: 'currentColor', mx: 0.5, borderRadius: '50%' }}
            />
          }
        >
          {isActive && <Status isActivating={isActivating} isActive={isActive} error={error} />}
          {isActive ? truncateEthAddress(accounts?.[0] as string, 8) : description}
        </Stack>
      }
    />
  );

  const disconnectWallet = () => {
    if (connector?.deactivate) {
      connector.deactivate();
    } else {
      connector.resetState();
    }
    authStore.disconnectWallet();
  };

  const walletAction = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      {isActive ? (
        <Button size="small" variant="contained" onClick={disconnectWallet}>
          Disconnect
        </Button>
      ) : (
        <Button
          size="small"
          variant="contained"
          onClick={async () => {
            await connector.activate(networkSettings);
          }}
        >
          Connect
        </Button>
      )}
    </Stack>
  );

  return (
    <>
      <ListItemButton
        disableRipple
        sx={{
          p: 2.5,
          alignItems: 'flex-start',
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {renderAvatar}
        <Stack sx={{ flexGrow: 1 }}>{renderText}</Stack>
        {walletAction}
      </ListItemButton>
      {/* TODO: for testing only */}
      {/* <ConnectWithSelect
        connector={connector}
        activeChainId={activeChainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

function reader(data: string) {
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: data }}
      sx={{
        mb: 0.5,
        '& p': { typography: 'body2', m: 0 },
        '& a': { color: 'inherit', textDecoration: 'none' },
        '& strong': { typography: 'subtitle2' },
      }}
    />
  );
}
