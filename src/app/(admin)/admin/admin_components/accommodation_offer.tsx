"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Accommodation } from "@/types/accommodation.type";
import React, { FC } from "react";
import { useState } from "react";
import CreateOfferForm from "./forms/create_offer_form";
import { format } from "date-fns";

interface AccommodationOfferProps {
  accommodation: any;
}

const AccommodationOffer: FC<AccommodationOfferProps> = ({ accommodation }) => {
  const [createActive, setCreateActive] = useState<boolean>(false);
  const [editActive, setEditActive] = useState<boolean>(false);
  return (
    <div>
      <Separator className="my-8" />
      <div className="flex flex-col space-y-3 mt-8">
        <div className="flex  border-[1.5px] p-3 rounded-sm justify-between items-center flex-row">
          <h2 className="text-3xl font-semibold">Accommodation offer</h2>
          {accommodation.offer ? (
            <Button onClick={() => setEditActive(true)}>Update offer</Button>
          ) : (
            <Button onClick={() => setCreateActive(true)}>Create offer</Button>
          )}
        </div>
        <div>
          {accommodation.offer ? (
            <div className="flex flex-col space-y-3 p-1">
              <h2>
                <strong>Current offer name:</strong> {accommodation.offer.name}
              </h2>
              <h2>
                <strong>Starting from: Ksh</strong>{" "}
                {accommodation.offer.startingFrom}
              </h2>
              <h2>
                <strong> Started on :</strong>{" "}
                {format(accommodation.offer.startDate, "PPP")}
              </h2>
              <h2>
                <strong>Ends on :</strong>{" "}
                {format(accommodation.offer.endDate, "PPP")}
              </h2>
            </div>
          ) : (
            <>
              {createActive ? (
                <CreateOfferForm />
              ) : (
                <div className="flex border-dotted p-6 border-[1.5px] border-neutral-200 items-center justify-center">
                  <p className="text-base md:max-w-64 md:text-center text-neutral-700">
                    No accommodation offer. Click Create offer to create a new
                    one
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccommodationOffer;
