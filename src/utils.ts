import { read } from './read';
import { write } from './write';
import { BankAccount, BankData } from './types/BankTypes';

export type Error = {
  message: string;
  code: number;
}

export const Errors = {
  GENERAL: 'Something bad happened, try again',
  INSUFFICIENT_FUNDS: 'Insufficient funds',
  BAD_PROPS: 'Appropriate inputs for this action were not supplied',
  ACCOUNT_NOT_FOUND: 'Account id and owner match no records',
  WITHDRAWL_TOO_LARGE: 'The withdrawl ammount is too large for this account',
};

export async function init() {
  try {
    // load fresh data
    const data: BankData = await read(true) as BankData;

    if (data) {
      await write(data);
    } else {
      throw new Error('data undefined');
    }

  } catch (error: unknown) {
    reportError(error);
  }
  
}

export function reportError(error: unknown) {
  console.log(error);
}

export function mergeData(updates: BankAccount[], bankData: BankData): BankData {  
  let mergedAccounts: BankAccount[] = bankData.accounts;
  updates.forEach(update => {
    
    mergedAccounts = mergedAccounts.map(current => {      
      return update.id === current.id && update.ownerId === current.ownerId ? update : current;
    });
  });  

  return {
    ...bankData,
    accounts: mergedAccounts,
  };
}

export async function verifySavedData(accountId: number, balance: number): Promise<boolean> {
  const bankData: BankData | undefined = await read();
  const account = bankData?.accounts.find(current => current.id === accountId);
  
  return account?.balance === balance;
}
