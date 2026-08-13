# Bug Reports

## Bug 1 - Negative Amount Accepted
- Title: Transfer allows negative amounts
- Environment: ParaBank demo site, Chrome v115
- Steps:
  1. Log in
  2. Navigate to Transfer Funds page
  3. Enter -100 as amount
  4. Click the 'Transfer' button
- Expected result: Error message "Invalid amount"
- Actual result: Transfer completes successfully
- Severity: High
- Priority: Medium

## Bug 2 - Empty Amount Field
- Title: Transfer allows empty amount
- Environment: ParaBank demo site, Firefox v115
- Steps:
  1. Log in
  2. Navigate to Transfer Funds page
  3. Leave amount field blank
  4. Click the 'Transfer' button
- Expected result: Error message "Amount required"
- Actual result: Page reloads with no clear error
- Severity: Medium
- Priority: Low
