import { readFile } from "fs/promises";
import path from "path";
import { BankData } from "./types/BankTypes";
import { reportError, Errors } from "./utils";

export async function read(initial: boolean) {
  try {
    const fileName = initial ? 'data' : 'mockData';

    const rawData = await readFile(path.join(__dirname, `../data/${fileName}.json`), 'utf-8');
    console.log(rawData);
    
    return JSON.parse(rawData) as BankData;
  } catch (error) {
    reportError(
      Errors.GENERAL,
      error,
    );
  }
}