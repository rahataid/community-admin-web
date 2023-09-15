import ListItemText from '@mui/material/ListItemText';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { ITransactionDetailsTableItem } from 'src/types/transactions';

type Props = {
  selected: boolean;
  row: ITransactionDetailsTableItem;
};

export default function TransactionDetailsTableRow({ row, selected }: Props) {
  const { name, amount, to, from } = row;

  return (
    <TableRow hover selected={selected}>
      <TableCell>
        <ListItemText primary={name} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={amount} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell>
        <ListItemText primary={from} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>

      <TableCell sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <ListItemText primary={to} primaryTypographyProps={{ typography: 'body2' }} />
      </TableCell>
    </TableRow>
  );
}
