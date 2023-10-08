import Image from "next/image";
import { PulseLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="w-screen h-screen bg-white flex flex-col gap-6 items-center justify-center">
      <Image src="/assets/logo.png" alt="logo " width={300} height={300} priority />
      <h1 className="italic text-xl">Getting things ready...</h1>
      <PulseLoader color="white" />
    </div>
  );
}
