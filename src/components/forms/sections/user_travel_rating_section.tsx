"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserProfileSettingsSectionProps } from "@/types/profile.types";
import { FC } from "react";
import SettingsFormSectionsHeader from "./profile_settings_section_header";

const UserTravelRatingSection: FC<UserProfileSettingsSectionProps> = ({
  form,
  isSubmitting,
  errors,
}) => {
  return (
    <div className="shadow-md mb-4">
      <SettingsFormSectionsHeader
        title="The way you Travel"
        subtitle=" Tell us how you like to travel so that we can customise your
              search"
      />
      <div className="p-3">
        <FormField
          control={form.control}
          name="travelRating"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-4 md:w-1/2">
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                STAR/RATING
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="md:w-1/2 p-4 rounded-sm bg-zinc-100 text-base"
                      placeholder="Travel rating"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[...Array.from({ length: 5 }, (_, rating) => rating)].map(
                    (rating) => (
                      <SelectItem
                        disabled={isSubmitting}
                        key={rating + 1}
                        value={`${rating + 1}`}
                      >
                        {rating + 1}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              {errors.travelRating ? <FormMessage /> : <></>}
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default UserTravelRatingSection;
