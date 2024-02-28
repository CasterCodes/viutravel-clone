import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const AccommodationPage = () => {
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
    </div>
  );
};

export default AccommodationPage;
