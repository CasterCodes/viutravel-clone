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

const ForgotPasswordForm = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <form onSubmit={() => null} className="space-y-4 ">
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
                <FormMessage />
              </FormItem>
            </>
          )}
        />
        <div className="">
          <Button
            variant={"outline"}
            className="rounded-md border font-light border-blue-600 capitalize  text-base  bg-transparent text-blue-600 hover:bg-blue-600 hover:text-white"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
