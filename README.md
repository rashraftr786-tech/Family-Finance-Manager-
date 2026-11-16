# Family Finance Manager

A responsive household-finance application built with React, Vite, Tailwind CSS, Lucide React and Chart.js.

## Stage 1 status: repository modernisation and demo-data removal

This stage prepares the existing application for real-user data entry. It removes the fictional Sharma household, sample family members, sample bank and wallet accounts, sample transactions, sample budgets and sample recurring bills. A new installation starts with an empty financial ledger and neutral built-in income/expense category templates.

For users who previously opened the original demo version, the application performs a one-time cleanup of the original seeded record IDs from its existing LocalStorage data. The original fictional household name is replaced with the neutral `My Family` workspace label. Other user-created records are retained where they can be distinguished from the original sample records.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```

Create and preview a production build:
```bash
npm run build
npm run preview
```

## Current features
- Dashboard KPIs and six-month income/expense chart
- Income, expense and self-transfer ledger entry
- Bank, cash, wallet and credit-card account creation
- Credit-card liability tracking and bill payment action
- Searchable transaction ledger with edit/delete
- Category budgets and threshold alerts
- Recurring bill payment posting
- Account reconciliation and reporting-period selection
- CSV export, browser print/PDF, JSON backup and restore
- LocalStorage persistence
- Empty-state prompts when no accounts or transactions have been entered

## Accounting conventions
- Asset account balances increase with income and decrease with expenses.
- Credit-card purchases increase card liabilities and count as expense once.
- Card bill payments reduce the paying asset account and card liability; they do not create another expense.
- Transfers move value between accounts without affecting income or expense.
- Account reconciliation is derived from opening balances and transaction movements.

## Data and privacy — current limitation
At this stage, data remains in this browser's LocalStorage. It is not encrypted, cloud-synchronised, or shared across devices. Supabase authentication, cloud database storage, family-member management, and multi-user permissions are not part of Stage 1 and must be implemented and tested in later stages. Do not enter bank credentials or treat this application as a regulated banking service. Export a JSON backup before clearing browser data.

## Deployment
The existing GitHub Actions workflow builds the Vite application and deploys the `dist` folder to GitHub Pages when changes are pushed to `main`.

## Important
Stage 1 removes the bundled demonstration data and prepares a clean first-run experience. It does not yet make the application production-ready or cloud-based. Accounting utilities and user flows require further testing before the application is relied upon for financial, tax, audit, or regulated reporting.
