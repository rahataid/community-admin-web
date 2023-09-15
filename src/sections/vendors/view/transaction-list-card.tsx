import { Card, CardContent, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function createData(date: string, txHash: string, Beneficiary: number, Amount: number) {
  return { date, txHash, Beneficiary, Amount };
}

const rows = [
  createData('14th August 2023', '0x020asd2020131232929', 6, 240000),
  createData('14th August 2030', '0x02gtfg0201312320292', 16, 24000000),
  createData('14th August 2040', '0x02as021231313202029', 17, 24110000),
  createData('14th August 2050', '0x02043jkadjh523wq234	', 20, 24004400),
  createData('14th August 2060', '0x02043jkadjh52345234', 23, 24078000),
];

export default function TransactionTable() {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" sx={{ pt: 3, mb: 3 }}>
          Transaction History
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Transaction Hash</TableCell>
                <TableCell align="right">Beneficiary</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.date} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.date}
                  </TableCell>
                  <TableCell align="right">{row.txHash}</TableCell>
                  <TableCell align="right">{row.Beneficiary}</TableCell>
                  <TableCell align="right">{row.Amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}
