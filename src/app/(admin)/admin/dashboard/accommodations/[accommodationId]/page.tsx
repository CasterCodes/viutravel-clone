import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getAccommodationById } from "@/lib/data/accomodation";
import { FC } from "react";
import AccommodationRoomItem from "../../../admin_components/accommodation_room_item";
import CreateRoomModal from "../../../admin_components/modals/create_room_modal";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import AccommodationOffer from "../../../admin_components/accommodation_offer";
import { AccommodationWithDestination } from "@/types/accommodation.type";

interface AdminSingleAccommodationProps {
  params: {
    accommodationId: string;
  };
}

const AdminSingleAccommodation: FC<AdminSingleAccommodationProps> = async ({
  params: { accommodationId },
}) => {
  const accommodation: AccommodationWithDestination & {
    offer: any;
    rooms: any;
  } = await getAccommodationById(accommodationId);

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
        <Separator className="my-8" />
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
        <AccommodationOffer accommodation={accommodation} />
      </div>
      <aside className="w-full md:w-1/3 clas">
        <header className="flex flex-row justify-between bg-zinc-200/90 p-4 rounded-tl-sm rounded-tr-sm items-center">
          <h2 className="text-2xl capitalize font-bold leading-snug">rooms</h2>
          <CreateRoomModal />
        </header>
        <div className="mt-8">
          {accommodation.rooms.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {accommodation.rooms.map((room) => (
                <AccommodationRoomItem key={room.id} room={room} />
              ))}
            </Accordion>
          ) : (
            <div className="flex border-dotted p-6 border-[1.5px] border-neutral-200 items-center justify-center">
              <p className="text-base md:max-w-64 md:text-center text-neutral-700">
                No accommodation rooms available
              </p>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
};

export default AdminSingleAccommodation;
