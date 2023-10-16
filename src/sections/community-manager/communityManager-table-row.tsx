// @mui
import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// types
// components
import { ICommunityManagerItem } from 'src/types/community';
//

// ----------------------------------------------------------------------

type Props = {
  row: ICommunityManagerItem;
};

export default function CommunityManagerTableRow({ row }: Props) {
  const { name, email, phone } = row;

  const quickEdit = useBoolean();

  return (
    <TableRow hover>
      <TableCell>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={email} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        <ListItemText primary={phone} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      {/* <TableCell sx={{ alignItems: 'center' }}>
        <Tooltip title="Edit" placement="top" arrow>
          <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={() => onEdit()}>
            <Iconify color="#118D57" icon="iconamoon:edit-light" />
          </IconButton>
        </Tooltip>
      </TableCell> */}
    </TableRow>
  );
}
