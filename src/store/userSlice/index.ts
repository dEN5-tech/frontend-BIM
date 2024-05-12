import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types';

interface UserState {
  loggedInUser: User | null;
}

const initialState: UserState = {
  loggedInUser: {
    id: 8,
    email: 'example@example.com',
    name: 'John Doe',
    password: 'password123',
    avatar: 'https://eu.ui-avatars.com/api/?name=John Doe&rounded=true&background=random&width=250&height=250'
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.loggedInUser = action.payload;
    },
    logout(state) {
      state.loggedInUser = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
