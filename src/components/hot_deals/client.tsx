"use client";
import React, { FC } from "react";
import CustomCarousel from "../shared/custom_carousel";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Accommodation, AccommodatonOffer } from "@/types/accommodation.type";
import AccommodationItem from "../accommodation_item";

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
