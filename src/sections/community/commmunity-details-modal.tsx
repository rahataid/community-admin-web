import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useRouter } from 'src/routes/hook';
import { ICommunityItem } from 'src/types/community';

type Props = {
  open: boolean;
  onClose: () => void;
  community: ICommunityItem;
};

const CommunityDetails = ({ open, onClose, community}: Props) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  console.log(community, 'community');

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{community?.name}</DialogTitle>

      <DialogContent sx={{ color: 'text.secondary' }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">Address: {community?.address}</Typography>
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

export default CommunityDetails;
