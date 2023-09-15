import { useCallback, useEffect, useMemo, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { usePathname, useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
//
import { Stack } from '@mui/material';
import { isEqual } from 'lodash';
import { useTransactions } from 'src/api/transactions';
import { ITransactionApiFilters, ITransactionTableFilterValue } from 'src/types/transactions';
import TransactionsCards from './transaction-cards';
import TransactionTableRow from './transaction-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'timestamp', label: 'Timestamp' },
  { id: 'txHash', label: 'TxHash' },
  { id: 'method', label: 'Method' },
  { id: '', width: '88px', align: 'center' },
];

// ----------------------------------------------------------------------

export default function TransactionListView() {
  const table = useTable();

  const settings = useSettingsContext();

  const router = useRouter();

  const denseHeight = table.dense ? 52 : 72;

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { push } = useRouter();

  const defaultFilters: ITransactionApiFilters = useMemo(
    () => ({
      perPage: table.rowsPerPage,
      page: table.page + 1,
      orderBy: table.orderBy,
      order: table.order,
    }),
    [table.order, table.orderBy, table.page, table.rowsPerPage]
  );

  const [filters, setFilters] = useState(defaultFilters);
  const { transactions, transactionStats, meta } = useTransactions(filters);

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!transactions.length && canReset) || !transactions.length;

  const createQueryString = useCallback((params: Record<string, string | number | boolean>) => {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => Boolean(value))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryParams === '' ? '' : `${queryParams}`;
  }, []);

  const handleFilters = useCallback(
    (name: string, value: ITransactionTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));

      const updatedParams = {
        ...filters,
        ...Object.fromEntries(searchParams.entries()),
        [name]: value,
      };
      const queryString = createQueryString(updatedParams);
      push(`${pathname}?${queryString}`);
    },
    [table, createQueryString, push, searchParams, filters, pathname]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    push(pathname);
  }, [push, defaultFilters, pathname]);

  const handleViewRow = useCallback(
    (txHash: string) => {
      router.push(paths.dashboard.general.transactions.details(txHash));
    },
    [router]
  );

  useEffect(() => {
    const searchFilters: ITransactionApiFilters = {
      ...defaultFilters,
      ...Object.fromEntries(searchParams.entries()),
    };
    setFilters(searchFilters);
  }, [searchParams, table.order, table.orderBy, table.page, table.rowsPerPage, defaultFilters]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Transactions: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack mb={2}>
        <TransactionsCards data={transactionStats} />
      </Stack>

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={transactions?.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {transactions
                  ?.slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <TransactionTableRow
                      key={row.txHash}
                      row={row}
                      selected={table.selected.includes(row.txHash)}
                      onViewRow={() => handleViewRow(row.txHash)}
                    />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table?.page, table?.rowsPerPage, meta?.total || 0)}
                />

                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={meta?.total || 0}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}
