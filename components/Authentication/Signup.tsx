"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { SignIn } from "../Action/Action";
import GoogleSignIn from "../Google/Google";
import { TSignUpInputs } from "@/types/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function SignUpComponent() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<TSignUpInputs>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      setError("password", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }
    const userInfo = {
      email: data.email,
      password: data.password,
      username: data.username,
    };
    console.log(userInfo);
    try {
      const response = await fetch("/api/auth/users", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      const result = await response.json();
      setLoading(false);
      toast.success("Account created successfully")
      router.replace("/auth/login");
      console.log(result);
    } catch (error) {
      toast.error("Error creating account")
      console.log("error creating account", error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(watch("email"));
  // console.log(watch("password"));

  return (
    <div className="relative max-w-[507px] max-h-[897px] w-[26vw] min-w-[350px] h-[65vh] min-h-[570px] rounded-2xl bg-white">
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

        <label className="w-full flex flex-col">
          Username
          <input
            className="rounded-md p-[9px]  border-green border-solid border-[1px] focus:outline-none"
            {...register("username", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.email && (
            <span className="text-[red] text-[12px]">
              Please enter your username
            </span>
          )}
        </label>

        {/* include validation with required or other standard HTML validation rules */}
        <label className="w-full flex flex-col">
          Password
          <input
            type="password"
            className="rounded-md p-[9px]  border-green border-solid border-[1px] focus:outline-none"
            {...register("password", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.password && (
            <span className="text-[red] text-[12px]">
              {errors.password?.message}
            </span>
          )}
        </label>

        <label className="w-full flex flex-col">
          Confirm Password
          <input
            type="password"
            className="rounded-md p-[9px]  border-green border-solid border-[1px] focus:outline-none"
            {...register("confirmPassword", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.password && (
            <span className="text-[red] text-[12px]">
              {errors.confirmPassword?.message}
            </span>
          )}
        </label>

        <SignIn loading={loading} text="Create Account" />
        <GoogleSignIn text="Continue with Google instead" />

        <p className="text-[12px]">
          Have an account? <strong className="text-[12px]"><Link href={"/auth/login"}>Sign in</Link></strong>
        </p>
      </form>
    </div>
  );
}
