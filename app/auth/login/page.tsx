import SignInComponent from "@/components/Authentication/Signin";
import Image from "next/image";

export default function Login() {
  return (
    <main className="bg-[#0000000F] z-0 relative overflow-hidden">
      <div className="bg-appTexture z-10 bg-cover absolute w-full h-full"></div>

      <div className="w-full mt-[35px] bg-transparent z-20 absolute flex items-center justify-center ">
        <Image
          src="/assets/logo.png"
          alt="Heyo Logo"
          width={226}
          height={84}
          layout="fixed"
        />
      </div>
      <div className="hidden md:block z-20 bg-contain bg-no-repeat absolute left-[-20px] bottom-[-20px] max-w-[774px] w-[45vw] h-[auto]">
        <img
          src="/assets/left-svg.png"
          alt="Left SVG"
          className="w-full h-full"
        />
      </div>
      <img
        src="/assets/sureboy.png"
        className="hidden md:block z-20 absolute max-w-[450px] max-h-[884px] w-[22%] h-[auto] bottom-0 left-[-15px]"
        alt=""
      />
      <div className="z-20 absolute left-[50%] translate-x-[-50%] translate-y-[30%] ">
        <SignInComponent />
      </div>
    </main>
  );
}
