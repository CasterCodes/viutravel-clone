"use client";

import React, { FC } from "react";
import { HotDealsType } from "./hot_deals/client";
import Image from "next/image";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface AccommodationItemProps {
  offer: HotDealsType;
}

const AccommodationItem: FC<AccommodationItemProps> = ({ offer }) => {
  return (
    <div className="w-full md:w-[270px] rounded-sm shadow-sm bg-white min-h-[360px] relative mr-3">
      <div className="relative w-full h-[270px]">
        <div className="absolute right-0 top-2 bg-green-500 p-2 z-50 min-w-[120px] text-center">
          <h2 className="text-white text-lg text-center font-semibold">
            {offer.name}
          </h2>
        </div>
        <Image
          src={offer.accommodation?.imageUrls[0]}
          alt={offer.accommodation?.name}
          fill={true}
        />
        {}
      </div>
      <div className="p-3 flex flex-col space-y-1">
        <p className="flex flex-row space-x-2 items-center">
          <span>
            <MapPin size={16} />
          </span>
          <span>{offer.accommodation?.address}</span>
        </p>

        <h2 className="text-lg font-bold leading-normal">
          {offer.accommodation?.name}
        </h2>
        <p className="uppercase">From {offer.startingFrom}</p>
        <Link
          className="bg-red-600 rounded-[2px] text-sm w-1/4  flex-end text-white px-2 py-2 min-w-[100px] text-center"
          href={`/accommodation/property/${offer.accommodation?.slug}`}
        >
          Book now
        </Link>
      </div>
    </div>
  );
};

export default AccommodationItem;
