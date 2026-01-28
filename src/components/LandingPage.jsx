import { useDispatch } from "react-redux";
import { setUserData } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const budget = Number(e.target.budget.value);
    const food = Number(e.target.food.value);
    const travel = Number(e.target.travel.value);
    const entertainment = Number(e.target.entertainment.value);

    if (!name || budget <= 0) {
      alert("All fields are mandatory and budget must be > 0");
      return;
    }

    const sum = food + travel + entertainment;

    if (sum > budget) {
      alert("Total Categorical budget should not exceed monthly budget");
      return;
    }

    const other = budget - sum;

    dispatch(
      setUserData({
        name,
        totalBudget: budget,
        categoryBudgets: {
          food,
          travel,
          entertainment,
          other
        }
      })
    );

    navigate("/tracker");
  };

  return (
    <div className="landing-container">
      <h1>xTracker</h1>
      <p>Welcome to your own Expense Tracker</p>
      <p>Please fill in the below form to start tracking</p>

      <form name="landing-page-form" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="field-row">
          <label htmlFor="name">Enter your name:</label>
          <input id="name" />
        </div>

        {/* Budget */}
        <div className="field-row">
          <label htmlFor="budget">Enter your monthly budget:</label>
          <input id="budget" type="number" />
        </div>

        <p className="section-title">
          Fill your monthly categorical budget:
        </p>

        {/* Category Table */}
        <table className="budget-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Travel</th>
              <th>Entertainment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input id="food" type="number" />
              </td>
              <td>
                <input id="travel" type="number" />
              </td>
              <td>
                <input id="entertainment" type="number" />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Buttons */}
        <div className="button-row">
          <button type="submit">submit</button>
          <button id="new-update">Update budget</button>
          <button type="reset" id="clear">
            Start new tracker
          </button>
          <button type="button" onClick={() => navigate(-1)}>
            Go Back →
          </button>
        </div>
      </form>
    </div>
  );
}
