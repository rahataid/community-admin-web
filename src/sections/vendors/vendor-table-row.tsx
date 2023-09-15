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
import Label from '@components/label/label';
import { truncateEthAddress } from '@utils/strings';
import Iconify from 'src/components/iconify';
import { IVendorItem } from 'src/types/vendors';

// ----------------------------------------------------------------------

type Props = {
  row: IVendorItem;
  onViewRow: VoidFunction;
  onEditRow: VoidFunction;
};

export default function VendorTableRow({ row, onViewRow, onEditRow }: Props) {
  const { name, isApproved, walletAddress } = row;

  const quickEdit = useBoolean();

  // const popover = usePopover();

  return (
    <TableRow hover>
      {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

      <TableCell>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <Label variant="soft" color={isApproved ? 'success' : 'error'}>
          {isApproved ? 'Approved' : 'Not Approved'}
        </Label>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={truncateEthAddress(walletAddress, 6)}
          primaryTypographyProps={{ typography: 'body2' }}
        />
      </TableCell>

      <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View Details" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onViewRow()}>
            <Iconify color="#118D57" icon="iconamoon:eye-light" />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Details" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onEditRow()}>
            <Iconify color="#118D57" icon="material-symbols:edit-sharp" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
