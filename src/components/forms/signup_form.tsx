import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Signup } from "@/types/auth.types";
import { SignUpSchema } from "@/schemas/auth.schemas";
import { createUserAccount } from "@/lib/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormSubmissionError from "../shared/form.submission.error";

const SignupForm = () => {
  const router = useRouter();
  const [signupError, setSignupError] = useState<string | null>(null);
  const form = useForm<Signup>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const userSignup: SubmitHandler<Signup> = async (formData: Signup) => {
    setSignupError(null);
    const result = await createUserAccount(formData);

    if (result?.error) {
      setSignupError(result.error);
    }

    if (result?.success) {
      toast.success(result?.success);
      router.push("/");
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(userSignup)} className="space-y-4 p-12">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-neutral-900 text-3xl font-medium text-center">
            Create Account
          </h2>
          <p className="text-base font-light text-neutral-900">
            or use your email for registration
          </p>

          <FormSubmissionError errorMessage={signupError} />
        </div>
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
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                {errors.username ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                {errors.email ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isSubmitting}
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Phone"
                    {...field}
                  />
                </FormControl>
                {errors.phone ? <FormMessage /> : <></>}
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
                    disabled={isSubmitting}
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
        <div className="flex flex-col justify-center space-y-4 items-center">
          <Button
            disabled={isSubmitting}
            className="rounded-full uppercase font-semibold  text-base border-none bg-red-600 hover:bg-red-600"
            type="submit"
          >
            {isSubmitting ? "Creatting Account" : "Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
