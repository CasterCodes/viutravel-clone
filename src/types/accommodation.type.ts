import { AccommodationSchema } from "@/schemas/accommodation.schema";
import z from "zod";

export type Accommodation = z.infer<typeof AccommodationSchema>;


export type AccommodationWithDestination = {
  id: string;
  name: string;
  description: string;
  address: string;
  destinationId: string;
  propertyType: string;
  amenities: string[];
  destination: {
    name: string;
    description: string;
    location: string;
  };
};
