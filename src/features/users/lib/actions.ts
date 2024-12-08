"use server";

import { signIn } from "@/auth";
import { signInSchema } from "@/lib/zod";
import { AuthError } from "next-auth";

export const login = async (prevState: unknown, formData: FormData) => {
  const validationResult = signInSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });
  if (!validationResult.success) {
    console.log(validationResult.error.flatten().fieldErrors);
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }
  try {
    await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {};
        case "CallbackRouteError":
          return {};
        default:
          return {};
      }
    }
    throw error;
  }
};
