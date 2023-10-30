import { Session } from "next-auth";
import { storeToken, storeUserAction, userState } from "./userSlice";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

export const getUser = async (
  session: Session,
  dispatch: Dispatch<AnyAction>
): Promise<{
  token: string;
  user: userState;
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
          body: JSON.stringify({ sessionId }),
        });
        if (response.ok) {
          const { user, token } = await response.json();
          // setUser(user);
          await dispatch(storeUserAction(user));
          await dispatch(storeToken(token));
          resolve({ token, user });
        } else {
          toast.error("Error fetching user data");
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
