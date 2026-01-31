import { useDispatch } from "react-redux";
import {
  updateActiveFilter,
  resetAllBudget
} from "../redux/userSlice";
import { removeAllTransactions } from "../redux/transactionSlice";
import { resetAllExpense } from "../redux/expenseSlice";

import { useNavigate } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import Insights from "./Insights";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch(resetAllBudget());
dispatch(removeAllTransactions());
dispatch(resetAllExpense());

    navigate("/"); // go back to landing page
  };

  return (
    <>
      <h2>Expense Tracker</h2>

      {/* Filter Pills */}
      <div>
        {["all", "food", "travel", "entertainment", "others"].map((f) => (
          <button key={f} onClick={() => dispatch(updateActiveFilter(f))}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Start New Tracker */}
      <div className="button-row">

      <button id="new-update">
  Update budget
</button>

  <button
    id="clear"
    onClick={handleClear}
  >
    Start new tracker
  </button>
</div>


      <Insights />
      <ExpenseForm />
      <ExpenseTable />
    </>
  );
}
