"use client";

import { useRouter } from "next/navigation";
import { useUser,useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

import { UserButton } from '@clerk/nextjs'


// ✅ 1. Validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .min(8, "Phone number too short")
    .regex(/^[0-9+\-() ]+$/, "Invalid phone format"),
});

export default function OwnerRegisterPage() {
  const router = useRouter();
  const { user } = useUser();
  const { isSignedIn } = useAuth();
  const [error, setError] = useState("");

  // ✅ 2. Hook Form setup
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "" },
  });

  // ✅ 3. Submit handler
  const onSubmit = async (values) => {
    setError("");
    try {
      
      const res= await axios.post("/api/registration/owner", values);
      if (res.status === 201) {
        router.push("/add-gym");
      }
      
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  if (!isSignedIn) {
    return (
      <div className="p-6 text-center text-gray-600">
        Please sign in to continue.
      </div>
    );
  }

  // ✅ 4. UI using ShadCN Components
  return (
    <div className="flex justify-center mt-20">
      <UserButton />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Complete Owner Registration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                      <Input placeholder="john@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 98765 43210" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full mt-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
