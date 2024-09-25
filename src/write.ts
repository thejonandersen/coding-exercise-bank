import { writeFile } from "fs/promises";
import path from "path";
import { BankData } from "./types/BankTypes";
import { reportError, Errors } from "./utils";

export async function read(data: BankData) {
  try {
    const filePath = path.join(__dirname, `../data/mock-data.json`);
    return await writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    reportError(Errors.GENERAL, error);
  }
}