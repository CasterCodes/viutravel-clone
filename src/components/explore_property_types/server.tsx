import { getExplorePropertyTypes } from "@/lib/data/accomodation";
import React from "react";
import ExplorePropertyTypesClient from "./client";

export interface ExplorePropertyType {
  accommodation: {
    imageUrls: string[];
    propertyType: string;
    name: string;
    slug: string;
    id: string;
  } | null;
  count: number;
}

const ExplorePropertyTypesServer = async () => {
  const accommodations: ExplorePropertyType[] = await getExplorePropertyTypes();
  return <ExplorePropertyTypesClient accommodations={accommodations} />;
};

export default ExplorePropertyTypesServer;
