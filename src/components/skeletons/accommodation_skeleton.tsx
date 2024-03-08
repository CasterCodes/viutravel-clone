"use client";

import React, { FC } from "react";
import { Skeleton } from "../ui/skeleton";

interface AccommodationSkeletonProps {
  title: string;
}

const AccommodationSkeleton: FC<AccommodationSkeletonProps> = ({ title }) => {
  return (
    <section className="md:px-8 ">
      <div className="md:my-6">
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      <div className="flex flex-row items-center space-x-6">
        {Array.from(Array(4).keys()).map((number: number, index: number) => (
          <div className="w-full bg-white rounded-md border-[1.5px] p-3 flex flex-col space-y-4   md:w-[270px] h-[280px]  ">
            <div className="flex flex-col space-y-2 ">
              <Skeleton className="h-[125px] w-[235px] rounded-md bg-neutral-300" />
              <Skeleton className="h-[16px] w-[200px] rounded-3xl bg-neutral-400" />
              <Skeleton className="h-[16px] w-[226px] rounded-3xl bg-neutral-300" />
            </div>

            <div className="flex flex-col space-y-2 ">
              <Skeleton className="h-[16px] w-[200px] rounded-3xl bg-neutral-300" />
              <Skeleton className="h-[16px] w-[240px] rounded-3xl bg-neutral-300" />
              <Skeleton className="h-[16px] w-[180px] rounded-3xl bg-neutral-300" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AccommodationSkeleton;
