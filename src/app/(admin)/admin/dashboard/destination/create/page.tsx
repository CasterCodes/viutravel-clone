"use client";

import FormSubmissionError from "@/components/shared/form.submission.error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DestinationSchema } from "@/schemas/destination.schema";
import { Textarea } from "@/components/ui/textarea";

const DestinationCreatePage = () => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(DestinationSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
      image: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleDestinationCreation = async (data: any) => {};
  return (
    <div className="md:w-3/4">
      <h2 className="text-3xl font-semibold leading-snug capitalize">
        Create new destination
      </h2>
      <Form {...form}>
        <div className="pt-12 flex flex-col justify-center w-full items-center">
          <FormSubmissionError errorMessage={null} />
        </div>
        <form
          onSubmit={handleSubmit(handleDestinationCreation)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-6 rounded-sm text-base"
                    placeholder=""
                    {...field}
                  />
                </FormControl>

                {errors.name ? <FormMessage /> : <></>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="text"
                      className="p-6 rounded-smtext-base"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  {errors.location ? <FormMessage /> : <></>}
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <>
                <FormItem className="mt-9">
                  <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="resize-none p-4 rounded-sm  text-base"
                      {...field}
                    />
                  </FormControl>
                  {errors.description ? <FormMessage /> : <></>}
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                    Image
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      type="file"
                      className="p-6 rounded-sm  text-base"
                      placeholder=""
                      {...field}
                    />
                  </FormControl>

                  {errors.location ? <FormMessage /> : <></>}
                </FormItem>
              </>
            )}
          />

          <Button
            disabled={isSubmitting}
            className="rounded-sm uppercase mt-4 font-semibold  text-base border-none bg-neutral-900 hover:bg-neutral-800"
            type="submit"
          >
            {isSubmitting ? "Authenticating" : " Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DestinationCreatePage;
