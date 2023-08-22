import { RootState } from "@/store/userStore";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import axios, { Axios } from "axios";

export default function TestUpload() {
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<string>();
  const BUCKET_URL = "https://heyochat.s3.eu-noth-1.amazonaws.com/";

  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);

    e.target.files && setFile(e.target.files[0]);
  };
  const { _id: id } = useSelector((state: RootState) => state.user);

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    if (file) {
      // const response = await fetch("/api/s3/profileimage", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": file.type,
      //     "Access-Control-Allow-Origin": "*",
      //   },
      //   body: JSON.stringify({
      //     sessionId: id,
      //     name: file.name,
      //     type: file.type,
      //   }),
      // });
      // const responseData = await response.json();
      // console.log(responseData);

      // const url = responseData.url;
      // const data = await fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-type": file.type,
      //     "Access-Control-Allow-Origin": "*",
      //   },
      //   body: file,
      // });

      setUploadingStatus("Uploading the file to AWS S3");

      let { data } = await axios.get("/api/s3/profileimage", {
        //@ts-ignore
        name: file.name,
        type: file.type,
        sessionId: id,
      });

      console.log(data);

      const url = data.url;
      let { data: newData } = await axios.put(url, file, {
        headers: {
          "Content-type": file.type,
          "Access-Control-Allow-Origin": "*",
        },
      });

      setUploadedFile(BUCKET_URL + file.name);
      setFile(null);
    }

    // file && setUploadedFile(BUCKET_URL + file.name);
    // setFile(null);
  };

  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <p>Please select a file to upload</p>
      <input type="file" onChange={(e) => selectFile(e)} />
      {file && (
        <>
          <p>Selected file: {file.name}</p>

          <button
            onClick={uploadFile}
            className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
          >
            Upload a File!
          </button>
        </>
      )}
      {uploadingStatus && <p>{uploadingStatus}</p>}
      {uploadedFile && <img src={uploadedFile} />}{" "}
    </div>
  );
}
