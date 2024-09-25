import { writeFile } from 'fs/promises';
import path from 'path';
import { BankData } from './types/BankTypes';
import { reportError } from './utils';

export async function write(data: BankData) {
  try {
    const filePath = path.join(__dirname, '../data/mock-data.json');
    await writeFile(filePath, JSON.stringify(data, null, 2));
    
  } catch (error) {    
    reportError(error);
  }
}
