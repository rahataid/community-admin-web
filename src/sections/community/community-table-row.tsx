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
import { ICommunityItem } from 'src/types/community';

// ----------------------------------------------------------------------

type Props = {
  row: ICommunityItem;
  onEdit: VoidFunction;
};

export default function CommunityTableRow({ row,  onEdit}: Props) {
  const { name, address, category, country } = row;

  const quickEdit = useBoolean();

  return (
    <TableRow hover>
      <TableCell>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
      <ListItemText primary={address} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
      <ListItemText primary={category?.name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
      <ListItemText primary={country} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell sx={{ alignItems: 'center' }}>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onEdit()}>
            <Iconify color="#118D57" icon="iconamoon:edit-light" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
