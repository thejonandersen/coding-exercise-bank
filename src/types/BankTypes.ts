export enum AccountTypes {
  checking = 'CHECKING',
  investment = 'INVESTMENT',
}

export enum InvestmentTypes {
  individual = 'INDIVIDUAL',
  corporate = 'CORPORATE',
}

export type BankAccount = {
  ownerId: number;
  id: number;
  balance: number;
  type: AccountTypes;
  investmentType?: InvestmentTypes;
}

export type BankData = {
  name: string;
  accounts: BankAccount[];
}
