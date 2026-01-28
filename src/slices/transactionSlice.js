import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  transactionList: []
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: {
      reducer(state, action) {
        state.transactionList.push(action.payload);
      },
      prepare({ name, amount, category }) {
        return {
          payload: {
            id: nanoid(),
            name,
            amount,
            category
          }
        };
      }
    },
    deleteTransaction(state, action) {
      state.transactionList = state.transactionList.filter(
        (t) => t.id !== action.payload
      );
    },
    clearTransactions() {
      return initialState;
    }
  }
});

export const {
  addTransaction,
  deleteTransaction,
  clearTransactions
} = transactionSlice.actions;

export default transactionSlice.reducer;
