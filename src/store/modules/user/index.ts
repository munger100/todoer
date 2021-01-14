import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../auth/types";

export interface ISession {
  token: string;
  user: IUser;
}

interface IUserState {
  session?: ISession;
}

const initialState: IUserState = {};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<ISession>) {
      state.session = action.payload;
    },
    setUser(state, action: PayloadAction<IUser>) {
      if (state.session) {
        state.session.user = action.payload;
      }
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
