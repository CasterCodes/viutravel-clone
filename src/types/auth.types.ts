import z from "zod";
import { SignUpSchema } from "@/schemas/auth.schemas";

export type Signup = z.infer<typeof SignUpSchema>;
