import { IChatHeaderProps } from "@/types/types";
import Image from "next/image";

export default function CurrentUser({
  username,
  profileImage,
  sendOpenModal,
}: IChatHeaderProps) {
  const openModal = () => {
    sendOpenModal && sendOpenModal(true);
  };

  return (
    <button
      onClick={openModal}
      className="flex items-center justify-start gap-[22px] text-[22px] w-full max-w-[635px]"
    >
      <Image
        src={profileImage}
        alt="Profile Image"
        width={72}
        height={72}
        className="rounded-full"
      />
      <h1 className="text-black font-[600]">@{username}</h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        id="IconChangeColor"
        height="20"
        width="20"
      >
        <rect width="256" height="256" fill="none"></rect>
        <polyline
          points="208 96 128 176 48 96"
          fill="none"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="12"
        ></polyline>
      </svg>
    </button>
  );
}
