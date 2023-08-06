import { Session } from "next-auth";
import { storeUserAction } from "./userSlice";
import { Dispatch, SetStateAction } from "react";
import { AnyAction } from "@reduxjs/toolkit";

export const getuser = async (
  session: Session,
  dispatch: Dispatch<AnyAction>
) => {
  if (session) {
    //@ts-ignore
    const sessionId = session?.user?.id; // Get the session ID
    try {
      const response = await fetch("/api/getuser", {
        method: "POST", // Use the appropriate HTTP method (POST, GET, etc.)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionId }),
      });
      if (response.ok) {
        const user = await response.json();
        // setUser(user);
        console.log("storing user data");
        await dispatch(storeUserAction(user));
        console.log("user data stored successfully", user);
        // console.log(user);
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};
