import { read } from '../read';
import { AccountTypes, BankAccount, BankData, InvestmentTypes } from '../types/BankTypes';
import { DepositOrWithdrawlPayload, TransactionSuccessMessage } from '../types/TransactionTypes';
import { write } from '../write';
import { Errors, mergeData, reportError } from '../utils';

export async function withdrawl({ ownerId, accountId, ammount, }: DepositOrWithdrawlPayload): Promise<TransactionSuccessMessage | undefined> {
  try {
    if (!ownerId || !accountId || ! ammount) {
      throw new Error(Errors.BAD_PROPS);
    }

    const bankData: BankData = await read() as BankData;  
    const account: BankAccount | undefined = bankData.accounts.find(account => accountId === account.id && ownerId === account.ownerId);

    if (!account) {
      throw new Error(Errors.ACCOUNT_NOT_FOUND);
    }

    const { type, investmentType, balance, } = account;

    if (type === AccountTypes.investment && investmentType === InvestmentTypes.individual && ammount > 500 ) {
      throw new Error(Errors.WITHDRAWL_TOO_LARGE);
    }

    if (ammount > balance) {
      throw new Error(Errors.INSUFFICIENT_FUNDS);
    }

    const updatedAccount: BankAccount = {
      ...account,
      balance: account.balance - ammount,  
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
