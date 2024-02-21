import z from "zod";

export const UserProfileSchema = z.object({
  displayName: z.string(),
  dob: z.date(),
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string(),
  zipCode: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  travelRating: z.string(),
});
