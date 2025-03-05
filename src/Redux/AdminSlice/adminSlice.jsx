import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../api/api";

export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/Product/get-all-admin");
      return response?.data?.data;
    } catch (error) {
      console.log("Fetching products failed", error?.response?.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/User/get-all");
      return response?.data?.data;
    } catch (error) {
      toast.error("Fetching users failed" || error?.response.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "admin/fetchCategory",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/Product/get-category");
      return response?.data?.data;
    } catch (error) {
      toast.error("Fetching users failed" || error?.response.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCategories = createAsyncThunk(
  "admin/fetchCategory",
  async (category, thunkAPI) => {
    try {
      const response = await api.post(
        `/api/Product/add-category?category=${category}`
      );
      thunkAPI.dispatch(fetchCategory());
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error("Adding category failed" || error?.response.data?.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async (userid, thunkAPI) => {
    try {
      const response = await api.put(`/api/User/block-or-unblock/${userid}`);
      toast.success(response?.data?.message);
      thunkAPI.dispatch(fetchUsers());
    } catch (error) {
      console.log(error);

      toast.error(
        "Error in changing user status" || error?.response?.data?.message
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ id, values }, thunkAPI) => {
    try {
      const response = await api.put(`/api/Product/update/${id}`, values);
      toast.success(response?.data?.message);
      thunkAPI.dispatch(fetchProducts());
      return;
    } catch (error) {
      console.error("Error in editing product", error);
      toast.error("Error in editing product");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (formdata, thunkAPI) => {
    try {
      const response = await api.post(`/api/Product/add-product`, formdata);
      toast.success(response?.data?.message);
      thunkAPI.dispatch(fetchProducts());
      return;
    } catch (error) {
      console.error("Error in adding product", error);
      toast.error(error?.response?.data?.message || "Error in adding product");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`/api/Product/delete/${id}`);
      toast.success(response?.data?.message);
      thunkAPI.dispatch(fetchProducts());
    } catch (error) {
      console.error("Error in deleting product", error);
      toast.error(error?.response?.data?.message, "Error in deleting product");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const changeUserStatus = createAsyncThunk(
//   "admin/changeUserStatus",
//   async ({ id, status = true }, thunkAPI) => {
//     try {
//       await axios.patch(`http://localhost:5000/users/${id}`, {
//         status: !status,
//       });
//       toast.success(`User with ID:${id} status changed`);
//       return { id, newStatus: !status };
//     } catch (error) {
//       console.error("Error in changing user status", error);
//       toast.error("Error in changing user status");
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    blockedUsers: [],
    products: [],
    categories: [],
    isEditModalOpen: false,
    isAddModalOpen: false,
    // isUserCartOpen: false,
    isUserOrderOpen: false,
    loading: false,
    error: null,
  },
  reducers: {
    setIsEditModalOpen: (state, action) => {
      state.isEditModalOpen = action.payload;
    },
    setIsAddModalOpen: (state, action) => {
      state.isAddModalOpen = action.payload;
    },
    // setIsUserCartOpen: (state, action) => {
    //   state.isUserCartOpen = action.payload;
    // },
    setIsUserOrderOpen: (state, action) => {
      state.isUserOrderOpen = action.payload;
    },
    // setUnBlockedUsers: (state, action) => {
    //   state.blockedUsers = state.blockedUsers.filter(
    //     (item) => item.id !== action.payload
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      });
  },
});

export const {
  setIsEditModalOpen,
  setIsAddModalOpen,
  setIsUserCartOpen,
  setIsUserOrderOpen,
  //   setUnBlockedUsers,
} = adminSlice.actions;

export default adminSlice.reducer;
