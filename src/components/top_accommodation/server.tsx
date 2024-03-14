import { getTopAccommondations } from "@/lib/data/accomodation";
import React from "react";
import TopAccommodationClient from "./client";
import { Accommodation, AccommodatonOffer } from "@/types/accommodation.type";

export type TopAccommodation = Accommodation & {
  offer: AccommodatonOffer;
} & {
  id: string;
  imageUrls: string[];
  slug: string;
};

const TopAccommodationsServer = async () => {
  // @ts-ignore
  const accommodations: TopAccommodation[] = await getTopAccommondations();

  return <TopAccommodationClient accommodations={accommodations} />;
};

export default TopAccommodationsServer;
