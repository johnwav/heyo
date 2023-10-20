import { Session } from "next-auth";
import { storeToken, storeUserAction } from "./userSlice";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

export const getUser = async (
  session: Session,
  userId: string,
  dispatch: Dispatch<AnyAction>
): Promise<{
  token: string;
}> => {
  return new Promise(async (resolve, reject) => {
    if (session) {
      // @ts-ignore
      const sessionId = session?.user?.id; // Get the session ID
      try {
        const response = await fetch("/api/getuser", {
          method: "POST", // Use the appropriate HTTP method (POST, GET, etc.)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId, userId }),
        });
        if (response.ok) {
          const { user, token } = await response.json();
          // setUser(user);
          await dispatch(storeUserAction(user));
          await dispatch(storeToken(token));
          resolve({ token });
        } else {
          console.error("Error fetching user data:", response.statusText);
          reject(response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        reject(error);
      }
    }
  });
};
