import { Session } from "next-auth";
import { storeUserAction } from "./userSlice";
import { Dispatch, SetStateAction } from "react";
import { AnyAction } from "@reduxjs/toolkit";
import ZIM from "zego-zim-web";
import { generateToken } from "@/utils/token";

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
        const token = generateToken(user._id, 0)
        var userInfo = { userID: user._id, userName: user.username };
        var zim = ZIM.getInstance();
        zim
          .login(userInfo, token)
          .then(() => {
            // Login successful.
            console.log("zim logged in successfully");
            // setLoading(false);
          })
          .catch((err) => {
            // Login failed.
            console.log("error in zim login");
          });
        console.log("user data stored successfully", user);
        return {zim, user}
      } else {
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
};
