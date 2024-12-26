import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      return response.data;
    } catch (error) {
      console.error("Fetching products failed", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("http://localhost:5000/users");
      return data;
    } catch (error) {
      console.error("Fetching users failed", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeUserStatus = createAsyncThunk(
  "admin/changeUserStatus",
  async ({ id, status = true }, thunkAPI) => {
    try {
      const response = await axios.patch(`http://localhost:5000/users/${id}`, {
        status: !status,
      });
      toast.success(`User with ID:${id} status changed`);
      return { id, newStatus: !status };
    } catch (error) {
      console.error("Error in changing user status", error);
      toast.error("Error in changing user status");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "admin/editProduct",
  async ({ id, values }, thunkAPI) => {
    try {
      await axios.put(`http://localhost:5000/products/${id}`, values);
      toast.success("Editing Successful");
      return { id, values };
    } catch (error) {
      console.error("Error in editing product", error);
      toast.error("Error in editing product");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "admin/addProduct",
  async (product, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        product
      );
      toast.success("Product added");
      return response.data;
    } catch (error) {
      console.error("Error in adding product", error);
      toast.error("Error in adding product");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      toast.success("Product deleted");
      return id;
    } catch (error) {
      console.error("Error in deleting product", error);
      toast.error("Error in deleting product");
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
    isEditModalOpen: false,
    isAddModalOpen: false,
    isUserCartOpen: false,
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
    setIsUserCartOpen: (state, action) => {
      state.isUserCartOpen = action.payload;
    },
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
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.filter((user) => user.status !== false);
        state.blockedUsers = action.payload.filter(
          (user) => user.status === false
        );
      })
      .addCase(changeUserStatus.fulfilled, (state, action) => {
        const { id, newStatus } = action.payload;

        // Update the user in the users list
        state.users = state.users.map((user) =>
          user.id === id ? { ...user, status: newStatus } : user
        );

        if (!newStatus) {
          // Move user to blockedUsers if they are blocked
          const blockedUser = state.users.find((user) => user.id === id);
          state.blockedUsers.push(blockedUser);
          state.users = state.users.filter((user) => user.id !== id);
        } else {
          // Move user to users list if they are unblocked
          const unblockedUser = state.blockedUsers.find(
            (user) => user.id === id
          );
          state.users.push(unblockedUser);
          state.blockedUsers = state.blockedUsers.filter(
            (user) => user.id !== id
          );
        }
      })

      .addCase(editProduct.fulfilled, (state, action) => {
        const { id, values } = action.payload;
        state.products = state.products.map((product) =>
          product.id === id ? { ...product, ...values } : product
        );
      })

      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
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
