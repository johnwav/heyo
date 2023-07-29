import { IButtonProps } from "@/types/types";


export function SignIn({ text }: IButtonProps) {


  return (
    <button
      type="submit"
      className="text-white text-[14px] h-[42px] w-full max-w-[400px] rounded-lg bg-green"
    >
      {text}
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
