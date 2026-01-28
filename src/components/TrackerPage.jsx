import { useDispatch } from "react-redux";
import { setFilter, resetUser } from "../slices/userSlice";
import { clearTransactions } from "../slices/transactionSlice";
import { clearExpenses } from "../slices/expenseSlice";
import { useNavigate } from "react-router-dom";

import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import Insights from "./Insights";

export default function TrackerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClear = () => {
    dispatch(resetUser());
    dispatch(clearTransactions());
    dispatch(clearExpenses());
    navigate("/"); // go back to landing page
  };

  return (
    <>
      <h2>Expense Tracker</h2>

      {/* Filter Pills */}
      <div>
        {["ALL", "food", "travel", "entertainment", "other"].map((f) => (
          <button key={f} onClick={() => dispatch(setFilter(f))}>
            {f}
          </button>
        ))}
      </div>

      {/* Start New Tracker */}
      <div className="button-row">


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
