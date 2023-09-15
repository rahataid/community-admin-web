import { ITransactionStats } from 'src/types/transactions';

import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

type Props = {
  data: ITransactionStats
}

const TransactionsCards = ({ data } : Props) => {
  const { bankedCash, unbankedCash, bankedToken, unbankedToken } = data;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="success"
              icon="material-symbols:paid"
              title="Cash Distributed"
              total={bankedCash}
              subtitle="Banked Beneficiary"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="success"
              icon="material-symbols:paid"
              title="Cash Distributed"
              total={unbankedCash}
              subtitle="Unbanked Beneficiary"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="warning"
              icon="material-symbols:token"
              title="Token Issued"
              total={bankedToken}
              subtitle="Banked Beneficiary"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color="warning"
              icon="material-symbols:token"
              title="Token Issued"
              total={unbankedToken}
              subtitle="Unbanked Beneficiary"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionsCards;
