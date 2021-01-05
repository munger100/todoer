import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IApiCallResult {
  key: string;
  errors?: string[];
}

interface IApiState {
  loading: string[];
  // All of loading, but not clearer except with reset
  loadingHistory: string[];
  errors: {
    [key: string]: string[] | undefined;
  };
}

const initialState: IApiState = {
  loading: [],
  loadingHistory: [],
  errors: {},
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    startRequest(state, action: PayloadAction<string>) {
      state.loading.push(action.payload);
      state.loadingHistory.push(action.payload);
      state.errors[action.payload] = undefined;
    },
    completeRequest(state, action: PayloadAction<IApiCallResult>) {
      state.loading = state.loading.filter((key) => key !== action.payload.key);
      if (action.payload.errors) {
        state.errors[action.payload.key] = action.payload.errors;
      }
    },
    reset(state, action: PayloadAction<string>) {
      state.loading = state.loading.filter((key) => key !== action.payload);
      state.loadingHistory = state.loadingHistory.filter(
        (key) => key !== action.payload
      );
      state.errors[action.payload] = undefined;
    },
  },
});

export const apiReducer = apiSlice.reducer;
export const apiActions = apiSlice.actions;
