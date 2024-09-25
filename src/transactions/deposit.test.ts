import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

import { init } from '../utils';
import { deposit } from './deposit';
import * as utils from '../utils';
import { DepositOrWithdrawlPayload, TransactionSuccessMessage } from '../types/TransactionTypes';
import { SpiedFunction } from 'jest-mock';

describe('deposits', () => {
  let errorSpy: SpiedFunction<(error: unknown) => void>;
  beforeEach(async () => {
    await init();
    errorSpy = jest.spyOn(utils, 'reportError');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success payload when completed', async () => {
    const returnData: TransactionSuccessMessage | undefined = await deposit({ accountId: 111, ownerId: 1, ammount: 100, });
    const dataSaved: boolean = await utils.verifySavedData(111, 1100);
    
    expect(returnData?.message).toBe('deposit successful');
    expect(returnData?.newBalance).toBe(1100);
    expect(dataSaved).toBeTruthy();

    expect(errorSpy).toBeCalledTimes(0);
  });

  it('should throw an error when not supplied the correct info', async () => {
    await deposit({ accountId: 111, ownerId: 1, } as DepositOrWithdrawlPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.BAD_PROPS));
  });

  it('should throw an error when account is not found', async () => {
    await deposit({ accountId: 111, ownerId: 2, ammount: 1, } as DepositOrWithdrawlPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.ACCOUNT_NOT_FOUND));
  });
});
