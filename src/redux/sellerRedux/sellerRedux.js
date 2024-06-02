import { createSlice } from "@reduxjs/toolkit";

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    sellers: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getSellersStart: (state) => {
      state.isFetching = true;
    },
    getSellersSuccess: (state, action) => {
      state.isFetching = false;
      state.sellers = action.payload;
      state.error = false;
    },
    getSellersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    createSellerStart: (state) => {
      state.isFetching = true;
    },
    createSellerSuccess: (state, action) => {
      state.isFetching = false;
      state.sellers.push(action.payload);
      state.error = false;
    },
    createSellerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateSellerStart: (state) => {
      state.isFetching = true;
    },
    updateSellerSuccess: (state, action) => {
      state.isFetching = false;
      const index = state.sellers.findIndex(seller => seller._id === action.payload._id);
      if (index !== -1) {
        state.sellers[index] = action.payload;
      }
      state.error = false;
    },
    updateSellerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    deleteSellerStart: (state) => {
      state.isFetching = true;
    },
    deleteSellerSuccess: (state, action) => {
      state.isFetching = false;
      state.sellers = state.sellers.filter(seller => seller._id !== action.payload);
      state.error = false;
    },
    deleteSellerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getSellersStart,
  getSellersSuccess,
  getSellersFailure,
  createSellerStart,
  createSellerSuccess,
  createSellerFailure,
  updateSellerStart,
  updateSellerSuccess,
  updateSellerFailure,
  deleteSellerStart,
  deleteSellerSuccess,
  deleteSellerFailure,
} = sellerSlice.actions;

export default sellerSlice.reducer;
