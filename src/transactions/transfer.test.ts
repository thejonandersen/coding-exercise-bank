import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

import { init } from '../utils';
import { transfer } from './transfer';
import * as utils from '../utils';
import { TransferPayload, TransactionSuccessMessage } from '../types/TransactionTypes';
import { SpiedFunction } from 'jest-mock';

describe('transfer', () => {
  let errorSpy: SpiedFunction<(error: unknown) => void>;
  beforeEach(async () => {
    await init();
    errorSpy = jest.spyOn(utils, 'reportError');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return success payload when completed', async () => {
    const returnData: TransactionSuccessMessage | undefined = await transfer({ fromAccountId: 111, toAccountId: 222, ownerId: 1, ammount: 100, });
    const fromDataSaved: boolean = await utils.verifySavedData(111, 900);
    const toDataSaved: boolean = await utils.verifySavedData(222, 10100);

    expect(returnData?.message).toBe('transfer successful');
    expect(returnData?.newBalance).toBe(900);
    expect(fromDataSaved).toBeTruthy();
    expect(toDataSaved).toBeTruthy();

    expect(errorSpy).toBeCalledTimes(0);
  });

  it('should throw an error when not supplied the correct info', async () => {
    await transfer({ fromAccountId: 111, ownerId: 1, } as TransferPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.BAD_PROPS));
  });

  it('should throw an error when account is not found', async () => {
    await transfer({ fromAccountId: 111, toAccountId: 222, ownerId: 2, ammount: 1, } as TransferPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.ACCOUNT_NOT_FOUND));
  });

  it('should throw an error when trying to transfer more than balance', async () => {
    await transfer({ fromAccountId: 444, toAccountId: 555, ownerId: 2, ammount: 200, } as TransferPayload) as TransactionSuccessMessage;

    expect(errorSpy).toBeCalledTimes(1);
    expect(errorSpy).toBeCalledWith(Error(utils.Errors.INSUFFICIENT_FUNDS));
  });
});
