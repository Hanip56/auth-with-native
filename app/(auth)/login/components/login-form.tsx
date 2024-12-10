"use client";

import login from "@/actions/login";
import { FormError } from "@/components/form-error";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toastSuccess } from "@/lib/toasts";
import { LoginSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else if (data?.success) {
          toastSuccess(
            "Welcome back!",
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum, animi?"
          );
          window.location.href = "/";
        }
      });
    });
  };

  const disabledCondition = isPending;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="janedoe@example.com"
                  disabled={disabledCondition}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="janedoe@example.com"
                  disabled={disabledCondition}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-1">
          <FormError message={error} />
        </div>
        <Button disabled={disabledCondition}>Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
