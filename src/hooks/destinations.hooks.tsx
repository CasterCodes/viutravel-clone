"use client";

import { useEffect, useState } from "react";

import axios from "axios";

export interface TDestination {
  id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useDestinations() {
  const [destinations, setDestinations] = useState<TDestination[]>([]);
  const [destinationsError, setDestinationsError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getAllDestinations() {
      setLoading(true);
      try {
        const results: TDestination[] = await axios
          .get("/api/destinations")
          .then((results) => results.data);
        if (results) {
          setDestinations(results);
          setLoading(false);
        }
      } catch (error: any) {
        setDestinationsError(error.message);
      }
    }

    getAllDestinations();
  }, []);

  if (destinationsError) null;

  return {
    data: destinations,
    loading,
  };
}
