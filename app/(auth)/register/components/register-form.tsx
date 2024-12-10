"use client";

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
import { RegisterSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import login from "@/actions/login";
import { toastSuccess } from "@/lib/toasts";

const RegisterForm = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    if (values.password !== values.passwordConfirmation) {
      setError("Password confirmation doesn't match");
      return;
    }

    const body = {
      email: values.email,
      password: values.password,
      username: values.username,
    };

    try {
      setIsLoading(true);
      const res = await axios.post(`/api/auth/register`, body);

      if (res.status !== 200 && res.data) {
        console.log({ resData: res.data });
        throw new Error(res.data);
      }

      // after register success invoke login
      await login({ email: values.email, password: values.password }).then(
        (data) => {
          if (data?.error) {
            setError(data.error);
          } else if (data?.success) {
            toastSuccess(
              "Register Success!",
              "Welcome to Absensi application, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur numquam beatae quasi?."
            );
            window.location.href = "/";
          }
        }
      );
    } catch (error) {
      console.log(error);
      setError((error as any)?.response?.data || (error as any)?.message || "");
    } finally {
      setIsLoading(false);
    }
  };

  const disabledCondition = isLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  disabled={disabledCondition}
                  {...field}
                  placeholder="Jane doe"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                  placeholder="******"
                  disabled={disabledCondition}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmation password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="******"
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
        <Button disabled={disabledCondition}>Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
