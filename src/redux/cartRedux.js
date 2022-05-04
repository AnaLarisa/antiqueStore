import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    recipes: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addBook: (state, action) => {
      state.quantity += 1;
      state.recipes.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addBook } = cartSlice.actions;
export default cartSlice.reducer;
