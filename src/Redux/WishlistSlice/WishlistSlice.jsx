import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import api from "../../api/api";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Wishlist/get-all`);
      return response.data?.data;
    } catch (error) {
      toast.error("Error fetching cart data");
      return rejectWithValue(error.message);
    }
  }
);

export const addOrRemoveWishlist = createAsyncThunk(
  "wishlist/addOrRemoveWishlist",
  async (productid, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/Wishlist/add-or-remove?productId=${productid}`
      );
      console.log(response);

      toast.success(response?.data?.message);
      dispatch(fetchWishlist());
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error adding product to cart"
      );
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default wishlistSlice.reducer;
