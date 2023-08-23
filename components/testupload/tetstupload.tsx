import { RootState } from "@/store/userStore";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useS3Upload } from "@/utils/useS3upload";
import { error } from "console";

export default function TestUpload() {
  const [file, setFile] = useState<File>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<string>();

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    e.target.files && setFile(e.target.files[0]);
  };
  const { _id: id } = useSelector((state: RootState) => state.user);

  const handleUpload = async () => {
    if (!file) return;
    try {
      const result = await useS3Upload(file);
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
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <p>Please select a file to upload</p>
      <input type="file" onChange={(e) => selectFile(e)} />
      {file && (
        <>
          <p>Selected file: {file.name}</p>

          <button
            onClick={handleUpload}
            className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
          >
            Upload a File!
          </button>
        </>
      )}
      {uploadingStatus && <p>{uploadingStatus}</p>}
      {uploadedFile && <img src={uploadedFile} />}
    </div>
  );
}
