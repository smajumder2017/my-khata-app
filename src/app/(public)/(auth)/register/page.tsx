"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
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
import { PasswordInput } from "@/components/password-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === "" ? "Please enter your email" : undefined,
    }),
    password: z
      .string()
      .min(1, "Please enter your password")
      .min(7, "Password must be at least 7 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ["confirmPassword"],
  });

export default function SignUpForm({}: React.HTMLAttributes<HTMLFormElement>) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // eslint-disable-next-line no-console
    console.log(data);
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email: data.email, password: data.password }),
      headers: { "Content-Type": "application/json" },
    });
    const response = await res.json();
    if (response.error) {
      toast.error(response.error);
      setIsLoading(false);
      return;
    }
    toast.message("Registered successfully!");
    router.push("/login");
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid gap-3")}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
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
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isLoading}>
          Create Account
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">Or</span>
          </div>
        </div>

        <div className="gflex">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={isLoading}
            onClick={()=>router.push('/login')}
          >
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
