import HotDealsServer from "@/components/hot_deals/server";
import PopularDestinations from "@/components/popular_destionations";
import AccommodationSkeleton from "@/components/skeletons/accommodation_skeleton";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<AccommodationSkeleton title="Hot Deals" />}>
        <HotDealsServer />
      </Suspense>
      <PopularDestinations />
    </main>
  );
}
