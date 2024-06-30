"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import PasswordInput from "../utils/PasswordInput";
import { Button } from "../ui/button";
import Link from "next/link";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required!")
    .matches(/^((\S+)@(\S+)\.(\S+))$/, {
      message: "Please enter a valid email address.",
      excludeEmptyString: false,
    }),
  password: Yup.string().required("Password is required!"),
});

const SignInForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitSignUp = (data) => {
    //
  };

  return (
    <div className="SignUpPage h-[calc(100vh_-_80px)] flex flex-col justify-center items-center">
      <div className="max-w-[500px] w-full py-3 md:py-6 bg-[#E7E4D6]  rounded-2xl shadow-md md:mx-0">
        <form
          onSubmit={handleSubmit(onSubmitSignUp)}
          className="flex flex-col gap-4 px-3 md:px-6"
        >
          <h2 className="font-bold text-xl bg-inherit mx-auto">Sign In</h2>

          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <Input
                requiredField={true}
                placeholder=""
                className="rounded-xl"
                type="text"
                label="Email"
                error={errors.email?.message}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                requiredField
                className="rounded-xl"
                label="Password"
                error={errors.password?.message}
                {...field}
              />
            )}
          />

          <Button
            text="Sign up"
            loading={false}
            disabled={false}
            className="bg-busanViolet text-white"
          />
        </form>

        <hr className="h-[2px] my-4 bg-[#bcbab3]" />
        
        <div className=" flex gap-1 bg-inherit text-sm px-3 md:px-6">
          <p className="bg-inherit">New here?</p>
          <Link href="sign-up" className="bg-inherit text-busanViolet">
            Sign up.
          </Link>
        </div>
        <div className=" flex gap-1 bg-inherit text-sm px-3 md:px-6 mt-3">
          <p className="bg-inherit">Forgot your password?</p>
          <Link href="forgot-password" className="bg-inherit text-busanViolet">
            Reset here.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
