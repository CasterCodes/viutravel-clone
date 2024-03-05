"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccommodationRoom } from "@/types/accommodation.type";
import { FC } from "react";
import { EditRoomForm } from "./forms/edit_room_form";

interface AccommodationRoomItemProps {
  room: AccommodationRoom & { id: string };
}

const AccommodationRoomItem: FC<AccommodationRoomItemProps> = ({ room }) => {
  return (
    <AccordionItem key={room.id} value={room.roomType}>
      <AccordionTrigger>{room.roomType}</AccordionTrigger>
      <AccordionContent>
        <EditRoomForm room={room} />
      </AccordionContent>
    </AccordionItem>
  );
};

export default AccommodationRoomItem;
