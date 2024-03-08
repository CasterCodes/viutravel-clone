import { TDestination } from "@/hooks/destinations.hooks";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface PopularDestinationItemProps {
  destination: TDestination;
}

const PopularDestinationItem: FC<PopularDestinationItemProps> = ({
  destination,
}) => {
  return (
    <div className="w-full md:w-[270px] h-[280px] relative mr-3">
      <div className="absolute right-0 top-2 bg-white p-2 z-50 min-w-[80px] text-center">
        <h2 className="text-neutral-950 text-lg text-center font-semibold">
          {destination.name}
        </h2>
      </div>
      <Image src={destination.image} alt={destination.name} fill={true} />
      <div className="absolute bottom-0 bg-neutral-900/40 p-2 w-full  flex flex-row justify-end">
        <Link
          className="bg-red-600 rounded-[2px] flex-end text-white px-2 py-1 min-w-[100px] text-center"
          href={`/accommodation/search?location=${destination.name}`}
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default PopularDestinationItem;
