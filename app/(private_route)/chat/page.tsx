"use client";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import ChatTextFeild from "@/components/ChatTextFeild/ChatTextFeild";
import CurrentUser from "@/components/CurrentUser/CurrentUser";
import { signOut } from "next-auth/react";
import SearchChats from "../../../components/SearchChats/SearchChats";
import ChatCard from "@/components/ChatCard/ChatCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Chat() {
  const { data: session } = useSession();
  const [username, setUsername] = useState("")

  const handleSignOut = async () => {
    await signOut();
  };
  // console.log(session?.user.id)

  const getuser = async () => {
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
          setUsername(user.username);
          // console.log(user);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
   getuser();
  });


  // console.log(session?.user);

  const divStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    padding: "1.5em",
    gap: "1.5em",
  };

  return (
    <div style={divStyle}>
      <div className="flex flex-col gap-[1.5em]">
        <div className="">
          <CurrentUser firstName={username} lastName="Tyrell" profileImage="" />
        </div>
        <div className="">
          <SearchChats />
        </div>
        <div className="scroll w-full flex-grow bg-white rounded-[30px] h-[530px] max-h-[750px] p-[1.5em] overflow-scroll ">
          <ChatCard
            firstName="Christiana"
            lastName="Beth"
            status="online"
            profileImage=""
            lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
            time="08:05 PM"
            typing={false}
          />
          <ChatCard
            firstName="Christiana"
            lastName="Beth"
            status="online"
            profileImage=""
            lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
            time="08:05 PM"
            typing={false}
          />
          <ChatCard
            firstName="Christiana"
            lastName="Beth"
            status="online"
            profileImage=""
            lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
            time="08:05 PM"
            typing={false}
          />{" "}
          <ChatCard
            firstName="Christiana"
            lastName="Beth"
            status="online"
            profileImage=""
            lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
            time="08:05 PM"
            typing={false}
          />{" "}
          <ChatCard
            firstName="Christiana"
            lastName="Beth"
            status="online"
            profileImage=""
            lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
            time="08:05 PM"
            typing={false}
          />
          <ChatCard
            firstName="Christiana"
            lastName="Beth"
            status="online"
            profileImage=""
            lastMessage="Lets go to the cinema. i heard they have  sdskdnskdnsdknksdskjdnskdnskdn"
            time="08:05 PM"
            typing={false}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <ChatHeader
          firstName="Christiana"
          lastName="Beth"
          status="online"
          profileImage=""
        />
        <ChatTextFeild />
      </div>
      <button onClick={handleSignOut}>signOut</button>
    </div>
  );
}
