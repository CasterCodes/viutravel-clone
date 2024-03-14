import React, { FC } from "react";

import Image from "next/image";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { TopAccommodation } from "./top_accommodation/server";

interface TopAccommodationItemsProps {
  accommodation: TopAccommodation;
}

const TopAccommodationItem: FC<TopAccommodationItemsProps> = ({
  accommodation,
}) => {
  return (
    <div className="w-full md:w-[270px] rounded-sm shadow-sm bg-white min-h-[360px] relative mr-3">
      <div className="relative w-full h-[270px]">
        <Image
          src={accommodation?.imageUrls[2]}
          alt={accommodation?.name}
          fill={true}
        />
      </div>
      <div className="p-3 flex flex-col space-y-1">
        <p className="flex flex-row space-x-2 items-center">
          <span>
            <MapPin size={16} />
          </span>
          <span>{accommodation?.address}</span>
        </p>

        <h2 className="text-lg font-bold leading-normal">
          {accommodation?.name}
        </h2>
        <p className="uppercase">From {accommodation.offer.startingFrom}</p>
        <Link
          className="bg-red-600 rounded-[2px] text-sm w-1/4  flex-end text-white px-2 py-2 min-w-[100px] text-center"
          href={`/accommodation/property/${accommodation?.slug}`}
        >
          Book now
        </Link>
      </div>
    </div>
  );
};

export default TopAccommodationItem;
