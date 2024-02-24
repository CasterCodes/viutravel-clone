import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const DestinationPage = () => {
  return (
    <div>
      <Button>
        <Link href="/admin/dashboard/destinations/create">
          Create new Destination
        </Link>
      </Button>
    </div>
  );
};

export default DestinationPage;
