# Requirements
**This is a simple bank program.**
- A bank has a name. 
- A bank also has several accounts. 
- An account has an owner and a balance. 
- Account types include: Checking, Investment. 
- There are two types of Investment accounts: Individual, Corporate. 
- Individual accounts have a withdrawal limit of 500 dollars. 
- Transactions are made on accounts. 
- Transaction types include: Deposit, Withdraw, and Transfer

## Tests
write test classes that invoke a deposit, a withdrawal, and a transfer

## Notes
Sorry this took so long, I was actually feature complete way earlier but I was getting intermittent test failures as I added more functionality. This was due to Jest running tests in parallel and having one data source that was being read and written to. My fix was to run the tests in sequence. That wouldn't be acceptable in the real world but we wouldn't be using a JSON file as source of truth either. I felt that implementing a file lock was over to solve the issue might be overkill as well.

## Running Tests
`npm run test` or `npx jest -i`