"use client";

import { useAppState } from "@/lib/providers/app-state.provider";
import "react-multi-carousel/lib/styles.css";
import PopularDestinationItem from "./popular_destination_item";
import CustomCarousel from "./shared/custom_carousel";
import AccommodationSkeleton from "./skeletons/accommodation_skeleton";

const PopularDestinations = () => {
  const { destinations } = useAppState();

  if (destinations.loading) {
    return <AccommodationSkeleton title="Popular destinations" />;
  }

  return (
    <CustomCarousel title="Popular Destinations">
      {destinations.data?.map((destination) => (
        <PopularDestinationItem
          key={destination.id}
          destination={destination}
        />
      ))}
    </CustomCarousel>
  );
};

export default PopularDestinations;
