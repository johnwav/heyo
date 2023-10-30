import { IChatCardProps } from "@/types/types";
import Image from "next/image";

export default function ChatCard({
  firstName,
  lastName,
  typing,
  lastMessage,
  time,
  profileImage,
  id
}: IChatCardProps) {
  const maxMessageLength = 70; // Adjust the maximum length of the message here

  // Function to truncate the message
  const truncateMessage = (message: string) => {
    if (message.length > maxMessageLength) {
      return message.slice(0, maxMessageLength) + "...";
    }
    return message;
  };

  return (
    <div className="flex hover:scale-105 items-center justify-between bg-white border-b-2 border-b-lightgrey w-full h-[96px] rounded-2xl">
      <div className="user flex gap-2 ">
        <Image
          src="https://sp-images.summitpost.org/1038746.jpg?auto=format&fit=max&ixlib=php-2.1.1&q=35&w=1024&s=394ed8f3158db7ef966a1b238d293e8b"
          width={72}
          height={72}
          alt="Profile Image"
          className="rounded-full"
        />
        <div className="flex flex-col gap-1 items-start justify-center ">
          <h1 className="text-[18px] text-black font-[600]">
            {firstName} {lastName}
          </h1>

          {typing ? (
            <p className="text-[14px] text-lightgrey italic ">Typing...</p>
          ) : (
            <p className="text-[14px] text-lightgrey ">{truncateMessage(lastMessage)}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 items-end">
        <span className="text-lightgrey text-[12px]">{time}</span>

        <div className="w-[28px] h-[28px] text-[12px] text-white flex justify-center items-center bg-green rounded-full">
          2
        </div>
      </div>
    </div>
  );
}
