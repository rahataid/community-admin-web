import {
  ITransactionDetails,
  ITransactionDetailsTableList,
  ITransactionItem,
  ITransactionStats,
  Method,
  Mode,
  txStatus,
} from 'src/types/transactions';

export const transaction: ITransactionItem = {
  id: 2,
  timestamp: '1688489466',
  txHash: '0x123456abcde',
  method: Method.QR,
};

export const transactionStats: ITransactionStats = {
  bankedCash: 100,
  unbankedCash: 200,
  bankedToken: 300,
  unbankedToken: 400,
};

export const transactionDetails: ITransactionDetails = {
  txHash: '0x111111abcde',
  txStatus: txStatus.SUCCESS,
  timestamp: '1688489470',
  mode: Mode.ONLINE,
  from: '0x222222abcde',
  to: '0x333333abcde',
};

export const transactionDetailsTableList: ITransactionDetailsTableList = [...Array(30)].map(
  (_, index) => ({
    name: `Transaction Name ${index}`,
    amount: 100,
    to: '0x1111',
    from: '0x2222',
  })
);
