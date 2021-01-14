import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginPayload, IRegisterPayload } from "../../../api/types/auth";

interface IAuthState {
  hasChecked: boolean;
  signature?: string;
}

const initialState: IAuthState = {
  hasChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register(_, __: PayloadAction<IRegisterPayload>) {},
    login(_, __: PayloadAction<ILoginPayload>) {},
    whoami() {},
    setHasChecked(state) {
      state.hasChecked = true;
    },
    logout() {},
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
