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
// alert msg
const alertMsgEle = document.querySelector('.alert-msg');
const alertContainerEle = document.querySelector('.alert');

// gv
let data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : [];

// functions
function init(){
  listContainerEle.innerHTML = null;
  incomeValueEle.innerText = `₹0`;
  expenseValueEle.innerText = `₹0`;
  balanceValueEle.innerText = `₹0`;
  addDataToDOM();
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
    addDataToDOM();
  }
}

// creating dom elements
const addDataToDOM = ()=>{
  if(data.length > 0){
    listContainerEle.innerHTML = null;
    // while passing data to local storage of a browser it will be in string format regarless of data type. 

    // then sending array we need to send it in string format so that it holds the structure of data.

    localStorage.setItem("data",JSON.stringify(data));
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
  }else if(data.length == 0){
    listContainerEle.innerHTML = null;
    incomeValueEle.innerText = `₹0`;
    expenseValueEle.innerText = `₹0`;
    balanceValueEle.innerText = `₹0`;
    localStorage.clear();
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
  alertWarningMsg();
  setTimeout(()=>{
    alertContainerEle.style.display = "none";
  },3000)
}

// alert success msg
const alertSuccessMsg = ()=>{
  alertMsgEle.innerText = `Transaction Added`;
  alertContainerEle.style.display = "block";
  alertContainerEle.classList.contains('warning') ? alertContainerEle.classList.remove('warning') : '';
  alertContainerEle.classList.add('success');
}

// alert warning msg
const alertWarningMsg = ()=>{
  alertMsgEle.innerText = `Transaction Removed`;
  alertContainerEle.style.display = "block";
  alertContainerEle.classList.contains('success') ? alertContainerEle.classList.remove('success') : '';
  alertContainerEle.classList.add('warning');
}

// event listeners
addBtnEle.addEventListener('click',()=>{
  addingData();
  alertSuccessMsg();
  setTimeout(()=>{
    alertContainerEle.style.display = "none";
  },3000)
  emptyInputFields();
})

init();