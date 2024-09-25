export type DepositOrWithdrawlPayload = {
  ownerId: number;
  accountId: number;
  ammount: number;
};

export type TransactionSuccessMessage = {
  message: string;
  newBalance: number;
}

export type TransferPayload = {
  ownerId: number;
  fromAccountId: number;
  toAccountId: number;
  ammount: number;
}
