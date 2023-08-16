import Image from "next/image";
import ChatTextFeild from "../ChatTextFeild/ChatTextFeild";

export default function ChatArea() {
  return (
    <div className="h-full relative">
      <Image
        src="/assets/mask.png"
        alt="mask"
        width={0}
        height={0}
        sizes="100vw"
        className="w-full h-full object-cover absolute z-0"
      />

      <div className=" w-full h-auto absolute px-2 bottom-3">
        <ChatTextFeild />
      </div>
    </div>
  );
}
