import z from "zod";



export const DestinationSchema = z.object({
  name: z.string().min(1, "Destination name is required"),
  description: z.string().min(1, "Destination description i required"),
  location: z.string().min(1, "Location is required"),
});
