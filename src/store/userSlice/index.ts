import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';
import axiosInstance from '../../requests/axios';

interface UserState {
  loggedInUser: User | null;
}

const initialState: UserState = {
  loggedInUser: null,
};

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch profile');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: User, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/auth/profile', user);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.loggedInUser = action.payload;
    },
    logout_dp(state) {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
    builder.addCase(fetchProfile.rejected, (_, action) => {
      console.error('Fetch profile failed:', action.payload);
    });
  },
});

export const { login, logout_dp } = userSlice.actions;
export default userSlice.reducer;
