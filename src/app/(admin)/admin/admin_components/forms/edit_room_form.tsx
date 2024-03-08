"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AccommodationRoomSchema } from "@/schemas/accommodation.schema";
import { AccommodationRoom } from "@/types/accommodation.type";
import { Label } from "@radix-ui/react-label";
import { Check, ChevronsUpDown } from "lucide-react";
import { useParams } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { updateAccommodationRoom } from "@/lib/actions/accommodation.action";

const roomTypes: string[] = [
  "Standard Room",
  "Deluxe Room",
  "Suite",
  "Ocean View Room",
  "Poolside Room",
  "Family Suite",
  "Penthouse Suite",
  "Villa",
  "Bungalow",
  "Chalet",
  "Cottage",
  "Cabana",
  "Duplex",
  "Loft",
  "Studio Apartment",
  "Executive Room",
  "Presidential Suite",
];

interface EditRoomFormProps {
  room: AccommodationRoom & { id: string };
}

export const EditRoomForm: FC<EditRoomFormProps> = ({ room }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const params: { accommodationId: string } = useParams();

  const form = useForm<AccommodationRoom>({
    mode: "onChange",
    resolver: zodResolver(AccommodationRoomSchema),
    defaultValues: {
      pricePerNight: room.pricePerNight ?? 0,
      roomType: room.roomType ?? "",
      numberOfGuests: room.numberOfGuests ?? 0,
      capacity: room.capacity ?? 0,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleCreateNewRoom: SubmitHandler<AccommodationRoom> = async (
    data: AccommodationRoom
  ) => {
    const updateRoom: AccommodationRoom & { accommodationId: string } = {
      ...data,
      accommodationId: params.accommodationId,
    };

    const result = await updateAccommodationRoom(updateRoom, room.id);

    if (result && result.error) {
      toast.error(result.message);
      return;
    }

    toast.success("Room updated successfully");
  };

  return (
    <div>
      <header>
        <div className="flex items-center space-x-2">
          <Switch
            checked={editMode}
            onCheckedChange={() => setEditMode((prev) => !prev)}
            id="edit-mode"
          />
          <Label htmlFor="edit-mode">Edit Mode</Label>
        </div>
      </header>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleCreateNewRoom)}
          className="space-y-2 mt-4  bg-neutral-50 border-[1.5px] border-neutral-100 p-3"
        >
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-semibold text-sm capitalize leading-tight text-neutral-800/90">
                  Room Type
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        disabled={!editMode}
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between p-2 rounded-sm bg-white text-base",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? roomTypes.find((room) => room === field.value)
                          : "Select destination"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] h-[250px] px-0 pt-0 pb-3">
                    <Command>
                      <CommandInput placeholder="Search destination..." />
                      <CommandEmpty>No room type found.</CommandEmpty>
                      <CommandGroup>
                        {roomTypes.map((room) => (
                          <CommandItem
                            className="px-0 py-2"
                            value={room}
                            key={room}
                            onSelect={() => {
                              form.setValue("roomType", room);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                room === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {room}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                {errors.roomType ? <FormMessage /> : <></>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pricePerNight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm capitalize leading-tight text-neutral-800/90">
                  Price per night (in Ksh)
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!editMode}
                    type="number"
                    placeholder=""
                    {...field}
                  />
                </FormControl>

                {errors.pricePerNight ? <FormMessage /> : <></>}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfGuests"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm capitalize leading-tight text-neutral-800/90">
                  Allowed guests
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!editMode}
                    type="number"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                {errors.numberOfGuests ? <FormMessage /> : <></>}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sm capitalize leading-tight text-neutral-800/90">
                  No of rooms
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={!editMode}
                    type="number"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                {errors.capacity ? <FormMessage /> : <></>}
              </FormItem>
            )}
          />
          {editMode ? (
            <div className="flex flex-row space-x-2 mt-3">
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Updating room" : "Update"}
              </Button>
              <Button
                onClick={() => setEditMode((prev) => !prev)}
                type="submit"
              >
                Cancel
              </Button>
            </div>
          ) : (
            <></>
          )}
        </form>
      </Form>
    </div>
  );
};
