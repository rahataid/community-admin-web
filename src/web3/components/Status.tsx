'use client';

import type { Web3ReactHooks } from '@web3-react/core';

export function Status({
  isActivating,
  isActive,
  error,
}: {
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>;
  isActive: ReturnType<Web3ReactHooks['useIsActive']>;
  error?: Error;
}) {
  let statusText = '';
  let statusEmoji = '';
  if (error) {
    statusText = error.name ?? 'Error';
    if (error.message) {
      statusText += `: ${error.message}`;
    }
    statusEmoji = '🔴';
  } else if (isActivating) {
    statusText = 'Connecting';
    statusEmoji = '🟡';
  } else if (isActive) {
    statusText = 'Connected';
    statusEmoji = '🟢';
  } else {
    statusText = 'Disconnected';
    statusEmoji = '⚪️';
  }

  return (
    <div>
      {statusEmoji} {statusText}
    </div>
  );
}
