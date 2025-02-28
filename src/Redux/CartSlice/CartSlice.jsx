import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { logout } from "../UserSlice/userSlice";
import api from "../../api/api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Cart/get-all`);
      return response.data?.data;
    } catch (error) {
      toast.error("Error fetching cart data");
      return rejectWithValue(error.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productid, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/api/Cart/add-to-cart?productId=${productid}`
      );
      console.log(response);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error adding product to cart"
      );
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartitemid, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/Cart/remove/${cartitemid}`);
      console.log(response);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error removing product from cart"
      );
      return rejectWithValue(error.message);
    }
  }
  //   async ({ userId, productId }, { getState, rejectWithValue }) => {
  //     try {
  //       const { cart } = getState().cart;
  //       const newCart = cart.filter((item) => item.id !== productId);
  //       await api.patch(`http://localhost:5000/users/${userId}`, {
  //         cart: newCart,
  //       });
  //       return newCart;
  //     } catch (error) {
  //       toast.error("Error removing product from cart");
  //       return rejectWithValue(error.message);
  //     }
  //   }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ userId, productId }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState().cart;
      const product = cart.find((item) => item.id === productId);
      const stockQty = (
        await api.get(`http://localhost:5000/products/${productId}`)
      ).data.quantity;

      if (product.quantity + 1 > stockQty) {
        toast.error("Quantity exceeds stock!");
        return rejectWithValue("Exceeds stock");
      }

      const newCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      await api.patch(`http://localhost:5000/users/${userId}`, {
        cart: newCart,
      });
      return newCart;
    } catch (error) {
      toast.error("Error updating quantity");
      return rejectWithValue(error.message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ userId, productId }, { getState, rejectWithValue }) => {
    try {
      const { cart } = getState().cart;
      const product = cart.find((item) => item.id === productId);

      if (product.quantity <= 1) {
        toast.error("Minimum quantity is 1!");
        return rejectWithValue("Minimum quantity reached");
      }

      const newCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
      await api.patch(`http://localhost:5000/users/${userId}`, {
        cart: newCart,
      });
      return newCart;
    } catch (error) {
      toast.error("Error updating quantity");
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout, (state) => {
        state.cart = [];
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});
export default cartSlice.reducer;
