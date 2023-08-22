import { ChangeEvent } from "react";

export default function TestUpload() {
  const selectFile = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };
  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <div>please select a file to upload</div>
      <input type="file" onChange={(e) => selectFile(e)} />
    </div>
  );
}
