import { getAccommodationsHotDeals } from "@/lib/data/accomodation";
import React from "react";
import HotDealsClient, { HotDealsType } from "./client";

const HotDealsServer = async () => {
  //@ts-ignore
  const hotDeals: HotDealsType[] = await getAccommodationsHotDeals();

  return <HotDealsClient offers={hotDeals} />;
};

export default HotDealsServer;
