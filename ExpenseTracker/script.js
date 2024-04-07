// Get references to the form and table body
const expenseForm = document.getElementById('expense-form');
const expensesTableBody = document.getElementById('expenses-table-body');

// Initialize the expenses array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render the expenses
function renderExpenses() {
  expensesTableBody.innerHTML = '';
  expenses.forEach((expense, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${expense.category}</td>
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>${expense.amount}</td>
      <td>${expense.paymentMethod}</td>
      <td>
      <button class="edit-button" data-index="${index}">Edit</button>
      <button class="delete-button" data-index="${index}">Delete</button>
      </td>
    `;
    expensesTableBody.appendChild(row);
  });
}

// Event listener for the form
expenseForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const expense = {
    category: expenseForm.category.value,
    date: expenseForm.date.value,
    description: expenseForm.description.value,
    amount: expenseForm.amount.value,
    paymentMethod: expenseForm['payment-method'].value
  };

  const index = expenseForm['expense-index'].value;
  if (index === '') {
    // Add a new expense
    expenses.push(expense);
  } else {
    // Update an existing expense
    expenses[index] = expense;
    expenseForm['expense-index'].value = '';
  }

  // Save the expenses to local storage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Clear the form
  expenseForm.reset();

  // Update the expenses table
  renderExpenses();
});

// Event listener for the edit buttons
expensesTableBody.addEventListener('click', function(event) {
  if (event.target.classList.contains('edit-button')) {
    const index = event.target.dataset.index;
    const expense = expenses[index];
    expenseForm.category.value = expense.category;
    expenseForm.date.value = expense.date;
    expenseForm.description.value = expense.description;
    expenseForm.amount.value = expense.amount;
    expenseForm['payment-method'].value = expense.paymentMethod;
    expenseForm['expense-index'].value = index; // Set the expense-index value
  } else if (event.target.classList.contains('delete-button')) {
    const index = event.target.dataset.index;
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }
});

// Render the expenses when the page loads
renderExpenses();