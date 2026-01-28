import { useSelector } from "react-redux";

export default function Insights() {
  const { categoryBudgets } = useSelector((s) => s.user);
  const { categoryExpenses } = useSelector((s) => s.expenses);

  const categories = Object.keys(categoryBudgets);

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
          const budget = categoryBudgets[cat];
          const expense = categoryExpenses[cat];
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
