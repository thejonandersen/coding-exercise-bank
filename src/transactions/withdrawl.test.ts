import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

import { init } from '../utils';
import { withdrawl } from './withdrawl';
import * as utils from '../utils';
import { DepositOrWithdrawlPayload, TransactionSuccessMessage } from '../types/TransactionTypes';
import { SpiedFunction } from 'jest-mock';

describe('withdrawl', () => {
  let errorSpy: SpiedFunction<(error: unknown) => void>;
  beforeEach(async () => {
    await init();
    errorSpy = jest.spyOn(utils, 'reportError');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success payload when completed', async () => {
    const returnData: TransactionSuccessMessage = await withdrawl({ accountId: 111, ownerId: 1, ammount: 100, }) as TransactionSuccessMessage;
    const dataSaved: boolean = await utils.verifySavedData(111, 900);    
    
    expect(returnData.message).toBe('deposit successful');
    expect(returnData.newBalance).toBe(900);
    expect(dataSaved).toBeTruthy();

    expect(errorSpy).toBeCalledTimes(0);
  });

  it('should throw an error when not supplied the correct info', async () => {
    await withdrawl({ accountId: 111, ownerId: 1, } as DepositOrWithdrawlPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.BAD_PROPS));
  });

  it('should throw an error when account is not found', async () => {
    await withdrawl({ accountId: 111, ownerId: 2, ammount: 1, } as DepositOrWithdrawlPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.ACCOUNT_NOT_FOUND));
  });

  it('should throw an error when trying to withdraw over 500 from a individual investment account', async () => {
    await withdrawl({ accountId: 222, ownerId: 1, ammount: 501, } as DepositOrWithdrawlPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.WITHDRAWL_TOO_LARGE));
  });

  it('should return success payload when trying to withdraw over 500 from a corporate investment account', async () => {
    const returnData: TransactionSuccessMessage = await withdrawl({ accountId: 333, ownerId: 1, ammount: 1000, }) as TransactionSuccessMessage;
    const dataSaved: boolean = await utils.verifySavedData(333, 99000);
    
    expect(returnData.message).toBe('deposit successful');
    expect(returnData.newBalance).toBe(99000);
    expect(dataSaved).toBeTruthy();

    expect(errorSpy).toBeCalledTimes(0);
  });

  it('should throw an error when trying to withdraw more than balance', async () => {
    await withdrawl({ accountId: 444, ownerId: 2, ammount: 200, } as DepositOrWithdrawlPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.INSUFFICIENT_FUNDS));
  });
});
