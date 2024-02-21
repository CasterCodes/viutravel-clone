"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { UserProfileSchema } from "@/schemas/profile.schema";
import { UserProfile } from "@/types/profile.types";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import UserBookingSection from "./sections/user_bookings_section";
import ViuRoamAccountSection from "./sections/viuroam_account_section";
import UserTravelRatingSection from "./sections/user_travel_rating_section";

const ProfileSettingsForm = () => {
  const router = useRouter();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      email: "",
      dob: new Date(),
      country: "",
      displayName: "",
      title: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      zipCode: "",
      city: "",
      state: "",
      travelRating: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdateProfile: SubmitHandler<UserProfile> = async (
    formData: UserProfile
  ) => {
    alert("Hello");
    console.log({ formData });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <ViuRoamAccountSection
          form={form}
          isSubmitting={isSubmitting}
          errors={errors}
        />
        <UserBookingSection
          form={form}
          isSubmitting={isSubmitting}
          errors={errors}
        />
        <UserTravelRatingSection
          form={form}
          isSubmitting={isSubmitting}
          errors={errors}
        />
        <div className="">
          <Button
            disabled={isSubmitting}
            className="rounded-sm capitalize font-semibold  text-base border-none bg-red-600 hover:bg-red-600"
            type="submit"
          >
            {isSubmitting ? "Creatting Account" : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileSettingsForm;
