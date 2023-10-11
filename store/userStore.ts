import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/user/userSlice";
import messageReducer from '@/features/message/messageSlice';

export const userStore = configureStore({
  reducer: {
    user: userReducer,
    messages: messageReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof userStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof userStore.dispatch;
