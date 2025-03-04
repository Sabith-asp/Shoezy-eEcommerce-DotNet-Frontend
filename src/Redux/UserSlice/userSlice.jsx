import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../api/api";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/User/get-user`);
      console.log(response);
      return response?.data?.data;
    } catch (error) {
      toast.error("Error fetching user data");
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserAddress = createAsyncThunk(
  "user/fetchUserAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/Address/get-all`);
      console.log(response);
      return response?.data?.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.message);
    }
  }
);

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async (values, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(`/api/Address/add-address`, values);
      console.log(response);
      toast.success(response?.data?.message);
      dispatch(fetchUserAddress());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching user data");
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
    userDetail: {},
    address: [],
  },
  reducers: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      console.log(state, "state from logout");

      console.log("logout before");
      state.login = false;
      console.log("logout after");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.login = true;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.login = false;
    });
    builder.addCase(fetchUserAddress.fulfilled, (state, action) => {
      state.address = action.payload;
    });
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
