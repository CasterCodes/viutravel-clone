import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { getDestinations } from "@/lib/data/destination";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical } from "lucide-react";

const destinationPopoverLinks = [
  {
    name: "Edit",
    url: "/admin/dashboard/destinations/create?action=edit",
  },
];

const DestinationPage = async () => {
  const destinations = await getDestinations();
  return (
    <div>
      <header
        className="flex flex-row justify-between items-center mb-16
      "
      >
        <h2 className="text-3xl font-semibold leading-snug capitalize">
          Destinations
        </h2>
        <Button>
          <Link href="/admin/dashboard/destinations/create">
            Create new Destination
          </Link>
        </Button>
      </header>
      <div className="grid md:grid-cols-3 grid-cols-1 lg:grid-cols-4 gap-3">
        {destinations.map((destination) => (
          <Card key={destination.id} className="w-52 h-40 p-0 rounded-sm">
            <CardContent className="p-0 relative h-[120px] rounded-sm">
              <Image
                src={destination.image}
                alt={`${destination.name}-image`}
                fill={true}
                className="rounded-tr-sm rounded-tl-sm w-full h-auto"
              />
            </CardContent>
            <CardFooter className="p-2 flex flex-row justify-between items-center">
              <CardTitle className="text-lg">{destination.name}</CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <span className="rounded-full border-none cursor-pointer">
                    <MoreVertical size={16} />
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-48 rounded-sm p-0">
                  {destinationPopoverLinks.map((link) => (
                    <Link
                      key={link.name}
                      className="w-full p-2 inline-block font-semibold"
                      href={link.url}
                    >
                      {link.name}
                    </Link>
                  ))}
                </PopoverContent>
              </Popover>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
