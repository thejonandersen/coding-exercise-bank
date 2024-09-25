import { read } from '../read';
import { BankAccount, BankData } from '../types/BankTypes';
import { TransactionSuccessMessage, TransferPayload } from '../types/TransactionTypes';
import { write } from '../write';
import { Errors, mergeData, reportError } from '../utils';

export async function transfer({ ownerId, fromAccountId, toAccountId, ammount, }: TransferPayload): Promise<TransactionSuccessMessage | undefined> {
  try {
    if (!ownerId || !fromAccountId || ! ammount || ! toAccountId) {
      throw new Error(Errors.BAD_PROPS);
    }

    const bankData: BankData = await read() as BankData;  
    const fromAccount: BankAccount | undefined = bankData.accounts.find(account => fromAccountId === account.id && ownerId === account.ownerId);
    const toAccount: BankAccount | undefined = bankData.accounts.find(account => toAccountId === account.id);

    if (!fromAccount || !toAccount) {
      throw new Error(Errors.ACCOUNT_NOT_FOUND);
    }

    if (ammount > fromAccount.balance) {
      throw new Error(Errors.INSUFFICIENT_FUNDS);
    }

    const updatedFromAccount: BankAccount = {
      ...fromAccount,
      balance: fromAccount.balance - ammount,  
    };
    
    const updatedToAccount = {
      ...toAccount,
      balance: toAccount.balance + ammount,  
    };
    
    await write(mergeData([updatedFromAccount, updatedToAccount,], bankData));

  return {
    message: 'transfer successful',
    newBalance: updatedFromAccount.balance,
  };

  } catch (error) {
    reportError(error);
  }
}
