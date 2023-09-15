import { useSnackbar } from 'notistack';

export interface RSErrorData {
  group: string;
  meta?: Record<string, string[]> | null;
  message: string;
  name: string;
  success: boolean;
  timestamp: number;
}

class RSError extends Error {
  data: RSErrorData;

  constructor(
    message: string,
    group: string,
    name: string,
    success: boolean,
    timestamp: number,
    meta: any
  ) {
    super(message);
    this.data = {
      group,
      message,
      name,
      success,
      timestamp,
      meta,
    };
  }
}

interface ErrorHandler {
  // throwError: (nameOrMessage: string, source?: string) => void;
  showError: (message: string) => void;
  handleError: (error: RSError) => void;
  apiError: (message: string) => void;
  handleContractError: (error: any) => void;
}

export const useErrorHandler = (): ErrorHandler => {
  const snackBar = useSnackbar();

  const showError = (message: string) => {
    snackBar.enqueueSnackbar(message, {
      variant: 'error',
    });
  };

  const handleError = (error: RSError) => {
    showError(`${error.data.group}: ${error.data.message}`);
  };

  const handleContractError = (error: any) => {
    try {
      let message = error.error.error.error.toString();
      message = message.replace('Error: VM Exception while processing transaction: revert ', '');
      showError(message);
    } catch (e) {
      showError('Error occurred calling contract. Please check logs for details.');
      console.error(error);
    }
  };

  // const throwError = (nameOrMessage: string, source = 'Error') => {
  //   throw new RSError(nameOrMessage, source);
  // };

  return {
    // ERRORS,
    // throwError,
    showError,
    handleError,
    apiError: showError,
    handleContractError,
  };
};
