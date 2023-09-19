'use client';

import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useMemo, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Tooltip from '@mui/material/Tooltip';
// routes
import { usePathname, useRouter, useSearchParams } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// _mock
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
// types
//
import { Button } from '@mui/material';
import { RouterLink } from '@routes/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
// import { useUsers } from 'src/api/administration';
import CommunityService from '@services/community';
import { useCommunities } from 'src/api/community';
import { ICommunityApiFilters, ICommunityItem } from 'src/types/community';
import CommunityDetails from './commmunity-details-modal';
import CommunityTableRow from './community-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', width: 200 },
  { id: 'address', label: 'Address', width: 150 },
  { id: 'category', label: 'Category', width: 150 },
  { id: 'country', label: 'Country', width: 150 },
  { id: 'action', label: 'Actions', width: 150 },
  { id: '', width: 20 },
];

// ----------------------------------------------------------------------

export default function CommunitiesListView() {
  const table = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (walletAddress: string) => {
      const res = await CommunityService.approve(walletAddress);
      return res.data;
    },
    onError: () => {
      enqueueSnackbar('Error Approving Community', { variant: 'error' });
    },
    onSuccess: () => {
      enqueueSnackbar('Community Approved', { variant: 'success' });
      queryClient.invalidateQueries(['communities']);
    },
  });


  const defaultFilters: ICommunityApiFilters = useMemo(
    () => ({
      internetAccess: '',
      bankStatus: '',
      phoneOwnership: '',
      name: '',
      perPage: table.rowsPerPage,
      page: table.page + 1,
      orderBy: table.orderBy,
      order: table.order,
    }),
    [table.order, table.orderBy, table.page, table.rowsPerPage]
  );
  const [filters, setFilters] = useState(defaultFilters);
  const { communities, meta } = useCommunities(filters);
  const communityDetailsModal = useBoolean();
  const [viewCommunity, setViewCommunity] = useState<ICommunityItem>({});
 console.log(communities)
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { push } = useRouter();

  const createQueryString = useCallback((params: Record<string, string | number | boolean>) => {
    const queryParams = Object.entries(params)
      .filter(([_, value]) => Boolean(value))
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    return queryParams === '' ? '' : `${queryParams}`;
  }, []);

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const denseHeight = table.dense ? 52 : 72;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!communities.length && canReset) || !communities.length;

  // const handleFilters = useCallback(
  //   (name: string, value: ICommunityTableFilterValue) => {
  //     table.onResetPage();
  //     setFilters((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));

  //     const updatedParams = {
  //       ...filters,
  //       ...Object.fromEntries(searchParams.entries()),
  //       [name]: value,
  //     };
  //     const queryString = createQueryString(updatedParams);
  //     push(`${pathname}?${queryString}`);
  //   },
  //   [table, createQueryString, push, searchParams, filters, pathname]
  // );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
    push(pathname);
  }, [push, defaultFilters, pathname]);

  const handleViewRow = useCallback(
    (community: ICommunityItem) => {
      communityDetailsModal.onTrue();
      setViewCommunity(community);
    },
    [communityDetailsModal]
  );

  const handleUserActivate = async (walletAddress: string) => {
    await mutateAsync(walletAddress);
  };

  // const handleUserChangeRole = async (walletAddress: string, role: string) => {
  //   await updateRoleFunc.mutateAsync({ walletAddress, role });
  // };

  useEffect(() => {
    const searchFilters: ICommunityApiFilters = {
      ...defaultFilters,
      ...Object.fromEntries(searchParams.entries()),
    };
    setFilters(searchFilters);
  }, [searchParams, table.order, table.orderBy, table.page, table.rowsPerPage, defaultFilters]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CommunityDetails
        open={communityDetailsModal.value}
        onClose={communityDetailsModal.onFalse}
        community={viewCommunity}
      />
      <CustomBreadcrumbs
        heading="Community: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <>
          <Button
            component={RouterLink}
            href={paths.dashboard.general.community.add}
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            color="success"
          >
            Add Community
          </Button>
          <Button
          component={RouterLink}
          href={paths.dashboard.general.category.add}
          variant="outlined"
          startIcon={<Iconify icon="mingcute:add-line" />}
          color="success"
          sx={{ marginLeft: 2 }} 
        >
          Add Category
        </Button>
        </>
        }
      />
      <Card>
       

       
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={communities.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                communities.map((row: ICommunityItem) => row.name.toString())
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={communities.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {communities.map((row: ICommunityItem) => (
                  <CommunityTableRow
                    key={row.id}
                    row={row}
                    onViewRow={() => handleViewRow(row)}
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
          rowsPerPage={table?.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          //
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </Card>
    </Container>
  );
}
