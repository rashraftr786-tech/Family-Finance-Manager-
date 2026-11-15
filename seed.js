const today = new Date();
const iso = (d) => d.toISOString().slice(0,10);
const ago = (n) => { const d=new Date(); d.setDate(d.getDate()-n); return iso(d); };
export const seed = {
 version:1,
 family:{name:"The Sharma Family",currency:"INR"},
 members:[
  {id:"m1",name:"Aarav Sharma",role:"Father",color:"#0ea5e9",active:true},
  {id:"m2",name:"Meera Sharma",role:"Mother",color:"#ec4899",active:true},
  {id:"m3",name:"Riya Sharma",role:"Spouse",color:"#8b5cf6",active:true},
  {id:"m4",name:"Kabir Sharma",role:"Child",color:"#f59e0b",active:true}
 ],
 accounts:[
  {id:"a1",name:"HDFC Salary Account",institution:"HDFC Bank",type:"Bank",openingBalance:125000,threshold:5000,status:"Active",color:"#2563eb",last4:"4821"},
  {id:"a2",name:"SBI Family Savings",institution:"State Bank of India",type:"Bank",openingBalance:84000,threshold:5000,status:"Active",color:"#0d9488",last4:"1907"},
  {id:"a3",name:"ICICI Coral Credit Card",institution:"ICICI Bank",type:"Credit Card",openingBalance:0,creditLimit:150000,threshold:0,status:"Active",color:"#7c3aed",last4:"6632",dueDate:iso(new Date(Date.now()+10*86400000))},
  {id:"a4",name:"Home Cash Wallet",institution:"Cash",type:"Cash",openingBalance:12000,threshold:2500,status:"Active",color:"#ea580c",last4:"0000"},
  {id:"a5",name:"Paytm / UPI Wallet",institution:"Paytm",type:"Digital Wallet",openingBalance:8500,threshold:1000,status:"Active",color:"#0891b2",last4:"7750"}
 ],
 categories:[
  {id:"i1",name:"Salary",type:"Income",subs:["Monthly Salary","Bonus"]},
  {id:"i2",name:"Business / Freelance",type:"Income",subs:["Consulting","Business Receipts"]},
  {id:"i3",name:"Rental Income",type:"Income",subs:["House Rent"]},
  {id:"i4",name:"Interest / Gifts",type:"Income",subs:["Bank Interest","Gift","Refund"]},
  ...[
   ["Groceries",["Supermarket","Vegetables / Fruits","Dairy / Bakery"]],
   ["Utilities",["Electricity","Broadband / Mobile","Gas","Water"]],
   ["Housing & Bills",["Rent / Home EMI","Maintenance","Domestic Help"]],
   ["Education & Kids",["School Fees","Books / Stationery","Tuition"]],
   ["Transport & Fuel",["Petrol / Diesel","Cab / Public Transport","Vehicle Service"]],
   ["Dining & Entertainment",["Restaurants","Movies / OTT","Outings"]],
   ["Health & Medical",["Pharmacy","Doctor Consultation","Insurance"]],
   ["Shopping & Lifestyle",["Clothing","Electronics","Home Decor"]]
  ].map(([name,subs],i)=>({id:"e"+(i+1),name,type:"Expense",subs}))
 ],
 transactions:[],
 budgets:[
  {id:"b1",categoryId:"e1",amount:12000},{id:"b2",categoryId:"e2",amount:4000},{id:"b3",categoryId:"e3",amount:15000},{id:"b4",categoryId:"e4",amount:8000},{id:"b5",categoryId:"e5",amount:5000},{id:"b6",categoryId:"e6",amount:3000},{id:"b7",categoryId:"e7",amount:4000},{id:"b8",categoryId:"e8",amount:5000}
 ],
 recurringBills:[
  {id:"r1",name:"Electricity Bill",categoryId:"e2",amount:1800,dueDate:ago(-5),frequency:"Monthly",accountId:"a1",paid:false},
  {id:"r2",name:"Broadband / Wi-Fi",categoryId:"e2",amount:999,dueDate:ago(-2),frequency:"Monthly",accountId:"a2",paid:false},
  {id:"r3",name:"School Fees",categoryId:"e4",amount:3500,dueDate:ago(-12),frequency:"Monthly",accountId:"a1",paid:false},
  {id:"r4",name:"Home EMI",categoryId:"e3",amount:12500,dueDate:ago(-18),frequency:"Monthly",accountId:"a1",paid:false}
 ],
 notifications:[],preferences:{theme:"light",overdraft:false}
};
const tx = (id,type,days,amount,accountId,categoryId,memberId,note,extra={})=>({id,type,date:ago(days),amount,accountId,categoryId,subCategoryId:"",memberId,paymentMode:accountId==="a3"?"Credit Card":accountId==="a4"?"Cash":"UPI",notes:note,createdAt:new Date().toISOString(),...extra});
seed.transactions = [
 tx("t01","Income",40,72000,"a1","i1","m1","October salary"),
 tx("t02","Income",10,72000,"a1","i1","m1","November salary"),
 tx("t03","Income",18,12000,"a2","i3","m1","Rental income"),
 tx("t04","Expense",2,6800,"a1","e1","m2","Monthly groceries"),
 tx("t05","Expense",4,1800,"a2","e2","m1","Electricity bill"),
 tx("t06","Expense",6,3500,"a1","e4","m2","School fees"),
 tx("t07","Expense",7,2400,"a3","e8","m3","Winter clothing"),
 tx("t08","Expense",8,1600,"a4","e5","m1","Petrol"),
 tx("t09","Expense",9,1250,"a3","e6","m3","Family dinner"),
 tx("t10","Expense",11,950,"a5","e7","m2","Pharmacy"),
 tx("t11","Self-Transfer",12,10000,null,null,"m1","ATM withdrawal",{fromAccountId:"a1",toAccountId:"a4"}),
 tx("t12","Self-Transfer",14,8000,null,null,"m1","Savings transfer",{fromAccountId:"a1",toAccountId:"a2"}),
 tx("t13","Expense",16,4200,"a2","e5","m1","Vehicle service"),
 tx("t14","Expense",20,3200,"a3","e8","m3","Household shopping"),
 tx("t15","Income",35,5000,"a2","i2","m1","Freelance work"),
 tx("t16","Expense",33,9000,"a1","e3","m1","Home maintenance"),
 tx("t17","Expense",38,2700,"a4","e1","m2","Groceries"),
 tx("t18","Expense",42,1100,"a3","e6","m3","Streaming and outing"),
 tx("t19","Expense",46,2300,"a2","e7","m2","Doctor consultation"),
 tx("t20","Income",65,70000,"a1","i1","m1","September salary"),
 tx("t21","Expense",67,5800,"a1","e1","m2","Groceries"),
 tx("t22","Expense",70,1400,"a4","e5","m1","Fuel"),
 tx("t23","Self-Transfer",72,6000,null,null,"m1","Move to wallet",{fromAccountId:"a2",toAccountId:"a5"}),
 tx("t24","Expense",75,7500,"a3","e8","m3","Electronics"),
 tx("t25","Expense",80,2500,"a1","e4","m2","Books and stationery"),
 tx("t26","Income",100,70000,"a1","i1","m1","August salary"),
 tx("t27","Expense",103,11500,"a1","e3","m1","Home repairs"),
 tx("t28","Expense",106,3800,"a2","e2","m1","Utilities"),
 tx("t29","Expense",110,2100,"a4","e6","m3","Dining out"),
 tx("t30","Expense",115,1800,"a3","e7","m2","Medicines"),
 tx("t31","Income",130,70000,"a1","i1","m1","July salary"),
 tx("t32","Expense",132,6400,"a1","e1","m2","Groceries"),
 tx("t33","Expense",135,2900,"a2","e5","m1","Transport"),
 tx("t34","Expense",140,4800,"a3","e8","m3","Shopping"),
 tx("t35","Self-Transfer",145,5000,null,null,"m1","Cash top-up",{fromAccountId:"a1",toAccountId:"a4"}),
 tx("t36","Expense",150,3000,"a1","e4","m2","School supplies")
];
