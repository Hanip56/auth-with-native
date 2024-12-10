"use server";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { z } from "zod";

const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalidate fields" };
  }

  const { email, password } = validateFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Signed In" };
  } catch (error) {
    const err = (error as any)?.cause?.err?.message;
    if (err) {
      return { error: err };
    }
    return { error: "Something went wrong" };
  }
};

export default login;
