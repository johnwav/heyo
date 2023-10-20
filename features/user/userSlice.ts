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
  about: string;
  profileImage: string;
  token: string;
}
//@ts-ignore
const initialState: userState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    storeUserAction: (state, action: PayloadAction<userState>) => {
      return { ...state, ...action.payload };
    },
    storeToken: (state, action: PayloadAction<string>) => {
      return { ...state, token: action.payload };
    },
    updateUserAboutAction: (state, action: PayloadAction<string>) => {
      return { ...state, about: action.payload };
    },
    updateUserProfileImageAction: (state, action: PayloadAction<string>) => {
      return { ...state, profileImage: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  storeUserAction,
  updateUserAboutAction,
  updateUserProfileImageAction,
  storeToken,
} = userSlice.actions;

export default userSlice.reducer;
