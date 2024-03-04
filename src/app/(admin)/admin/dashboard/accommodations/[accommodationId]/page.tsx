import { Badge } from "@/components/ui/badge";
import { getAccommodationById } from "@/lib/data/accomodation";
import React, { FC } from "react";
import CreateRoomModal from "../../../admin_components/modals/create_room_modal";
import { Button } from "@/components/ui/button";

interface AdminSingleAccommodationProps {
  params: {
    accommodationId: string;
  };
}

const AdminSingleAccommodation: FC<AdminSingleAccommodationProps> = async ({
  params: { accommodationId },
}) => {
  const accommodation = await getAccommodationById(accommodationId);

  return (
    <section className="flex flex-col space-y-4 md:flex-row justify-between md:space-x-6">
      <div className="w-full md:w-2/3 md:border-2 md:border-neutral-100 md:rounded-sm md:p-6 md:shadow-sm">
        <h2 className="text-4xl font-bold leading-snug">
          {accommodation.name}
        </h2>
        <h2 className="text-base font-medium mt-2">
          {accommodation.address}{" "}
          <Badge key={accommodation.id}>{accommodation.propertyType}</Badge>
        </h2>
        <div className="flex flex-col space-y-3 mt-8">
          <h2 className="text-3xl font-semibold">Available amenities</h2>
          <div>
            {accommodation.amenities.map((amenity) => (
              <Badge key={amenity} className="mr-2">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-3 mt-8">
          <h2 className="text-3xl font-semibold">Description</h2>
          <p>{accommodation.description}</p>
        </div>
        <div className="flex flex-col space-y-3 mt-8">
          <h2 className="text-3xl font-semibold">Destination Information</h2>
          <div>
            <h2 className="text-xl font-semibold">Name</h2>
            <p className="text-">{accommodation.destination.name}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Location</h2>
            <p className="text-">{accommodation.destination.location}</p>
          </div>
        </div>
      </div>
      <aside className="w-full md:w-1/3 clas">
        <header className="flex flex-row justify-between items-center">
          <h2 className="text-2xl capitalize font-bold leading-snug">rooms</h2>
          <CreateRoomModal />
        </header>
        <div className="mt-8">
          {accommodation.rooms.map((room) => (
            <Button>{room.roomType}</Button>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default AdminSingleAccommodation;
