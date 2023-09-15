import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useState } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  onOk: (walletAddress: string, token: string) => void;
  walletAddress: string;
};

const SendTokenModal = ({ open, onClose, onOk, walletAddress }: Props) => {
  const [token, setToken] = useState('');
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Assing Token</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>Enter Token To the beneficiary</DialogContent>

      <Stack sx={{ p: 2 }} spacing={5}>
        <TextField
          name="token"
          label="Token"
          color="success"
          value={token}
          onChange={(e) => setToken(e.target?.value)}
        />
      </Stack>
      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton onClick={() => onOk(walletAddress, token)} type="submit" autoFocus>
          Send
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default SendTokenModal;
