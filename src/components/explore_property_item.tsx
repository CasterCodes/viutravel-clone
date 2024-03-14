import React, { FC } from "react";
import { ExplorePropertyType } from "./explore_property_types/server";
import Image from "next/image";
import Link from "next/link";

interface ExplorePropertyItemProps {
  explore: ExplorePropertyType;
}

const ExplorePropertyItem: FC<ExplorePropertyItemProps> = ({ explore }) => {
  return (
    <div className="w-full md:w-[270px] rounded-sm shadow-sm bg-white min-h-[290px] relative mr-3">
      <div className="absolute right-0 top-2 bg-white p-2 z-50 min-w-[120px] text-center">
        <h2 className="text-neutral-950 text-lg text-center font-semibold">
          {explore.accommodation?.propertyType}
        </h2>
      </div>
      <Image
        src={explore.accommodation?.imageUrls[2]!}
        alt={explore.accommodation?.name!}
        fill={true}
      />
      <div className="absolute justify-between bottom-0 bg-neutral-900/40 p-2 w-full  flex flex-row items-center">
        <h2 className="text-white text-sm font-medium">
          {explore.count}{" "}
          {explore.count > 1 ? "Accommodations" : "Accommodation"}
        </h2>
        <Link
          className="bg-red-600 rounded-[2px] flex-end text-white px-2 py-1 min-w-[100px] text-center"
          href={`/accommodation/${explore.accommodation?.slug}`}
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default ExplorePropertyItem;
