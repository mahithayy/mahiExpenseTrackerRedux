import { useDispatch, useSelector } from "react-redux";

import { addTransactionEntry } from "../redux/transactionSlice";
import {
  updateTotalExpense,
  updateCategoricalExpense
} from "../redux/expenseSlice";

import { toast } from "react-toastify";

export default function ExpenseForm() {
  const dispatch = useDispatch();

  // Read budgets & current expenses from Redux
  const categoryBudgets = useSelector(
    (state) => state.user.categoricalBudget
  );
  const categoryExpenses = useSelector(
    (state) => state.expense.categoricalExpense
  );


  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target["expense-name"].value;
    const category = e.target["category-select"].value;
    const amount = Number(e.target["expense-amount"].value);

    if (!name || amount <= 0) {
      toast.error("Please enter valid expense details");
      return;
    }

    // CORE LOGIC: budget exceed check
    const currentExpense = categoryExpenses[category] ||0;
    const budget = categoryBudgets[category] ||0;

    if (currentExpense + amount > budget) {
      const confirmAdd = window.confirm(
        "Expense exceeds category budget. Continue?"
      );

      if (!confirmAdd) {
        toast.info("Expense cancelled");
        return;
      }
    }

    // Dispatch transaction
    dispatch(
      addTransactionEntry({
        id: Date.now().toString(),
        name,
        category,
        amount
      })
    );

    dispatch(
      updateTotalExpense({
        amount,
        operation: "add"
      })
    );

    dispatch(
      updateCategoricalExpense({
        category,
        amount,
        operation: "add"
      })
    );


    toast.success("Expense added successfully");
    e.target.reset();
  };

  return (
    <form
  id="expense-form1"
  className="expense-form1"
  onSubmit={handleSubmit}
>

      <div className="title">New Expense Form</div>

      <label htmlFor="expense-name">Expense Name:</label>
      <input id="expense-name" name="expense-name"/>

      <label htmlFor="category-select">Select category:</label>
      <select id="category-select" name="category-select" defaultValue="">
  <option value="" >
    Select category
  </option>
  <option value="food">Food</option>
  <option value="travel">Travel</option>
  <option value="entertainment">Entertainment</option>
  <option value="others">Others</option>
</select>


      <label htmlFor="expense-amount">Expense Amount:</label>
      <input id="expense-amount" type="number" name="expense-amount"/>

      <button type="submit">Submit</button>
    </form>
  );
}

