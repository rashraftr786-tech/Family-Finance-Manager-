export const money = n => new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Math.round(n||0));
export const dateISO = d => new Date(d).toISOString().slice(0,10);
export const monthStart = d => {const x=new Date(d);x.setDate(1);return dateISO(x);};
export const inRange = (date,start,end) => date>=start && date<=end;
export const isLiability = a => a.type==="Credit Card";
export function accountBalances(state,asOf="9999-12-31"){
 const map={}; state.accounts.forEach(a=>map[a.id]=Number(a.openingBalance)||0);
 const txs=[...state.transactions].filter(t=>t.date<=asOf).sort((a,b)=>a.date.localeCompare(b.date));
 for(const t of txs){
  if(t.type==="Income" && map[t.accountId]!==undefined) map[t.accountId]+=t.amount;
  if(t.type==="Expense" && map[t.accountId]!==undefined) map[t.accountId]+=isLiability(state.accounts.find(a=>a.id===t.accountId))?t.amount:-t.amount;
  if(t.type==="Self-Transfer"){if(map[t.fromAccountId]!==undefined)map[t.fromAccountId]-=t.amount;if(map[t.toAccountId]!==undefined)map[t.toAccountId]+=t.amount;}
  if(t.type==="Card Payment"){if(map[t.accountId]!==undefined)map[t.accountId]-=t.amount;if(map[t.cardAccountId]!==undefined)map[t.cardAccountId]-=t.amount;}
 }
 return map;
}
export function totals(state,start,end){
 const ts=state.transactions.filter(t=>inRange(t.date,start,end));
 const income=ts.filter(t=>t.type==="Income").reduce((s,t)=>s+t.amount,0);
 const expense=ts.filter(t=>t.type==="Expense").reduce((s,t)=>s+t.amount,0);
 return {income,expense,savings:income-expense,rate:income?((income-expense)/income)*100:0};
}
export function netWorth(state,balances=accountBalances(state)){
 let assets=0,liabilities=0;
 state.accounts.forEach(a=>{const v=balances[a.id]||0;if(isLiability(a))liabilities+=v;else assets+=v;});
 return {assets,liabilities,net:assets-liabilities};
}
export function spendByCategory(state,start,end){
 const map={};state.transactions.filter(t=>t.type==="Expense"&&inRange(t.date,start,end)).forEach(t=>{map[t.categoryId]=(map[t.categoryId]||0)+t.amount;});return map;
}
export function accountReconciliation(state,start,end){
 const opening=accountBalances(state,new Date(new Date(start).getTime()-86400000).toISOString().slice(0,10));
 const closing=accountBalances(state,end);
 return state.accounts.map(a=>{
  const ts=state.transactions.filter(t=>inRange(t.date,start,end));
  let credits=0,debits=0;
  ts.forEach(t=>{
   if(t.type==="Income"&&t.accountId===a.id)credits+=t.amount;
   if(t.type==="Expense"&&t.accountId===a.id){if(isLiability(a))credits+=t.amount;else debits+=t.amount;}
   if(t.type==="Self-Transfer"){if(t.toAccountId===a.id)credits+=t.amount;if(t.fromAccountId===a.id)debits+=t.amount;}
   if(t.type==="Card Payment"){if(t.accountId===a.id)debits+=t.amount;if(t.cardAccountId===a.id)debits+=t.amount;}
  });
  return {account:a,opening:opening[a.id]||0,credits,debits,closing:closing[a.id]||0};
 });
}
export function makeTransaction(state,form){
 const amount=Math.round(Number(form.amount));
 if(!Number.isFinite(amount)||amount<=0)throw Error("Enter an amount greater than zero.");
 if(!form.date||Number.isNaN(Date.parse(form.date)))throw Error("Choose a valid transaction date.");
 if(form.type==="Self-Transfer"){
  if(!form.fromAccountId||!form.toAccountId||form.fromAccountId===form.toAccountId)throw Error("Choose two different accounts.");
 }else{
  if(!state.accounts.some(a=>a.id===form.accountId))throw Error("Choose a valid account.");
  if(!state.categories.some(c=>c.id===form.categoryId&&c.type===form.type))throw Error("Choose a valid category.");
  const account=state.accounts.find(a=>a.id===form.accountId);
  if(account.type==="Credit Card"&&form.type==="Income")throw Error("Income cannot be posted to a credit card.");
  if(account.type!=="Credit Card"&&form.type==="Expense"){
   const bal=accountBalances(state)[account.id]||0;
   if(amount>bal&&!state.preferences.overdraft)throw Error(`Insufficient balance in ${account.name}. Enable overdraft in Settings or choose another account.`);
  }
  if(account.type==="Credit Card"&&form.type==="Expense"){
   const bal=accountBalances(state)[account.id]||0;
   if(bal+amount>account.creditLimit)throw Error("This purchase exceeds the available credit limit.");
  }
 }
 return {id:"t"+Date.now().toString(36)+Math.random().toString(36).slice(2,6),...form,amount,createdAt:new Date().toISOString()};
}
export function monthRange(offset=0){
 const d=new Date();d.setMonth(d.getMonth()+offset);return {start:dateISO(new Date(d.getFullYear(),d.getMonth(),1)),end:dateISO(new Date(d.getFullYear(),d.getMonth()+1,0))};
}
