import { useState } from 'react';

import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { URLS } from '@web3/chains';
import { hooks, metaMask } from '../../connectors/metaMask';

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

const CHAIN_IDS = Object.keys(URLS).map(Number);

export interface MetamaskCardWalletProps {
  connector: MetaMask;
  activeChainId: ReturnType<Web3ReactHooks['useChainId']>;
  chainIds?: ReturnType<Web3ReactHooks['useChainId']>[] | undefined;
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error: Error | undefined;
  setError: (error: Error | undefined) => void;
  ENSNames: ReturnType<Web3ReactHooks['useENSNames']>;
  provider?: ReturnType<Web3ReactHooks['useProvider']>;
}

type MetamaskCardProps<C extends React.ComponentType<MetamaskCardWalletProps | any>> = {
  component: C;
  title?: string;
  description?: string;
  walletAvatar?: string;
  children?: React.ReactNode;
  onClick?: (props: MetamaskCardWalletProps) => void;
  props?: React.ComponentPropsWithRef<C>;
};

export default function MetaMaskCard<C extends React.ComponentType<MetamaskCardWalletProps | any>>({
  component: Component,
  description,
  title,
  walletAvatar,
  children,
  props,
  onClick,
}: MetamaskCardProps<C>): JSX.Element {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();
 
  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState<Error | undefined>(undefined);



  return (
    <Component
      connector={metaMask}
      activeChainId={chainId}
      isActivating={isActivating}
      isActive={isActive}
      error={error}
      setError={setError}
      accounts={accounts}
      provider={provider}
      ENSNames={ENSNames}
      title={title}
      description={description}
      walletAvatar={walletAvatar}
      chainIds={CHAIN_IDS}
      children={children}
      onClick={() =>
        onClick &&
        onClick({
          connector: metaMask,
          activeChainId: undefined,
          isActivating: false,
          isActive: false,
          error: undefined,
          setError: (error: Error | undefined) => {
            console.error(error);
          },
          ENSNames: [],
        })
      }
      {...(props as React.ComponentPropsWithRef<C>)}
    />
  );
}
