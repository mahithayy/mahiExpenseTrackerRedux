import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../slices/transactionSlice";
import { toast } from "react-toastify";

export default function ExpenseForm() {
  const dispatch = useDispatch();

  // Read budgets & current expenses from Redux
  const categoryBudgets = useSelector(
    (state) => state.user.categoryBudgets
  );
  const categoryExpenses = useSelector(
    (state) => state.expenses.categoryExpenses
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
    const currentExpense = categoryExpenses[category];
    const budget = categoryBudgets[category];

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
      addTransaction({
        name,
        category,
        amount
      })
    );

    toast.success("Expense added successfully");
    e.target.reset();
  };

  return (
    <form id="expense-form1" onSubmit={handleSubmit}>
      <div id="title">New Expense Form</div>

      <label htmlFor="expense-name">Expense Name</label>
      <input id="expense-name" />

      <label htmlFor="category-select">Category</label>
      <select id="category-select">
        <option value="food">Food</option>
        <option value="travel">Travel</option>
        <option value="entertainment">Entertainment</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="expense-amount">Amount</label>
      <input id="expense-amount" type="number" />

      <button type="submit">Add Expense</button>
    </form>
  );
}

