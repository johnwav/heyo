"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserAboutAction,
  updateUserProfileImageAction,
} from "@/features/user/userSlice";
import { RootState } from "@/store/userStore";
import { S3Upload } from "@/utils/useS3upload";

interface Props {
  about: string;
  username: string;
  id: string;
  email: string;
}

export default function EditProfile({ about, username, email }: Props) {
  const dispatch = useDispatch();
  const [isUpdateAboutOpen, setIsUpdateAboutOpen] = useState(false);
  const [aboutText, setAboutText] = useState(about);
  const [uploadedFile, setUploadedFile] = useState<string>();
  const [upload, setUpload] = useState(false);
  const [index, setIndex] = useState(0);
  const [file, setFile] = useState<File | null>();
  const style = {
    width: "645px",
    height: "512px",
    display: "grid",
    gridTemplateColumns: "0.5fr 1fr",
  };
  const { _id: sessionId } = useSelector((state: RootState) => state.user);

  const uploadstyle = {
    zIndex: index,
  };

  const selectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files);
      setFile(e.target.files[0]);
    }
  };
  const { _id: id, profileImage } = useSelector(
    (state: RootState) => state.user
  );

  const handleUpload = async () => {
    if (!file) return;
    try {
      console.log("uploading in handleUpload func");
      const result = await S3Upload(file);
      if (result?.error) return;
      if (result?.url) {
        console.log("file uploaded");
        const sessionId = id;
        const url = result.url;
        const data = await fetch("/api/s3/profileimage", {
          method: "POST", // Use the appropriate HTTP method (POST, GET, etc.)
          headers: {
            "Content-Type": "application/json",
          },
          //@ts-ignore
          body: JSON.stringify({ sessionId, url }),
        });
        const response = await data.json();
        console.log(response);
        setUploadedFile(result.url);
        await dispatch(updateUserProfileImageAction(result.url));
        setUpload(false);
        setFile(null);
      }
    } catch (error) {
      return error;
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  //@ts-ignore
  const updateAbout = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newAbout = e.target.value;
      dispatch(updateUserAboutAction(e.target.value));
      try {
        //api call with id
        const response = await fetch("/api/updateAbout", {
          method: "POST", // Use the appropriate HTTP method (POST, GET, etc.)
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId, newAbout }),
        });
        setIsUpdateAboutOpen(false);
        console.log("res from updating about", response);
      } catch (error) {
        console.error("failed to update about", error);
      } finally {
        setIsUpdateAboutOpen(false);
      }
    }
  };

  useEffect(() => {
    if (file) {
      console.log("uploadind files");
      handleUpload();
    }
  }, [file]);

  return (
    <div style={style} className="rounded-2xl overflow-hidden">
      <div className="bg-green px-[18px] py-[20px] flex flex-col justify-between text-white">
        <div className="flex flex-col items-start gap-[10px] mt-[80px] ">
          <button className="text-[16px] py-[5px] px-[10px]  outline rounded flex items-center w-full gap-[30px] hover:scale-110">
            <Image width={24} height={24} alt={"user"} src={"/user.png"} />
            Profile
          </button>
          <button
            disabled
            className="text-[16px] py-[5px] px-[10px]  rounded flex items-center w-full gap-[30px] hover:scale-110"
          >
            <Image width={24} height={24} alt={"gears"} src={"/settings.png"} />
            Settings
          </button>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center w-full pl-[27px] text-[16px] hover:scale-110"
        >
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
        <button className="relative" onClick={() => setUpload((prev) => !prev)}>
          <div
            onMouseOver={() => setIndex(2)}
            onMouseLeave={() => setIndex(0)}
            className="w-[124px] h-[124px] absolute z-[1] "
          >
            <Image
              src={profileImage}
              alt="Profile Image"
              width={124}
              height={124}
              className="rounded-full w-[124px] h-[124px]"
            />
          </div>

          <div
            onMouseOver={() => setIndex(2)}
            onMouseLeave={() => setIndex(0)}
            style={uploadstyle}
            className={`absolute w-[124px] h-[124px] rounded-full flex items-center justify-center bg-slate-300 opacity-80 `}
          >
            <p className="absolute">Change Profile Image</p>
            <input
              accept="image/*"
              className="bg-[red] p-[60px] opacity-0 rounded-full"
              type="file"
              onChange={(e) => selectFile(e)}
              accept="image/*"
            />
          </div>
        </button>
        <div className="mt-[158px] flex flex-col gap-[12px] w-full">
          <button className="flex items-center justify-between w-full">
            <h1 className="font-bold text-[25px]">@{username}</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="grey"
              className="mr-[40px] hover:scale-110"
            >
              <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
            </svg>
          </button>
          <div className="flex flex-col gap-[6px] w-full">
            <label className="text-[16px]">About</label>
            <div className="flex  items-center justify-between w-full">
              {isUpdateAboutOpen ? (
                <input
                  onChange={(e) => setAboutText(e.target.value)}
                  type="text"
                  value={aboutText}
                  onKeyDown={updateAbout}
                />
              ) : (
                <strong
                  className="pr-[150px]"
                  onClick={() => setIsUpdateAboutOpen(true)}
                >
                  {about}
                </strong>
              )}
              <button
                className="hover:scale-110"
                onClick={() => setIsUpdateAboutOpen((prev) => !prev)}
              >
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
          </div>
          <div className="flex flex-col gap-[6px]">
            <label>Phone Number</label>
            <strong>+234 804 2837 283</strong>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label>Email Address</label>
            <strong>{email}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
