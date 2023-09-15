import Iconify, { IconifyProps } from '@components/iconify';
import { Box, Card, Stack, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';

type SummaryCardProps = {
  sx?: React.CSSProperties;
  color?: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  title: string;
  subtitle: string;
  total: number | React.JSX.Element;
  icon?: IconifyProps;
  showTooltip?: boolean;
  tooltipText?: string;
};

export default function SummaryCard({
  title,
  total,
  icon = '',
  subtitle,
  color = 'primary',
  sx,
  showTooltip = true,
  tooltipText,
}: SummaryCardProps): JSX.Element {
  const theme = useTheme();
  const darkerColor = theme.palette[color].darker;
  const lighterColor = theme.palette[color].lighter;
  const darkColor = theme.palette[color].dark;

  return (
    <Card
      sx={{
        width: 1,
        boxShadow: 0,
        color: darkerColor,
        bgcolor: lighterColor,
        ...sx,
      }}
    >
      <Iconify
        icon={icon}
        sx={{
          p: 1.5,
          top: 24,
          right: 24,
          width: 48,
          height: 48,
          borderRadius: '50%',
          position: 'absolute',
          color: darkColor,
        }}
      />
      <Tooltip title={showTooltip && tooltipText}>
        <Stack spacing={1} sx={{ p: 3 }}>
          <Typography variant="subtitle2">{title}</Typography>
          {typeof total === 'string' || typeof total === 'number' ? (
            <Typography variant="h3">{total}</Typography>
          ) : (
            total
          )}

          <Box component="span" sx={{ opacity: 0.72, typography: 'body2' }}>
            {subtitle}
          </Box>
        </Stack>
      </Tooltip>
    </Card>
  );
}
