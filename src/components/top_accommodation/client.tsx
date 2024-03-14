import { Accommodation, AccommodatonOffer } from "@/types/accommodation.type";
import React, { FC } from "react";
import CustomCarousel from "../shared/custom_carousel";
import TopAccommodationItem from "../top_accommodation_item";
import { TopAccommodation } from "./server";

interface TopAccommodationsClientProps {
  accommodations: TopAccommodation[];
}

const TopAccommodationClient: FC<TopAccommodationsClientProps> = ({
  accommodations,
}) => {
  return (
    <CustomCarousel title="Top Accommodations">
      {accommodations.map((accommodation) => (
        <TopAccommodationItem
          key={accommodation.name}
          accommodation={accommodation}
        />
      ))}
    </CustomCarousel>
  );
};

export default TopAccommodationClient;
