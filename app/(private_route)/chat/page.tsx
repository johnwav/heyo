"use client";
import ChatHeader from "@/components/ChatHeader/ChatHeader";
import ChatTextFeild from "@/components/ChatTextFeild/ChatTextFeild";
import CurrentUser from "@/components/CurrentUser/CurrentUser";
import { signOut } from "next-auth/react";
import SearchChats from "../../../components/SearchChats/SearchChats";
import ChatCard from "@/components/ChatCard/ChatCard";

export default function Chat() {
  const handleSignOut = async () => {
    await signOut();
  };

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
          <CurrentUser firstName="Mason" lastName="Tyrell" profileImage="" />
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
