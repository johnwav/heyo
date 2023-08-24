"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
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
  const [file, setFile] = useState<File>();
  const style = {
    width: "645px",
    height: "512px",
    display: "grid",
    gridTemplateColumns: "0.5fr 1fr",
  };
  const { _id: sessionId } = useSelector((state: RootState) => state.user);

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    e.target.files && setFile(e.target.files[0]);
  };
  const { _id: id, profileImage } = useSelector(
    (state: RootState) => state.user
  );

  const handleUpload = async () => {
    if (!file) return;
    try {
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
        setUpload(false)
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

  return (
    <div style={style} className="rounded-2xl overflow-hidden">
      <div className="bg-green p-[24px] flex flex-col justify-between text-white">
        <div className="flex flex-col items-start ">
          <button className="text-[16px]">Profile</button>
          <button className="text-[16px]">Settings</button>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center w-full pl-[27px] text-[16px]"
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
        <button onClick={() => setUpload((prev) => !prev)}>
          <Image
            src={profileImage}
            alt="Profile Image"
            width={124}
            height={124}
            className="rounded-full"
          />
        </button>
        {upload && (
            <>
              <input type="file" onChange={(e) => selectFile(e)} />
              <button onClick={handleUpload}>Upload</button>
            </>
          )}

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
              {isUpdateAboutOpen ? (
                <input
                  onChange={(e) => setAboutText(e.target.value)}
                  type="text"
                  value={aboutText}
                  onKeyDown={updateAbout}
                />
              ) : (
                <strong onClick={() => setIsUpdateAboutOpen(true)}>
                  {about}
                </strong>
              )}
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
            <strong>{email}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
