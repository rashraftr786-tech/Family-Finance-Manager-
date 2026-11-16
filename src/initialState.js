// Clean first-run state. These are neutral application defaults, not sample user records.
const defaultCategories = [
  { id: "income-salary", name: "Salary", type: "Income", subs: ["Monthly Salary", "Bonus"] },
  { id: "income-business", name: "Business / Freelance", type: "Income", subs: ["Business Receipts", "Consulting"] },
  { id: "income-rental", name: "Rental Income", type: "Income", subs: ["House Rent"] },
  { id: "income-other", name: "Other Income", type: "Income", subs: ["Interest", "Gift", "Refund"] },
  { id: "expense-groceries", name: "Groceries", type: "Expense", subs: ["Supermarket", "Vegetables / Fruits", "Dairy / Bakery"] },
  { id: "expense-utilities", name: "Utilities", type: "Expense", subs: ["Electricity", "Broadband / Mobile", "Gas", "Water"] },
  { id: "expense-housing", name: "Housing & Bills", type: "Expense", subs: ["Rent / Home EMI", "Maintenance"] },
  { id: "expense-education", name: "Education", type: "Expense", subs: ["School Fees", "Books / Stationery", "Tuition"] },
  { id: "expense-transport", name: "Transport & Fuel", type: "Expense", subs: ["Fuel", "Public Transport", "Vehicle Service"] },
  { id: "expense-dining", name: "Dining & Entertainment", type: "Expense", subs: ["Restaurants", "Outings"] },
  { id: "expense-health", name: "Health & Medical", type: "Expense", subs: ["Pharmacy", "Doctor", "Insurance"] },
  { id: "expense-shopping", name: "Shopping & Lifestyle", type: "Expense", subs: ["Clothing", "Electronics", "Household"] }
];

export const emptyState = {
  version: 1,
  family: { name: "My Family", currency: "INR" },
  members: [],
  accounts: [],
  categories: defaultCategories,
  transactions: [],
  budgets: [],
  recurringBills: [],
  notifications: [],
  preferences: { theme: "light", overdraft: false }
};
