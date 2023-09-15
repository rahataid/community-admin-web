// @mui
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
// components
import Iconify from 'src/components/iconify';
//
import Label from '@components/label/label';
import { IUserItem } from 'src/types/administration';

// ----------------------------------------------------------------------

type Props = {
  row: IUserItem;
  onViewRow: VoidFunction;
};

export default function UsersTableRow({ row, onViewRow }: Props) {
  const { name, roles, walletAddress, isApproved, status } = row;

  const quickEdit = useBoolean();

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {' '}
        <Label variant="soft">{walletAddress}</Label>
      </TableCell>

      <TableCell>
        <Label variant="soft">{roles}</Label>
      </TableCell>
      <TableCell>
        <Label variant="soft" color={isApproved ? 'primary' : 'warning'}>
          {status}
        </Label>
      </TableCell>

      <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Details" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onViewRow()}>
            <Iconify color="#118D57" icon="iconamoon:eye-light" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
