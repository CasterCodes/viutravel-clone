import z from "zod";
import { LoginFormSchema, SignUpSchema } from "@/schemas/auth.schemas";

export type Signup = z.infer<typeof SignUpSchema>;
export type Login = z.infer<typeof LoginFormSchema>;
