import { createSlice } from "@reduxjs/toolkit";
import { addTransaction, deleteTransaction, clearTransactions } from "./transactionSlice";

const initialState = {
  categoryExpenses: {
    food: 0,
    travel: 0,
    entertainment: 0,
    other: 0
  }
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    clearExpenses() {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTransaction, (state, action) => {
        const { category, amount } = action.payload;
        state.categoryExpenses[category] += amount;
      })
      .addCase(deleteTransaction, (state, action) => {
        // full recalculation happens in selector-driven UI
        // reset here and let UI derive again
        state.categoryExpenses = {
          food: 0,
          travel: 0,
          entertainment: 0,
          other: 0
        };
      })
      .addCase(clearTransactions, () => initialState);
  }
});

export const { clearExpenses } = expenseSlice.actions;
export default expenseSlice.reducer;
