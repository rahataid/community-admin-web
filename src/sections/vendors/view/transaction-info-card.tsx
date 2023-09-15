import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

interface IVendorCardsProps {
  balance: number;
  pending: number;
  disbursed: number;
}

const VendorsCards = ({ balance, pending, disbursed }: IVendorCardsProps) => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={4}>
      <SummaryCard
        color="success"
        icon="material-symbols:paid"
        title="Balance"
        total={balance}
        subtitle="tokens"
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <SummaryCard
        color="success"
        icon="material-symbols:paid"
        title="Pending"
        total={pending}
        subtitle="tokens"
      />
    </Grid>
    <Grid item xs={12} md={4}>
      <SummaryCard
        color="warning"
        icon="material-symbols:token"
        title="Disbursed"
        total={disbursed}
        subtitle="tokens"
      />
    </Grid>
  </Grid>
);

export default VendorsCards;
