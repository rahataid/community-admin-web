import { useCopyToClipboard } from '@hooks/use-copy-to-clipboard';
import { Button, Stack, Tooltip } from '@mui/material';
import { truncateEthAddress } from '@utils/strings';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IProps {
  address: string;
  type?: 'address' | 'txHash';
}

const TruncatedAddressButton: React.FC<IProps> = ({ address, type = 'address' }) => {
  const router = useRouter();
  const { copiedText, copy } = useCopyToClipboard();

  const handleClick = () => {
    const url = type === 'address' ? `/address/${address}` : `/tx/${address}`;
    window.open(`${url}?txHash=${address}`, '_blank');
  };
  // const truncatedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <Tooltip title={copiedText ? 'Copied!' : address}>
      <Stack direction="row">
        <Button variant="text" onClick={handleClick}>
          {truncateEthAddress(address)}
        </Button>
        <Button variant="outlined" onClick={() => copy(address)}>
          Copy
        </Button>
      </Stack>
    </Tooltip>
  );
};

export default TruncatedAddressButton;
