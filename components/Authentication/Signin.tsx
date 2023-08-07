"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { SignIn } from "../Action/Action";
import GoogleSignIn from "../Google/Google";
import { TSignInInputs } from "@/types/types";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "../Alert/Alert";
import Link from "next/link";

interface Props {
  loading: boolean;
}

export default function SignInComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignInInputs>();

  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FieldValues> = async ({ email, password }) => {
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setLoading(false);
      return setError(res.error);
    }
    router.replace("/chat");
  };

  return (
    <div className="relative max-w-[507px] max-h-[697px] w-[26vw] min-w-[350px] h-[65vh] min-h-[500px] rounded-2xl bg-white">
      <div className="z-20 absolute bg-Smask bg-cover w-full h-full rounded-2xl">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-20 absolute flex gap-3 items-center justify-center flex-col w-full h-full rounded-2xl px-8 text-green"
      >
        {error && (
          <div className="mb-3">
            <Alert value={error} />
          </div>
        )}

        {/* register your input into the hook by invoking the "register" function */}
        <label className="w-full flex flex-col">
          Email
          <input
            className="rounded-md p-[9px] border-green border-solid border-[1px] focus:outline-none"
            {...register("email", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.email && (
            <span className="text-[red] text-[12px]">
              Please enter your email
            </span>
          )}
        </label>

        {/* include validation with required or other standard HTML validation rules */}

        <label className="w-full flex flex-col">
          Password
          <input
            type="password"
            className="rounded-md p-[9px] border-green border-solid border-[1px] focus:outline-none"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-[red] text-[12px]">
              Please enter your Password
            </span>
          )}
        </label>

        <p className="text-[12px]">
          Need help sigining in?{" "}
          <strong className="text-[12px]">Click here</strong>
        </p>

        <SignIn loading={loading} text="Sign in" />
        <GoogleSignIn text="Continue with Google instead" />

        <p className="text-[12px]">
          New to Heyo?{" "}
          <strong className="text-[12px]">
            <Link href={"/auth/signup"}>Sign in</Link>
          </strong>
        </p>
      </form>
    </div>
  );
}
