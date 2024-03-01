import { Button } from "@/components/ui/button";
import { getAccommodations } from "@/lib/data/accomodation";
import Link from "next/link";
import React from "react";
import AccommodationsTable from "../../../../../components/tables/accommodations_table/accommondations-table";

const AccommodationPage = async () => {
  const accommondations = await getAccommodations();

  return (
    <div>
      <header
        className="flex flex-row justify-between items-center mb-16
      "
      >
        <h2 className="text-3xl font-semibold leading-snug capitalize">
          Accomondations
        </h2>
        <Button>
          <Link href="/admin/dashboard/accommodations/create">
            Create new accommondation
          </Link>
        </Button>
      </header>
      <div>
        <AccommodationsTable accommodations={accommondations} />
      </div>
    </div>
  );
};

export default AccommodationPage;
