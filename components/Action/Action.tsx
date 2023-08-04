import { IButtonProps } from "@/types/types";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export function SignIn({ text, loading }: IButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      style={{ opacity: loading ? 0.5 : 1 }}
      className="text-white text-[14px] h-[42px] w-full max-w-[400px] rounded-lg bg-green"
    >
      {loading ? <PulseLoader /> : text}
    </button>
  );
}

export function SignUp({ text }: IButtonProps) {
  return (
    <button className="text-white text-[18px] h-[52px] w-full max-w-[400px] rounded-lg bg-green">
      {text}
    </button>
  );
}
