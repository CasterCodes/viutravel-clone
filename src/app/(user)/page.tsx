import ExplorePropertyTypesServer from "@/components/explore_property_types/server";
import HotDealsServer from "@/components/hot_deals/server";
import PopularDestinations from "@/components/popular_destionations";
import AccommodationSkeleton from "@/components/skeletons/accommodation_skeleton";
import TopAccommodationsServer from "@/components/top_accommodation/server";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="py-12 flex flex-col space-y-4">
      <Suspense fallback={<AccommodationSkeleton title="Hot Deals" />}>
        <HotDealsServer />
      </Suspense>
      <PopularDestinations />

      <Suspense fallback={<AccommodationSkeleton title="Top Accommodations" />}>
        <TopAccommodationsServer />
      </Suspense>
      <Suspense
        fallback={<AccommodationSkeleton title="Explore Property Types" />}
      >
        <ExplorePropertyTypesServer />
      </Suspense>
    </main>
  );
}
