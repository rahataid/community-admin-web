import Scrollbar from '@components/scrollbar/scrollbar';
import { Card, Table, TableBody, TableContainer } from '@mui/material';
import { useState } from 'react';
import {
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  emptyRows,
  useTable,
} from 'src/components/table';
import { ITransactionDetailsTableItem, ITransactionDetailsTableList } from 'src/types/transactions';

import TransactionDetailsTableRow from './transaction-details-table-row';

type Props = {
  data: ITransactionDetailsTableList;
};

const TABLE_HEAD = [
  { id: 'name', label: 'name' },
  { id: 'amount', label: 'amount' },
  { id: 'from', label: 'from' },
  { id: 'to', label: 'to' },
];

export default function TransactionDetailsTableView({ data }: Props) {
  const table = useTable();
  const [tableData, setTableData] = useState(data);
  const dataFiltered = tableData;
  const denseHeight = table.dense ? 52 : 72;

  const notFound = !dataFiltered.length;

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row: ITransactionDetailsTableItem) => (
                  <TransactionDetailsTableRow
                    key={row.name}
                    row={row}
                    selected={table.selected.includes(row.name)}
                  />
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
              />

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}
