import Scrollbar from '@components/scrollbar';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface IJSONTable {
  json: Record<string, any> | null;
}

const JsonToTable = ({ json }: IJSONTable) => {
  const renderTableCell = (value: any) => {
    if (typeof value === 'object' && value !== null) {
      return <TableCell key={JSON.stringify(value)}>{renderTable(value)}</TableCell>;
    }
    return <TableCell key={value}>{value}</TableCell>;
  };

  const renderTable = (obj: Record<string, any>) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow hover>
            {Object.keys(obj).map((key) => (
              <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>{Object.values(obj).map(renderTableCell)}</TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (!json) {
    return null;
  }

  return (
    <TableContainer component={Paper}>
      <Scrollbar>
        <Table size="small">
          <TableHead>
            <TableRow>
              {Object.keys(json).map((key) => (
                <TableCell key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>{Object.values(json).map(renderTableCell)}</TableRow>
          </TableBody>
        </Table>
      </Scrollbar>
    </TableContainer>
  );
};

export default JsonToTable;
