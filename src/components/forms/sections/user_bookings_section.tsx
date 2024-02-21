"use client";

import React, { FC } from "react";
import SettingsFormSectionsHeader from "./profile_settings_section_header";
import country from "country-list-js";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UserProfileSettingsSectionProps } from "@/types/profile.types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
const professionalTitles = [
  "Mr",
  "Mrs",
  "Ms",
  "Miss",
  "Dr",
  "Prof",
  "Rev",
  "Sir",
  "Madam",
  "Mx",
];

var country_names = country.names();

const UserBookingSection: FC<UserProfileSettingsSectionProps> = ({
  form,
  isSubmitting,
  errors,
}) => {
  return (
    <div className="shadow-md mb-4">
      <SettingsFormSectionsHeader
        title="For when you book"
        subtitle=" This information is only used to autofill your details and make it
              quicker for you to book. Your details will be stored securely and
              won't be shared publicly."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 p-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4">
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                Title
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="p-4  rounded-sm bg-zinc-100 text-base"
                      placeholder="Select title"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {professionalTitles.map((title) => (
                    <SelectItem key={title} value={title}>
                      {title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                {errors.firstName ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                {errors.lastName ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Phone number (with country code)
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                {errors.phoneNumber ? <FormMessage /> : <></>}
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
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="Email address"
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
          name="address"
          render={({ field }) => (
            <>
              <FormItem className="mt-9">
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Address
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none p-4 rounded-sm bg-zinc-100 text-base"
                    {...field}
                  />
                </FormControl>
                {errors.address ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Zip Code
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                {errors.zipCode ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  City
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="City"
                    {...field}
                  />
                </FormControl>
                {errors.city ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  State
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                {errors.state ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                COUNTRY / REGION
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between p-4 rounded-sm bg-zinc-100 text-base",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? country_names.find(
                            (country) => country === field.value
                          )
                        : "Select country"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] h-[250px] px-0 pt-0 pb-3">
                  <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                      {country_names.map((country) => (
                        <CommandItem
                          value={country}
                          key={country}
                          onSelect={() => {
                            console.log({ country });
                            form.setValue("country", country);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              country === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country}
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
      </div>
    </div>
  );
};

export default UserBookingSection;
