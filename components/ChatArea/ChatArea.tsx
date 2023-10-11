import Image from "next/image";
import ChatTextFeild from "../ChatTextFeild/ChatTextFeild";
import Message from "../Message/Message";
import { RootState } from "@/store/userStore";
import { useSelector } from "react-redux";

export default function ChatArea() {
  const messages = useSelector((state : RootState) => (state.messages))

  return (
    <div className="h-full relative">
      <div className="absolute z-[900] w-full h-auto py-[32px] px-[40px] flex flex-col gap-[20px]">
        {messages.map((message, index) => (
          //@ts-ignore
          <Message key={index} type={message.sender} message={message.content} />
        ))}

        <Message type="them" message="Hey there! What's up?" />
        <Message
          type="you"
          message="Not much, just hanging out at home. How about you?"
        />
      </div>
      <Image
        src="/assets/mask.png"
        alt="mask"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full object-cover absolute z-[0]"
      />
      <div className=" w-full h-auto absolute px-2 bottom-3">
        <ChatTextFeild />
      </div>
    </div>
  );
}
