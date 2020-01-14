// // BUDGET CONTROLLER
// const budgetController = (function() {
// 	class Budget{
// 		constructor(budget){
// 			this.budget = budget;
// 			this.budgetLeft = budget;
// 		}
// 	}

// 	class Expense{
// 		constructor(name, amt){
// 			this.name = name;
// 			this.amt = amt;
// 		}
// 	}

// 	return {
// 		saveBudget: function(amt){
// 			const userBudget = new Budget(amt);
// 		},

// 		addExpense: function(name, amt){
// 			return new Expense(name, amt);
// 		},

// 		calulateBudgetLeft: function(bLeft, exp){
// 			bLeft -= exp;
// 			return bLeft;
// 		},


// 	};
// })();



// // UI CONTROLER
// const UIController = (function(){
// 		let budget;
// 		let DOMstrings = {
// 			budgetSpan: '#budget #total',
// 			budgetLeftSpan: '#budget #left',
// 			expenseForm: '#add-expense',
// 			expensesList: '#expenses .list-group'
// 		};

// 		let budgetLeftContainer = document.querySelector('#budget .restante');

// 		return {
// 			DOM: DOMstrings,

// 			displayBudget: function(item){
// 				budget = item;
// 				document.querySelector(DOMstrings.budgetSpan).textContent = item;
// 				document.querySelector(DOMstrings.budgetLeftSpan).textContent = item;
// 			},

// 			displayExpense: function(name, amt){
// 				const li = document.createElement('li');
// 				li.className = 'list-group-item d-flex justify-content-between align-items-center';
// 				li.innerHTML = `
// 					${name}
// 					<span class="badge badge-primary badge-pill">$ ${amt}</span>
// 				`;

// 				document.querySelector(DOMstrings.expensesList).appendChild(li);

// 				// Reset form
// 				document.forms[0].reset();
// 			},

// 			displayBudgetLeft: function(amt){
// 				document.querySelector(DOMstrings.budgetLeftSpan).textContent = amt;

// 				// Check if the 50% or 75% already spent

// 				if(amt <= budget/2 && amt > budget/4){

// 					// Change the background to orange
//					budgetLeftContainer.classList.remove('alert-success');
// 					budgetLeftContainer.classList.add('alert-warning');

// 				}
// 				if(amt <= budget/4 ){

// 					// Change the background to red
// 					budgetLeftContainer.classList.remove('alert-success', alert-warning');
// 					budgetLeftContainer.classList.add('alert-danger');
// 				}
// 			},

// 			printMessage: function(msg, className){
// 				const error = document.createElement('div');
// 				error.classList.add('text-center', 'alert', className);
// 				error.appendChild(document.createTextNode(msg));
// 				document.getElementById('add-expense').insertAdjacentElement('beforebegin', error);

// 				// Remove the error
// 				setTimeout(() => {
// 					error.remove();
// 				}, 3000);
// 			}
// 		};

// })();



// // GENERAL APP CONTROLLER
// const controller = (function(budgetCtrl, UICtrl){
	
// 	let budgetLeft;

// 	const validateField = (e) => {
// 		e.preventDefault();

// 		// 1. Get values of the name and amt field
// 		let expName = document.getElementById('expense').value;
// 		let expAmt = document.getElementById('amount').value;
		
// 		// 2. Validate the fields
// 		if(expName && expAmt){
			
// 			expAmt = Number(expAmt);

// 			if(isNaN(expAmt)){

// 				UICtrl.printMessage('There was an error, amount must be a number', 'alert-danger');

// 			}else{

// 				// Create the expense
// 				const expenses = budgetCtrl.addExpense(expName, expAmt);
// 				// Display expense
// 				UICtrl.displayExpense(expName, expAmt);
// 				// Display pop up
// 				UICtrl.printMessage('Added.', 'alert-success');

// 				// 3. Display to expense in the UI

// 				// 4. Calculate the  budget left
// 				budgetLeft = budgetCtrl.calulateBudgetLeft(budgetLeft, expAmt);

// 				// 5. Update the budget left in the UI
// 				UICtrl.displayBudgetLeft(budgetLeft);
// 			}

// 		}else{
// 			UICtrl.printMessage('There was an error, all the fields are mandatory', 'alert-danger');
// 		}
// 	};

// 	const getBudget = () => {

// 		// Get budget
// 		let budget = prompt("What is your budget for the week ?");

// 		// Validate budget
// 		budget = parseInt(budget);
		
// 		if(isNaN(budget) || budget < 1){
// 			// Reload page
// 			window.location.reload();
// 		}else{
// 			// 1. Instanstiate the setBudget class to store the budget value
// 			budgetCtrl.saveBudget(budget);
// 			budgetLeft = budget;
// 			// 2. Display the user budget in the UI
// 			UICtrl.displayBudget(budget);
// 		}
// 	};

// 	// 1. Get the users budget when the app opens
// 	const eventListeners = () =>{
// 		// When page Loads
// 		document.addEventListener('DOMContentLoaded', getBudget);
// 		// When a user adds an expense
// 		document.getElementById('add-expense').addEventListener('submit', validateField);
// 	};
// 	eventListeners();

// })(budgetController, UIController);


// classes
class Budget{
	constructor(budget){
		this.budget = Number(budget);
		this.budgetLeft = this.budget;
	}

	subtractFromBudget(amt){
		return this.budgetLeft -= amt;
	}
}

class HTML{

	// Display user budget in the UI
	insertBudget(amt){
		// Insert into innerHTML
		budgetTotal.innerHTML = `${amt}`;
		budgetLeft.innerHTML = `${amt}`;
	}

	// Inserts user expense into the UI
	addExpenseToList(name, amount){
		const li = document.createElement('li');
		li.className = 'list-group-item d-flex justify-content-between align-items-center';
		// Create template
		li.innerHTML = `
			${name}
			<span class="badge badge-primary badge-pill">$ ${amount}</span>
		`;
		expensesList.appendChild(li);
	}

	trackBudget(amt){
		// Subtract amt from budgetLeft
		const budgetLeftDollars = budget.subtractFromBudget(amt);
		
		//
		budgetLeft.innerHTML = `${budgetLeftDollars}`;

		// check if 25% of total budget is left
		if((budget.budget / 4) > budgetLeftDollars){
			budgetLeft.parentElement.parentElement.classList.remove('alert-warning','alert-warning');
			budgetLeft.parentElement.parentElement.classList.add('alert-danger');
		}else if((budget.budget / 2) > budgetLeftDollars){
			budgetLeft.parentElement.parentElement.classList.remove('alert-success');
			budgetLeft.parentElement.parentElement.classList.add('alert-warning');
		}	
	}

	// Print message on UI
	printMessage(msg, className){
		const message = document.createElement('div');
		message.classList.add('text-center', 'alert', className);
		message.appendChild(document.createTextNode(msg));
		document.querySelector('.primary').insertBefore(message, addExpenseForm);

		// Remove the warning
		setTimeout(function(){
			message.remove();
		}, 3000);
		
	}
}

// variables
const addExpenseForm = document.querySelector('#add-expense'),
		budgetTotal = document.querySelector('span#total'),
		budgetLeft = document.querySelector('span#left'),
		expensesList = document.querySelector('#expenses ul');

let budget, userBudget;

// Instatiate the HTML class
const html = new HTML();

// eventlisteners
function eventListeners(){
	
	// App init
	document.addEventListener('DOMContentLoaded', function(){
		// 1. Get user budget
		userBudget = prompt('What\'s your budget for this week?');

		// 2. Validate the user input
		if(budget === null || budget === '' || budget === '0'){
			// Reload page if there's wrong input
			window.location.reload();
		}else{
			// 1. Instatiate the budget class and set budget eqaul to it
			budget = new Budget(userBudget);

			// 2. instantiate the html class to insert the user budget in UI
			html.insertBudget(budget.budget);
		}
	});

	// Add expense
	addExpenseForm.addEventListener('submit', function(e){
		e.preventDefault();

		// Read Input values
		const expenseName = document.querySelector('#expense').value;
		const amount = document.querySelector('#amount').value;

		if(expenseName === '' || amount === ''){
			// Print message(correct or invalid)
			html.printMessage("There was an error, all the fields are mandatory", 'alert-danger');
		}else{
			// Add expenses into list
			html.addExpenseToList(expenseName, amount);

			// Update budget left
			html.trackBudget(amount);

			// Disply message
			html.printMessage("Added...", "alert-success");

			// Reset form
			addExpenseForm.reset();
		}
	});

}
eventListeners();