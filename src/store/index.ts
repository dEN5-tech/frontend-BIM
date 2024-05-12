import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const rootReducer = combineReducers({
  // Add your reducers here
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

