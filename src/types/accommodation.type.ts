import {
  AccommodationOfferSchema,
  AccommodationRoomSchema,
  AccommodationSchema,
} from "@/schemas/accommodation.schema";
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
  offer?: {
    id: string;
    name: string;
    startingFrom: string;
    startDate: string;
    endDate: string;
    accommodationId: string;
  };
};

export type AccommodationRoom = z.infer<typeof AccommodationRoomSchema>;

export type AccommodatonOffer = z.infer<typeof AccommodationOfferSchema>;
