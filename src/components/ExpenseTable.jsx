import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../slices/transactionSlice";
import { toast } from "react-toastify";

export default function ExpenseTable() {
  const dispatch = useDispatch();

  const transactions = useSelector(
    (state) => state.transactions.transactionList
  );

  const filter = useSelector((state) => state.user.selectedFilter);

  const filteredTransactions =
    filter === "ALL"
      ? transactions
      : transactions.filter((t) => t.category === filter);

  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete?");
    if (!ok) return;

    dispatch(deleteTransaction(id));
    toast.warn("Transaction deleted");
  };

  return (
    <table border="1" style={{ margin: "20px auto" }}>
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Transaction</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {filteredTransactions.map((t, index) => (
          <tr key={t.id}>
            <td>{index + 1}</td>
            <td>{t.name}</td>
            <td>{t.category}</td>
            <td>{t.amount}</td>
            <td>
              <button onClick={() => handleDelete(t.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

