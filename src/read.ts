import { readFile } from 'fs/promises';
import path from 'path';
import { BankData } from './types/BankTypes';
import { reportError } from './utils';

export async function read(initial: boolean = false) {
  try {
    const fileName = initial ? 'data' : 'mock-data';

    const rawData = await readFile(path.join(__dirname, `../data/${fileName}.json`), 'utf-8');
    
    return JSON.parse(rawData) as BankData;
  } catch (error) {
    reportError(error);
  }
}
