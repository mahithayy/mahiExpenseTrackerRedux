import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice";
import transactionReducer from "../redux/transactionSlice";
import expenseReducer from "../redux/expenseSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
    expense: expenseReducer
  }
});
//export { store };
export default store;
