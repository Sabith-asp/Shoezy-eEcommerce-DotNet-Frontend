import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      return response.data;
    } catch (error) {
      toast.error("Error fetching user data");
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    login: false,
    userDetail: {},
  },
  reducers: {
    login: (state) => {
      state.login = true;
    },
    logout: (state) => {
      console.log(state, "state from logout");

      state.login = false;
      localStorage.removeItem("id");
      localStorage.removeItem("name");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userDetail = action.payload;
      state.login = true;
    });
  },
});
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
