"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccommodationRoom } from "@/types/accommodation.type";
import { AccommodationRoomSchema } from "@/schemas/accommodation.schema";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { createAccommodationRoom } from "@/lib/actions/accommodation.action";
import { useParams } from "next/navigation";
import { Accommodation } from "@prisma/client";
import toast from "react-hot-toast";

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

export const NewRoomForm = () => {
  const params: { accommodationId: string } = useParams();

  const form = useForm<AccommodationRoom>({
    mode: "onChange",
    resolver: zodResolver(AccommodationRoomSchema),
    defaultValues: {
      pricePerNight: 0,
      roomType: "",
      numberOfGuests: 0,
      capacity: 0,
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleCreateNewRoom: SubmitHandler<AccommodationRoom> = async (
    data: AccommodationRoom
  ) => {
    const room: AccommodationRoom & { accommodationId: string } = {
      ...data,
      accommodationId: params.accommodationId,
    };

    const result = await createAccommodationRoom(room);

    if (result && result.error) {
      toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateNewRoom)}
        className="space-y-8 mt-8"
      >
        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                Room Type
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between p-6 rounded-sm bg-zinc-100 text-base",
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
                              room === field.value ? "opacity-100" : "opacity-0"
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
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                Price per night (in Ksh)
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
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
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                Allowed guests
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
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
              <FormLabel className="font-bold uppercase leading-snug text-neutral-800/90">
                No of rooms
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="" {...field} />
              </FormControl>
              {errors.capacity ? <FormMessage /> : <></>}
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating room" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
