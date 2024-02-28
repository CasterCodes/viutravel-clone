import { AccommodationSchema } from "@/schemas/accommodation.schema";
import z from "zod";

export type Accommodation = z.infer<typeof AccommodationSchema>;
