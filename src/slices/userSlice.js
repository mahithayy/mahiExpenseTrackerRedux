import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  totalBudget: 0,
  categoryBudgets: {
    food: 0,
    travel: 0,
    entertainment: 0,
    other: 0
  },
  selectedFilter: "ALL"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action) {
      return { ...state, ...action.payload };
    },
    updateBudgets(state, action) {
      state.totalBudget = action.payload.totalBudget;
      state.categoryBudgets = action.payload.categoryBudgets;
    },
    setFilter(state, action) {
      state.selectedFilter = action.payload;
    },
    resetUser() {
      return initialState;
    }
  }
});

export const {
  setUserData,
  updateBudgets,
  setFilter,
  resetUser
} = userSlice.actions;

export default userSlice.reducer;
