import User from "@/models/user";
import dbConnect from "@/utils/database";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  region: "eu-central-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "24mb", // Set desired value here
    },
  },
};

export const GET = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { name, type, sessionId } = await req.json;

    const fileParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
      ACL: "public-read",
    };
    const url = await s3.getSignedUrlPromise("putObject", fileParams);
    // console.log(url)
    return new Response(JSON.stringify({ url }), { status: 200 });


    // here we append the user image url to our db
    if (url) {
      await dbConnect();
      const user = await User.findOneAndUpdate(
        { _id: sessionId },
        { profileImage: url }, // Update the "profileImage" field
        { new: true } // Return the updated document
      );

      if (user) {
        return new Response(JSON.stringify({ user, url }), { status: 200 });
      } else {
        return new Response("User not found", { status: 404 });
      }
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("internal server error", { status: 500 });
  }
};
