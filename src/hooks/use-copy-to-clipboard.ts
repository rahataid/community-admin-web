import { useSnackbar } from 'notistack';
import { useState } from 'react';

// ----------------------------------------------------------------------

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

type ReturnType = {
  copy: CopyFn;
  copiedText: CopiedValue;
};

export function useCopyToClipboard(): ReturnType {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);
  const { enqueueSnackbar } = useSnackbar();

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      enqueueSnackbar('Clipboard not supported', {
        variant: 'error',
      });
      console.warn('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      enqueueSnackbar('Copied!');

      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopiedText(null);
      enqueueSnackbar('Copied!', {
        variant: 'error',
      });

      return false;
    }
  };

  return { copiedText, copy };
}
