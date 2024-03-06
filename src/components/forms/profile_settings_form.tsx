"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { UserProfileSchema } from "@/schemas/profile.schema";
import { UserProfile } from "@/types/profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import UserBookingSection from "./sections/user_bookings_section";
import UserTravelRatingSection from "./sections/user_travel_rating_section";
import ViuRoamAccountSection from "./sections/viuroam_account_section";
import { updateUserProfile } from "@/lib/actions/profile.action";
import toast from "react-hot-toast";

interface ProfileSettingsFormProps {
  profile: {
    email?: string | null;
    dob?: Date | null;
    country?: string | null;
    displayName?: string | null;
    title?: string | null;
    firstName?: string | null;
    city?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    address?: string | null;
    zipCode?: string | null;
    state?: string | null;
    travelRating?: string | null;
    user: {
      id: string | null;
      username: string | null;
      email: string | null;
      phone: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

const ProfileSettingsForm: FC<ProfileSettingsFormProps> = ({ profile }) => {
  const router = useRouter();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      email: profile.user.email ?? "",
      dob: new Date(),
      country: profile.country ?? "",
      displayName: profile.displayName ?? "",
      title: profile.title ?? "",
      firstName: profile.firstName
        ? profile.firstName
        : profile.user.username?.split(" ")[0] ?? "",
      lastName: profile.lastName
        ? profile.lastName
        : profile.user.username?.split(" ")[1] ?? "",
      phoneNumber: profile.phoneNumber ?? "",
      address: profile.phoneNumber ?? "",
      zipCode: profile.zipCode ?? "",
      city: profile.city ?? "",
      state: profile.state ?? "",
      travelRating: profile.travelRating ?? "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = form;

  const handleUpdateProfile: SubmitHandler<UserProfile> = async (
    formData: UserProfile
  ) => {
    const updateResult = await updateUserProfile(formData);

    if (updateResult.error) {
      toast.error(updateResult.message);
      return;
    }

    toast.success("Profile update successfully");
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
