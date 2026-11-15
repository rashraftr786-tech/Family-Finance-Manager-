# Family Finance Manager

A responsive, browser-local household bookkeeping application built with React, Vite, Tailwind CSS, Lucide React and Chart.js. All demonstration information is fictional.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite. To create a production build:
```bash
npm run build
npm run preview
```

## Features
- Dashboard KPIs and six-month income/expense chart
- Five demo accounts, family members and household transaction history
- Income, expense and self-transfer ledger entry
- Credit-card liability tracking and bill payment action
- Searchable transaction ledger with edit/delete
- Category budgets and threshold alerts
- Recurring bill payment posting
- Account reconciliation, reporting period selection, CSV export and browser print/PDF
- JSON backup and validated restore
- LocalStorage persistence and demo data reset through clearing the browser's site data

## Accounting conventions
- Asset account balances increase with income and decrease with expenses.
- Credit-card purchases increase card liabilities and count as expense once.
- Card bill payments reduce the paying asset account and card liability; they do not create another expense.
- Transfers move value between accounts without affecting income or expense.
- The account reconciliation is derived from opening balances and transaction movements.

## Data and privacy
Data is stored only in this browser's LocalStorage. It is not encrypted, cloud-synchronised, or shared across devices. Do not enter bank credentials or treat this demo as a regulated banking service. Export a JSON backup periodically. Imported JSON is structurally validated before replacement.

## Notes / current scope
This is a functional local-first starter application. It includes the core ledger and report flows, but does not connect to banks, schedule operating-system notifications, or provide multi-user/cloud synchronization. Recurring bills are user-confirmed entries; a paid bill is marked paid for the loaded billing instance. Review the accounting utilities and extend tests before relying on it for tax, audit, or regulated financial reporting.
