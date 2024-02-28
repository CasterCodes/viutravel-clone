import z from "zod";

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

export const AccommodationSchema = z.object({
  name: z.string().min(1, "Accommodation name is required"),
  description: z.string().min(1, "Accommodation description is required"),
  address: z.string().min(1, "Accommodation address is required"),
  destinationId: z.string().min(1, "Accommodation destination id is required"),
  propertyType: z.string().min(1, "Please provide accomodation type"),
  amenities: z
    .array(optionSchema)
    .nonempty("Please provide a list of amenties"),
});
