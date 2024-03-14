import React, { FC } from "react";
import { ExplorePropertyType } from "./server";
import CustomCarousel from "../shared/custom_carousel";
import ExplorePropertyItem from "../explore_property_item";

interface ExplorePropertyTypesClientProps {
  accommodations: ExplorePropertyType[];
}

const ExplorePropertyTypesClient: FC<ExplorePropertyTypesClientProps> = ({
  accommodations,
}) => {
  return (
    <CustomCarousel title="Explore Property Types">
      {accommodations.map((accommodation) => (
        <ExplorePropertyItem
          key={accommodation.accommodation?.id}
          explore={accommodation}
        />
      ))}
    </CustomCarousel>
  );
};

export default ExplorePropertyTypesClient;
