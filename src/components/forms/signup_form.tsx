import React from "react";
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

const SignupForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form onSubmit={() => null} className="space-y-4 p-12">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-neutral-900 text-3xl font-medium text-center">
            Create Account
          </h2>
          <p className="text-base font-light text-neutral-900">
            or use your email for registration
          </p>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Name"
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
          name="email"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Email"
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
          name="phone"
          render={({ field }) => (
            <>
              <FormItem>
                <FormControl>
                  <Input
                    className="p-6 rounded-sm bg-zinc-200 text-base"
                    placeholder="Email"
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
        <div className="flex flex-col justify-center space-y-4 items-center">
          <Button
            className="rounded-full uppercase font-semibold  text-base border-none bg-red-600 hover:bg-red-600"
            type="submit"
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignupForm;
