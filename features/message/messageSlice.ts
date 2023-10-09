import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface messageState {
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
}

const initialState: messageState[] = [
  {
    sender: "them",
    receiver: "sjdksdkds",
    content: "HEyyy",
    timestamp: "now",
  },
  {
    sender: "you",
    receiver: "sjdksdkds",
    content: "yo whats up",
    timestamp: "now",
  },
];

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    storeUserMessages: (state, action: PayloadAction<messageState>) => {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { storeUserMessages } = messageSlice.actions;

export default messageSlice.reducer;
