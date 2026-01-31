import { useSelector } from "react-redux";

export default function Insights() {
  const { categoricalBudget } = useSelector((s) => s.user);
const { categoricalExpense } = useSelector((s) => s.expense);


  const categories = Object.keys(categoricalBudget);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Category</th>
          <th>Status</th>
          <th>Budget</th>
          <th>Expense</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((cat) => {
          const budget = categoricalBudget[cat];
          const expense = categoricalExpense[cat];
          const balance = budget - expense;
          const status = balance >= 0 ? "Within Limit" : "Exceeded";

          return (
            <tr key={cat}>
              <td>{cat}</td>
              <td>{status}</td>
              <td>{budget}</td>
              <td>{expense}</td>
              <td>{balance}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
