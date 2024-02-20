"use client";
import { LoginFormSchema } from "@/schemas/auth.schemas";
import { Login } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ThirdLogo from "../../../public/third-logo.svg";
import FormSubmissionError from "../shared/form.submission.error";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import ForgotPasswordForm from "./forgot_password_form";
import { verifyLoginCredentials } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [forgotPasswordActive, setForgotPasswordActive] =
    useState<boolean>(false);

  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<Login>({
    mode: "onChange",
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleUserLogin = async (data: Login) => {
    setLoginError(null);
    try {
      const result = await verifyLoginCredentials(data);

      if (!result?.success) {
        setLoginError(result.message);
        return;
      }

      await signIn("credentials", {
        username: data.username,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error: any) {
      setLoginError(
        error?.message ? error?.message : "Error logging user in. Try again"
      );
    }
  };
  return (
    <Form {...form}>
      <div className="px-12 pt-12 flex flex-col justify-center w-full items-center">
        <Image
          src={ThirdLogo}
          alt="ViuRoam third logo"
          height={180}
          width={180}
        />
        <FormSubmissionError errorMessage={loginError} />
      </div>
      <form
        onSubmit={handleSubmit(handleUserLogin)}
        className="space-y-3 mt-[-24] p-12"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Email address"
                    {...field}
                  />
                </FormControl>

                {errors.password ? <FormMessage /> : <></>}
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
                    disabled={isSubmitting}
                    type="password"
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>

                {errors.password ? <FormMessage /> : <></>}
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
              disabled={isSubmitting}
              className="rounded-full uppercase font-semibold  text-base border-none bg-red-600 hover:bg-red-600"
              type="submit"
            >
              {isSubmitting ? "Authenticating" : " Signin"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
