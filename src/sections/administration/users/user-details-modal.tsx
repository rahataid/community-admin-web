import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { paths } from '@routes/paths';
import AdministrationService from '@services/administration';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useRouter } from 'src/routes/hook';
import { IUserItem } from 'src/types/administration';

type Props = {
  open: boolean;
  onClose: () => void;
  user: IUserItem;
  onActivate: (walletAddress: string, isActive: boolean) => void;
  onChangeRole: (walletAddress: string, role: string) => void;
};

const UserDetails = ({ open, onClose, user, onActivate, onChangeRole }: Props) => {
  const { push } = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [role, setRole] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  console.log(user, 'user');
  useEffect(() => {
    if (user) {
      setRole(user?.roles);
      setIsActive(user?.isApproved);
    }
  }, [user]);

  const disableUser = useMutation({
    mutationFn: async (id: number) => {
      const res = await AdministrationService.disable(id);
      return res.data;
    },
    onError: () => {
      enqueueSnackbar('Error Disabling User ', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('User Disabled Successfully', { variant: 'success' });
      push(paths.dashboard.administration.users.list);
    },
  });

  const handleActivateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsActive(event.target.checked);
    onActivate(user.walletAddress, event.target.checked);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
    onChangeRole(user?.walletAddress, event.target.value);
  };

  const handleDisable = () => {
    disableUser.mutate(user?.id);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user?.name}</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Email: {user?.email}</Typography>
          <Typography variant="subtitle1">Wallet Address: {user?.walletAddress}</Typography>
          <FormGroup>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isActive}
                    onChange={handleActivateChange}
                    name="isActive"
                    color="success"
                  />
                }
                label="Approve"
              />
              <FormControlLabel
                control={<Switch onChange={handleDisable} name="isDisable" color="success" />}
                label="Disable"
              />
            </Stack>
          </FormGroup>
          <FormGroup>
            <Typography variant="subtitle1">Role:</Typography>
            <Stack direction="row" spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'USER'}
                    onChange={handleRoleChange}
                    value="USER"
                    name="user"
                    color="success"
                  />
                }
                label="User"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={role === 'ADMIN'}
                    onChange={handleRoleChange}
                    value="ADMIN"
                    name="manager"
                    color="success"
                  />
                }
                label="Admin"
              />
            </Stack>
          </FormGroup>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button variant="text" color="success" onClick={onClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetails;
