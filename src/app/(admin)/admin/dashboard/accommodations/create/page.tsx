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
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "@/components/ui/textarea";
import { Destination } from "@/types/destination.types";
import { createDestination } from "@/lib/actions/destination.action";
import FileUpload from "@/components/shared/fileUpload";
import { AccommodationSchema } from "@/schemas/accommodation.schema";
import { Accommodation } from "@/types/accommodation.type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useAppState } from "@/lib/providers/app-state.provider";
import MultipleSelector, { Option } from "@/components/shared/multiselect";
import { createAccommodation } from "@/lib/actions/accommodation.action";
import toast from "react-hot-toast";

const ACCOMMODATION_TYPES = [
  "Hotel",
  "Resort",
  "Villa",
  "Apartment",
  "Lodge",
  "GuestHouse",
  "Hostel",
  "Tented camp",
  "Cottage",
  "ApartHotel",
];

const OPTIONS: Option[] = [
  {
    value: "Wi-Fi",
    label: "Wi-Fi",
  },
  {
    value: "Bar",
    label: "Bar",
  },
  {
    value: "Restaurant",
    label: "Restaurant",
  },
  {
    value: "Laundry",
    label: "Laundry",
  },
  {
    value: "Parking",
    label: "Parking",
  },
  {
    value: "Room Service",
    label: "Room Service",
  },
  {
    value: "Guest Reception",
    label: "Guest Reception",
  },
];

const CreateAccommondationPage = () => {
  const [uploadUrls, setUploadUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { destinations } = useAppState();

  const form = useForm<Accommodation>({
    mode: "onChange",
    resolver: zodResolver(AccommodationSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      destinationId: "",
      propertyType: "",
      amenities: [],
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleAccommodationCreation: SubmitHandler<Accommodation> = async (
    data: Accommodation
  ) => {
    let accommodation: Accommodation & { imageUrls: string[] } = {
      ...data,
      imageUrls: [],
    };

    if (uploadUrls.length < 0) {
      setError("Please upload accommodation images");
      return;
    }

    accommodation.imageUrls = uploadUrls;

    const result = await createAccommodation(accommodation);

    if (result.error) {
      toast.success(result.message);
    }
  };

  return (
    <div className="md:w-3/4">
      <h2 className="text-3xl font-semibold leading-snug capitalize">
        Create new accomondation
      </h2>
      <Form {...form}>
        <div className="pt-12 flex flex-col justify-center w-full items-center">
          <FormSubmissionError errorMessage={error} />
        </div>
        <form
          onSubmit={handleSubmit(handleAccommodationCreation)}
          className="space-y-8"
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
            name="address"
            render={({ field }) => (
              <>
                <FormItem className="mt-9">
                  <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Address"
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

          {destinations && destinations.loading ? (
            <div className="flex flex-col space-y-3">
              <span className="font-bold uppercase leading-snug text-neutral-800/90">
                Destination
              </span>
              <Button className="bg-white border-dotted p-6 w-full  border-pink-400 border-2 text-neutral-800 hover:bg-white">
                Loading destinations
              </Button>
            </div>
          ) : !destinations.loading &&
            destinations &&
            destinations.data?.length != 0 ? (
            <FormField
              control={form.control}
              name="destinationId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                    Destination
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between p-6 rounded-sm bg-zinc-100 text-base",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? destinations.data?.find(
                                (destination) => destination.id === field.value
                              )?.name
                            : "Select destination"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] h-[250px] px-0 pt-0 pb-3">
                      <Command>
                        <CommandInput placeholder="Search destination..." />
                        <CommandEmpty>No destination found.</CommandEmpty>
                        <CommandGroup>
                          {destinations.data?.map((destination) => (
                            <CommandItem
                              className="px-0 py-2"
                              value={destination.id}
                              key={destination.id}
                              onSelect={() => {
                                form.setValue("destinationId", destination.id);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  destination.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {destination.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <Button
              disabled={true}
              className="bg-white border-dotted p-3 w-full  border-pink-400 border-2 text-neutral-800"
            >
              No available destinations
            </Button>
          )}
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                    Amenities
                  </FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={OPTIONS}
                      placeholder="Select available amenties..."
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  {errors.amenities ? <FormMessage /> : <></>}
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Accommodation Type
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between p-6 rounded-sm bg-zinc-100 text-base",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? ACCOMMODATION_TYPES.find(
                              (accommodation_type) =>
                                accommodation_type === field.value
                            )
                          : "Select Accommodation type"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] h-[250px] px-0 pt-0 pb-3">
                    <Command>
                      <CommandInput placeholder="Search destination..." />
                      <CommandEmpty>No destination found.</CommandEmpty>
                      <CommandGroup>
                        {ACCOMMODATION_TYPES.map((accommodation_type) => (
                          <CommandItem
                            className="px-0 py-2"
                            value={accommodation_type}
                            key={accommodation_type}
                            onSelect={() => {
                              form.setValue("propertyType", accommodation_type);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                accommodation_type === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {accommodation_type}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FileUpload
            uploadUrls={uploadUrls}
            setUploadUrls={setUploadUrls}
            error={error}
            title="Accommodation Images"
            setError={setError}
            multiple={true}
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

export default CreateAccommondationPage;
