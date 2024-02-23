"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UserProfileSettingsSectionProps } from "@/types/profile.types";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { FC } from "react";
import SettingsFormSectionsHeader from "./profile_settings_section_header";

const ViuRoamAccountSection: FC<UserProfileSettingsSectionProps> = ({
  form,
  isSubmitting,
  errors,
}) => {
  return (
    <div className="shadow-md mb-4">
      <SettingsFormSectionsHeader
        title="Your ViuRoam Account"
        subtitle=" These details are displayed next to your publicly shared reviews,
              ratings, photos, etc. Any updates you make here will also appear
              in past contributions."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-x-3 p-3">
        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <>
              <FormItem>
                <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                  Display name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    className="p-4 rounded-sm bg-zinc-100 text-base"
                    placeholder="Display name "
                    {...field}
                  />
                </FormControl>
                {errors.displayName ? <FormMessage /> : <></>}
              </FormItem>
            </>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                Date of birth
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal p-4 rounded-sm bg-zinc-100 text-base",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick birthday</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
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

export default ViuRoamAccountSection;
