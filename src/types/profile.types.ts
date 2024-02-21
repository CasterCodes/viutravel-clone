import z from "zod";

import { UserProfileSchema } from "../schemas/profile.schema";
import { FieldErrors, UseFormReturn } from "react-hook-form";

export type UserProfile = z.infer<typeof UserProfileSchema>;

export interface UserProfileSettingsSectionProps {
  form: UseFormReturn<UserProfile>;
  isSubmitting: boolean;
  errors: FieldErrors<UserProfile>;
}
