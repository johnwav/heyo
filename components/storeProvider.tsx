"use client";

import { userStore } from "@/store/userStore";
import { Provider } from "react-redux";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => (
    //@ts-ignore
  <Provider store={userStore}>{children}</Provider>
);



