import { IButtonProps } from "@/types/types";
import { PulseLoader } from "react-spinners";

export function SignIn({ text, loading }: IButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      // style={{ opacity: loading ? 0.5 : 1 }}
      className="text-white text-[14px] h-[42px] w-full max-w-[400px] rounded-lg bg-green flex items-center justify-center"
    >
      {loading ? <PulseLoader color="white" /> : text}
    </button>
  );
}

export function SignUp({ text, loading }: IButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      // style={{ opacity: loading ? 0.5 : 1 }}
      className="text-white text-[14px] h-[42px] w-full max-w-[400px] rounded-lg bg-green flex items-center justify-center"
    >
      {loading ? <PulseLoader /> : text}
    </button>
  );
}
