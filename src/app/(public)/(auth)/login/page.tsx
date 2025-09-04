"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
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

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? "Please enter your email" : undefined),
  }),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(7, "Password must be at least 7 characters long"),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string;
}

export default function UserAuthForm({}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      console.log(result);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }

    // //
    // setMessage(data.error || "Success!");
    // // Mock successful authentication
    // const mockUser = {
    //   accountNo: "ACC001",
    //   email: data.email,
    //   role: ["user"],
    //   exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
    // };

    // toast.promise(
    //   new Promise((res) =>
    //     setTimeout(() => {
    //       res(2000);
    //     }, 2000)
    //   ),
    //   {
    //     loading: "Signing in...",
    //     success: () => {
    //       setIsLoading(false);

    //       // Set user and access token

    //       // Redirect to the stored location or default to dashboard
    //       const targetPath = "/";
    //       router.push(targetPath);

    //       return `Welcome back, ${data.email}!`;
    //     },
    //     error: "Error",
    //   }
    // );
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
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
              <Link
                href="/forgot-password"
                className="text-muted-foreground absolute end-0 -top-0.5 text-sm font-medium hover:opacity-75"
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className="mt-2 cursor-pointer" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <LogIn />}
          Sign in
        </Button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">Or</span>
          </div>
        </div>

        <div className="flex">
          <Button
            className="w-full cursor-pointer"
            variant="outline"
            type="button"
            disabled={isLoading}
            onClick={() => router.replace("/register")}
          >
            Register
          </Button>
        </div>
      </form>
    </Form>
  );
}
