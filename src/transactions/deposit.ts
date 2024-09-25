import { read } from '../read';
import { BankAccount, BankData } from '../types/BankTypes';
import { DepositOrWithdrawlPayload, TransactionSuccessMessage } from '../types/TransactionTypes';
import { write } from '../write';
import { Errors, mergeData, reportError } from '../utils';

export async function deposit({ ownerId, accountId, ammount, }: DepositOrWithdrawlPayload): Promise<TransactionSuccessMessage | undefined> {
  try {
    if (!ownerId || !accountId || ! ammount) {
      throw new Error(Errors.BAD_PROPS);
    }

    const bankData: BankData = await read() as BankData;
    const account: BankAccount | undefined = bankData.accounts.find(account => accountId === account.id && ownerId === account.ownerId);

    if (!account) {
      throw new Error(Errors.ACCOUNT_NOT_FOUND);
    }

    const updatedAccount: BankAccount = {
      ...account,
      balance: account.balance + ammount,  
    };

    await write(mergeData([updatedAccount,], bankData));

  return {
    message: 'deposit successful',
    newBalance: updatedAccount.balance,
  };

  } catch (error) {
    reportError(error);
  }
}
