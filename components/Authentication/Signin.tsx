"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { SignIn } from "../Action/Action";
import GoogleSignIn from "../Google/Google";
import { TSignInInputs } from "@/types/types";

export default function SignInComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TSignInInputs>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  // console.log(watch("email"));
  // console.log(watch("password"));

  return (
    <div className="relative max-w-[507px] max-h-[697px] w-[26vw] min-w-[350px] h-[65vh] min-h-[500px] rounded-2xl bg-white">
      <div className="z-20 absolute bg-Smask bg-cover w-full h-full rounded-2xl">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="z-20 absolute flex gap-3 items-center justify-center flex-col w-full h-full rounded-2xl px-8 text-green"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <label className="w-full flex flex-col">
          Email
          <input
            className="rounded-md p-3 border-green border-solid border-[1px] focus:outline-none"
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
            className="rounded-md p-3 border-green border-solid border-[1px] focus:outline-none"
            {...register("password", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.password && (
            <span className="text-[red] text-[12px]">
              Please enter your password
            </span>
          )}
        </label>

        <p className="text-[12px]">
          Need help sigining in?{" "}
          <strong className="text-[12px]">Click here</strong>
        </p>

        <SignIn text="Sign in" />
        <GoogleSignIn text="Continue with Google instead" />

        <p className="text-[12px]">
          New to Heyo? <strong className="text-[12px]">Sign Up</strong>
        </p>
      </form>
    </div>
  );
}
