import { readFile } from "fs/promises";
import path from "path";
import { BankData } from "./types/BankTypes";

var data: BankData;

async function init() {
  const rawData = await readFile(path.join(__dirname, '../data/data.json'), 'utf-8');
  data = JSON.parse(rawData) as BankData;
  
  console.log(data);
}

init();