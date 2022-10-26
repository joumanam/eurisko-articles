import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  username: string | null;
  accessToken: string | null;
}

export type UserState = {
  user: User | null;
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user', initialState, reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  }
})

export const { setUser } = userSlice.actions;

export default userSlice.reducer