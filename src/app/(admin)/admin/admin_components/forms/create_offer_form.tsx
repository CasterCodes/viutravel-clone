"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

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
import { AccommodatonOffer } from "@/types/accommodation.type";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { AccommodationOfferSchema } from "@/schemas/accommodation.schema";
import { createAccommodationOffer } from "@/lib/actions/accommodation.action";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

const CreateOfferForm = () => {
  const { accommodationId } = useParams<{ accommodationId: string }>();

  const form = useForm<AccommodatonOffer>({
    mode: "onChange",
    defaultValues: {
      name: "",
      startingFrom: 0,
      startDate: new Date(),
      endDate: new Date(),
    },
    resolver: zodResolver(AccommodationOfferSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleCreateOffer: SubmitHandler<AccommodatonOffer> = async (data) => {
    const result = await createAccommodationOffer(data, accommodationId);

    if (result && result.error) {
      toast.error(result.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleCreateOffer)}
        className="space-y-4 mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Offer name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              {errors.name && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingFrom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting From (is Ksh)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              {errors.startingFrom && <FormMessage />}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal p-4 rounded-sm bg-zinc-100 text-base",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick birthday</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full text-left font-normal p-4 rounded-sm bg-zinc-100 text-base",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick birthday</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && <FormMessage />}
            </FormItem>
          )}
        />
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating" : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateOfferForm;
