'use script';

// i/p

const transactionTypeEle = document.getElementById('transaction-type');
const itemDescriptionEle = document.getElementById('inp-description');
const amountValueEle = document.getElementById('inp-amt');
const addBtnEle = document.getElementById('btn-add');
const balanceValueEle = document.getElementById('balance-value');
const incomeValueEle = document.querySelector('.income-value');
const expenseValueEle = document.querySelector('.expense-value');
// unordered list container
const listContainerEle = document.querySelector('.transaction-container');

// gv
let data = [];
// functions
function init(){
  listContainerEle.innerHTML = null;
  incomeValueEle.innerText = `₹0`;
  expenseValueEle.innerText = `₹0`;
  balanceValueEle.innerText = `₹0`;
}

// creating list and updating database
const addingData = ()=>{
  let obj = {}
  if(transactionTypeEle.value && itemDescriptionEle.value && amountValueEle.value){
    obj.id = Date.now();
    obj["transaction_type"] = transactionTypeEle.value;
    obj["description"] = itemDescriptionEle.value;
    obj["amount"] = Number(amountValueEle.value);
    data.push(obj);
    console.log(data)
    addDataToDOM();
  }
}

// creating dom elements
const addDataToDOM = ()=>{
  if(data.length > 0){
    listContainerEle.innerHTML = null;
    data.forEach((item)=>{
      const listItem = document.createElement('li');
      // based on the transaction type class is added

      item.transaction_type === "expense" ? listItem.classList.add('transaction-list-item','transaction-expense') : listItem.classList.add('transaction-list-item','transaction-income');
      // list item html

      listItem.innerHTML = `
      <div class="content-list-item">
        <span class="list-item">${item.description}</span>
        <span class="list-item-price">${item.transaction_type === "expense" ? "-" : "+"}${item.amount}</span>
      </div>
      <div class="close-box">
        <button class="close-btn" onclick="deleteItem(${item.id})"><i class="fa-solid fa-xmark"></i></button>
      </div>
      `;
      // appending child element
      listContainerEle.appendChild(listItem);
    })
    calculateBalance();
  }else{
    listContainerEle.innerHTML = null;
    init();
  }
}

// This func to empty i/p fields
const emptyInputFields = ()=>{
  transactionTypeEle.value = '';
  itemDescriptionEle.value = '';
  amountValueEle.value = '';
}

// this func is to calc balance
const calculateBalance = ()=>{
  // calc income
  const totalIncome = data.filter((obj)=> obj.transaction_type === "income").map((item)=> item.amount).reduce((sum,amount)=> sum += amount,0);
  incomeValueEle.innerText = `₹${totalIncome.toFixed(2)}`;
  // calc expense
  const totalExpense = data.filter((obj)=> obj.transaction_type === "expense").map((item)=> item.amount).reduce((sum,amount)=> sum += amount,0);
  expenseValueEle.innerText = `₹${totalExpense.toFixed(2)}`;
  // calc balance
  const balance = totalIncome - totalExpense;
  balanceValueEle.innerText = `₹${balance.toFixed(2)}`;
}

// delete
const deleteItem = (id)=>{
  data = data.filter((obj)=> obj.id !== id);
  addDataToDOM();
}

// event listeners
addBtnEle.addEventListener('click',()=>{
  addingData();
  emptyInputFields();
})

init();