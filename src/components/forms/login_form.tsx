"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import ForgotPasswordForm from "./forgot_password_form";
import z from "zod";
import ThirdLogo from "../../../public/third-logo.svg";
import Image from "next/image";

const LoginFormSchema = z.object({
  email: z.string().email(),
});

const LoginForm = () => {
  const [forgotPasswordActive, setForgotPasswordActive] =
    useState<boolean>(false);

  const form = useForm();
  return (
    <Form {...form}>
      <div className="px-12 pt-12 flex justify-center items-center">
        <Image
          src={ThirdLogo}
          alt="ViuRoam third logo"
          height={180}
          width={180}
        />
      </div>
      <form onSubmit={() => null} className="space-y-4 p-12">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Email address"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="space-y-4">
          <div className="flex flex-col justify-center items-center">
            <span
              onClick={() => setForgotPasswordActive((prev) => !prev)}
              role="button"
              className="text-neutral-700 text-center inline-block cursor-pointer font-medium text-sm hover:text-red-600"
            >
              Forgot password ?
            </span>
          </div>

          {forgotPasswordActive ? <ForgotPasswordForm /> : <></>}

          <div className="flex flex-col justify-center items-center">
            <Button
              className="rounded-full uppercase font-semibold  text-base border-none bg-red-600 hover:bg-red-600"
              type="submit"
            >
              Signin
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
