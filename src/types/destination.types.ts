import { DestinationSchema } from "@/schemas/destination.schema";
import z from "zod";

export type Destination = z.infer<typeof DestinationSchema>;
