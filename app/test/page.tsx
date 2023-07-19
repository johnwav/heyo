import { SignIn } from "@/components/Action/Action";
import { GoogleSignIn } from "@/components/Google/Google";

export default function Test() {
  return (
    <div className="max-w-[1440px] m-auto flex flex-col gap-8 items-center justify-center border p-2 bg-slate-300">
      <SignIn text="Sign in" />
      <GoogleSignIn text="Continue with Google Instead" />
    </div>
  );
}
