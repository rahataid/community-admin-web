import Chart, { useChart } from '@components/chart';
import Card, { CardProps } from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    categories?: string[];
    colors?: string[][];
    series: [];
    options?: ApexOptions;
  };
}

export default function Bargraph({ chart, ...other }: Props) {
  const theme = useTheme();

  const {
    colors = [
      //   [theme.palette.primary.light, theme.palette.secondary.main],
      //   [theme.palette.warning.light, theme.palette.warning.main],
      theme.palette.primary.light,
      theme.palette.secondary.main,
      theme.palette.warning.light,
      theme.palette.warning.main,
    ],
    categories,
    series,
    options,
  } = chart;
  const chartOptions = useChart({
    colors,
    xaxis: {
      categories,
    },
    ...options,
  });

  const commSeries = [
    {
      name: 'Commmunities',
      data: series,
    },
  ];
  return (
    <Card>
      <Chart options={chartOptions} type="bar" series={commSeries} height={320} />;
    </Card>
  );
}
