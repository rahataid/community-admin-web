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
import { ICategoryItem } from 'src/types/community';

// ----------------------------------------------------------------------

type Props = {
  row: ICategoryItem;
  onEdit: VoidFunction;
};

export default function CategoryTableRow({ row, onEdit }: Props) {
  const { name } = row;

  const quickEdit = useBoolean();

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
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
