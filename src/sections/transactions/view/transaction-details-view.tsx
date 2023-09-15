'use client';

import { useTransaction, useTransactionDetailsTable } from 'src/api/transactions';
// mui
import { Button, Card, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
// components
import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from '@components/iconify/iconify';
import { RouterLink } from '@routes/components';
import { paths } from '@routes/paths';
import { useSettingsContext } from 'src/components/settings';
import TransactionDetailsCard from './transaction-details-card';
import TransactionDetailsTableView from './transaction-details-table-view';

export default function TransactionDetailsView() {
  const { txHash } = useParams();
  const { transaction } = useTransaction(txHash as string);
  const { transactionDetailsTableList } = useTransactionDetailsTable(txHash as string);
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Transactions: Details"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Details' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.general.transactions.list}
            variant="outlined"
            startIcon={<Iconify icon="ion:list" />}
            color="success"
          >
            Transaction List
          </Button>
        }
      />
      <TransactionDetailsCard data={transaction} />
      <Card>
        <Typography variant="subtitle2" sx={{ pl: 5, pt: 3, mb: 2 }}>
          Events
        </Typography>
        <Stack direction="column" spacing={3}>
          <TransactionDetailsTableView data={transactionDetailsTableList} />
          <TransactionDetailsTableView data={transactionDetailsTableList} />
          <TransactionDetailsTableView data={transactionDetailsTableList} />
        </Stack>
      </Card>
    </Container>
  );
}
