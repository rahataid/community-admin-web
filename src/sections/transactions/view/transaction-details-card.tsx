import { useCallback } from 'react';
import { ITransactionDetails } from 'src/types/transactions';
// mui
import { Grid, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
// hooks
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

type Props = {
  data: ITransactionDetails;
};

type Copy = {
  txHash?: string;
  from?: string;
  to?: string;
};

const gridRow = {
  padding: 2,
  height: 45,
};

const copyBtn = {
  padding: '0 0 0 6px',
};

function TransactionDetailsCard({ data }: Props) {
  const { txHash, txStatus, timestamp, mode, from, to } = data;
  const { enqueueSnackbar } = useSnackbar();
  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(
    ({ txHash: copyHash, from: copyFrom, to: copyTo }: Copy) => {
      if (copyHash || copyFrom || copyTo) {
        if (copyHash) copy(copyHash);
        else if (copyFrom) copy(copyFrom);
        else if (copyTo) copy(copyTo);
        enqueueSnackbar('Copied!');
      }
    },
    [copy, enqueueSnackbar]
  );

  return (
    <Card sx={{ p: 3, mb: 2 }}>
      <Stack sx={gridRow} spacing={12}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Typography variant="subtitle2">Transaction Hash:</Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle2">
              {txHash || '-'}
              <Tooltip title="Copy Hash" placement="top" arrow>
                <IconButton sx={copyBtn} color="success" onClick={() => handleCopy({ txHash })}>
                  <Iconify icon="ph:copy" />
                </IconButton>
              </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={gridRow} spacing={12}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Typography variant="subtitle2">Status:</Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle2">
              <Label
                variant="soft"
                color={
                  (txStatus === 'SUCCESS' && 'success') ||
                  (txStatus === 'PENDING' && 'warning') ||
                  (txStatus === 'NEW' && 'primary') ||
                  (txStatus === 'FAIL' && 'error') ||
                  (txStatus === 'ERROR' && 'error') ||
                  'default'
                }
              >
                {txStatus || '-'}
              </Label>
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={gridRow} spacing={12}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Typography variant="subtitle2">Timestamp:</Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle2">{timestamp || '-'}</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={gridRow} spacing={12}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Typography variant="subtitle2">Transaction Mode:</Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle2">{mode || '-'}</Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={gridRow} spacing={12}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Typography variant="subtitle2">From:</Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle2">
              {from || '-'}
              <Tooltip title="Copy From Address" placement="top" arrow>
                <IconButton sx={copyBtn} color="success" onClick={() => handleCopy({ from })}>
                  <Iconify icon="ph:copy" />
                </IconButton>
              </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </Stack>
      <Stack sx={gridRow} spacing={12}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <Typography variant="subtitle2">To:</Typography>
          </Grid>
          <Grid item md={8}>
            <Typography variant="subtitle2">
              {to || '-'}
              <Tooltip title="Copy To Address" placement="top" arrow>
                <IconButton sx={copyBtn} color="success" onClick={() => handleCopy({ to })}>
                  <Iconify icon="ph:copy" />
                </IconButton>
              </Tooltip>
            </Typography>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
}

export default TransactionDetailsCard;
