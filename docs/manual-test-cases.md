# Manual Test Cases - Fund Transfer

## TC_FT_01 - Successful Transfer
- Preconditions: User logged in, has 2 accounts with sufficient balance
- Steps:
  1. Navigate to Transfer Funds page
  2. Enter valid amount
  3. Select From Account
  4. Select To Account
  5. Click the 'Transfer' button
- Expected result: Confirmation message - Transfer Complete!

## TC_FT_02 - Insufficient Funds
- Preconditions: User logged in, From Account has less than transfer amount
- Steps: Same as TC_FT_01
- Expected result: Error message - No balance change!

## TC_FT_03 - Invalid Amount
- Preconditions: User logged in
- Steps: Enter negative or non-numeric amount
- Expected result: Error message - No balance change!
