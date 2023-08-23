import { S3 } from "aws-sdk";
import { error } from "console";

interface Params {
  Bucket: string;
  Key: string;
  Body: File;
}

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_SECRET!,
  region: "eu-north-1",
});

const bucketUrl = "https://heyochatbucket.s3.eu-north-1.amazonaws.com/";

export const useS3Upload = async (file: File) => {
  if (!file) return;
  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: file.name,
    Body: file,
  };

  console.log(params);
  let url = <string | null>null;
  let error = <Error | null | unknown>null;

  try {
    //@ts-ignore
    const upload = s3.upload(params);
    await upload.promise();
    console.log("file uploaded sucessfully");
    url = bucketUrl + file.name;

    return { url, error };
  } catch (e) {
    console.log("error uploading file", e);
    error = e;
    return { url, error };
  }
};
