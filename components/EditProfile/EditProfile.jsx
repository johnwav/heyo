import { signOut } from "next-auth/react";
import Image from "next/image";

export default function EditProfile({about, username}) {
  const style = {
    width: "645px",
    height: "512px",
    display: "grid",
    gridTemplateColumns: "0.5fr 1fr",
  };

  const handleSignOut = async () => {
    await signOut();
  };
  
  return (
    <div style={style} className="rounded-2xl overflow-hidden">
      <div className="bg-green p-[24px] flex flex-col justify-between text-white">
        <div className="flex flex-col items-start ">
          <button className="text-[16px]">Profile</button>
          <button className="text-[16px]">Settings</button>
        </div>
        <button onClick={handleSignOut} className="flex items-center w-full pl-[27px] text-[16px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="mr-[20px] fill-white"
          >
            <path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z" />
          </svg>
          Logout
        </button>
      </div>
      <div className="bg-background p-3 flex flex-col items-start pl-[44px] pt-[40px]">
        <Image
          src="https://sp-images.summitpost.org/1038746.jpg?auto=format&fit=max&ixlib=php-2.1.1&q=35&w=1024&s=394ed8f3158db7ef966a1b238d293e8b"
          alt="Profile Image"
          width={124}
          height={124}
          className="rounded-full"
        />
        <div className="mt-[28px] flex flex-col gap-[12px] w-full">
          <button className="flex items-center justify-between w-full">
            <h1 className="font-bold text-[25px]">@{username}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="grey"
              className="mr-[40px]"
            >
              <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
            </svg>
          </button>
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[16px]">About</label>
            <button className="flex  items-center justify-between w-full">
              <strong>{about} </strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className="mr-[40px]"
                fill="grey"
              >
                <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label>Phone Number</label>
            <strong>+234 804 2837 283</strong>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label>Email Address</label>
            <strong>masontyrell97@gmail.com</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

