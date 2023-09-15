import { useCallback, useEffect, useMemo, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// hooks
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
// types
//
import { isEqual } from 'lodash';
import { useVendors } from 'src/api/vendors';
import { IVendorItem, IVendorsApiFilters } from 'src/types/vendors';
import VendorTableRow from './vendor-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name' },
  { id: 'isApproved', label: 'Is Approved' },
  { id: 'walletAddress', label: 'Wallet Address' },
  { id: '', label: '', width: '20', align: 'center' },
];

// ----------------------------------------------------------------------

export default function VendorListView() {
  const table = useTable();

  const defaultFilters: IVendorsApiFilters = useMemo(
    () => ({
      perPage: table.rowsPerPage,
      page: table.page + 1,
      orderBy: table.orderBy,
      order: table.order,
    }),
    [table.order, table.orderBy, table.page, table.rowsPerPage]
  );
  const [filters, setFilters] = useState(defaultFilters);

  const { vendors, meta } = useVendors(filters);

  const searchParams = useSearchParams();

  const settings = useSettingsContext();

  const router = useRouter();

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!vendors.length && canReset) || !vendors.length;

  const handleViewRow = useCallback(
    (address: string) => {
      router.push(paths.dashboard.general.vendors.details(address));
    },
    [router]
  );

  const handleEditRow = useCallback(
    (address: string) => {
      router.push(paths.dashboard.general.vendors.edit(address));
    },
    [router]
  );

  useEffect(() => {
    const searchFilters: IVendorsApiFilters = {
      ...defaultFilters,
      ...Object.fromEntries(searchParams.entries()),
    };
    setFilters(searchFilters);
  }, [searchParams, table.order, table.orderBy, table.page, table.rowsPerPage, defaultFilters]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Vendors: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <Stack mb={2}>
        <VendorCards />
      </Stack> */}

      <Card>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={vendors.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {vendors.map((row: IVendorItem) => (
                  <VendorTableRow
                    key={row.walletAddress}
                    row={row}
                    onViewRow={() => handleViewRow(row.walletAddress)}
                    onEditRow={() => handleEditRow(row.walletAddress)}
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
