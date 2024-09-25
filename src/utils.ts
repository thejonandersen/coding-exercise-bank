export type Error = {
  message: string;
  code: number;
}

export const Errors = {
  GENERAL: {
    message: 'Something bad happened, try again',
    code: 500,
  },
  INSUFFICIENT_FUNDS: {
    message: 'Insufficient funds',
    code: 402,
  },
}

export function init() {
  // read data
  // write data to mock
}

export function reportError(error: Error, originalError: any) {
  console.log(error, originalError);
}