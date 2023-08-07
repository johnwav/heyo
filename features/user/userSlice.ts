import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface userState {
  email: string;
  lastSeen: string;
  online: boolean;
  password: string;
  username: string;
  __v: string;
  _id: string;
}
//@ts-ignore
const initialState: userState = {};


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    storeUserAction: (state, action: PayloadAction<userState>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUserAction } = userSlice.actions;

export default userSlice.reducer;
