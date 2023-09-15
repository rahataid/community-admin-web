import { axiosInstance, endpoints } from '@utils/axios';
import { ITransactionApiFilters } from 'src/types/transactions';

const TransactionsService = {
  list: (params?: ITransactionApiFilters) =>
    axiosInstance.get(endpoints.transactions.list, { params }),
  details: (txHash: string) => axiosInstance.get(endpoints.transactions.details(txHash)),
};

export default TransactionsService;
