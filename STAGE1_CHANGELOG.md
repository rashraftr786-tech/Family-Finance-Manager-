# Stage 1 Change Log

- Replaced the seeded Sharma demo database with a clean initial state.
- Removed fictional accounts, members, transactions, budgets and recurring bills from fresh installations.
- Retained neutral built-in category templates only; these are taxonomy defaults, not user financial records.
- Added one-time LocalStorage cleanup for the original demo record IDs and demo family label.
- Removed hardcoded demo member/account/category IDs from new transaction defaults and card/bill payment entries.
- Added a first-account empty-state prompt on the dashboard.
- Updated README to document the current scope and LocalStorage limitation honestly.

## Validation
- Clean initial-state and empty-ledger accounting smoke checks passed with Node.js.
- A Vite production build could not be run in this environment because npm dependency installation timed out; run `npm install` and `npm run build` before deploying.
