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
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DestinationSchema } from "@/schemas/destination.schema";
import { Textarea } from "@/components/ui/textarea";
import { Destination } from "@/types/destination.types";
import { createDestination } from "@/lib/actions/destination.action";
import FileUpload from "@/components/shared/fileUpload";

const DestinationCreatePage = () => {
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<Destination>({
    mode: "onChange",
    resolver: zodResolver(DestinationSchema),
    defaultValues: {
      name: "",
      location: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleDestinationCreation: SubmitHandler<Destination> = async (
    data: Destination
  ) => {
    let destination: Destination & { image: string } = { ...data, image: "" };

    if (!uploadUrl) {
      setError("Upload destination image");
      return;
    }

    destination.image = uploadUrl;

    await createDestination(destination);
  };
  return (
    <div className="md:w-3/4">
      <h2 className="text-3xl font-semibold leading-snug capitalize">
        Create new destination
      </h2>
      <Form {...form}>
        <div className="pt-12 flex flex-col justify-center w-full items-center">
          <FormSubmissionError errorMessage={error} />
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
          <FileUpload
            uploadUrl={uploadUrl}
            error={error}
            title="Destination Image"
            setError={setError}
            setUploadUrl={setUploadUrl}
          />

          <Button
            disabled={isSubmitting}
            className="rounded-sm mt-12 px-12 py-6 md:w-1/2 uppercase font-semibold  text-base border-none bg-neutral-900 hover:bg-neutral-800"
            type="submit"
          >
            {isSubmitting ? "Creating" : " Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DestinationCreatePage;
