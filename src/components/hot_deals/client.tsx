"use client";
import { Accommodation, AccommodatonOffer } from "@/types/accommodation.type";
import { FC } from "react";
import AccommodationItem from "../accommodation_item";
import CustomCarousel from "../shared/custom_carousel";

export type HotDealsType = AccommodatonOffer & {
  accommodation: Accommodation & { imageUrls: string[]; slug: string };
} & {
  id: string;
};

interface HotDealsClientProps {
  offers: HotDealsType[];
}

const HotDealsClient: FC<HotDealsClientProps> = ({ offers }) => {
  return (
    <CustomCarousel title="Hot Deals">
      {offers.map((offer) => (
        <AccommodationItem key={offer.id} offer={offer} />
      ))}
    </CustomCarousel>
  );
};

export default HotDealsClient;
