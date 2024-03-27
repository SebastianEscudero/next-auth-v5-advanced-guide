"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { OrganizationSchema } from "@/schemas";

import {  DialogHeader, DialogTitle } from '@/components/ui/dialog';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { organization } from "@/actions/organization";
import { useRouter } from "next/navigation";

interface CreateOrganizationProps {
  setActiveOrganization: (id: string) => void;
};


export const CreateOrganization = ({
  setActiveOrganization
}: CreateOrganizationProps) => {

  const user = useCurrentUser();
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
    }
  });

  const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("Unauthorized");
      return;
    }

    startTransition(() => {
      organization(values, user.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setSuccess(data.success);
            update({ event: "session" });
            if (data.id) {
              setActiveOrganization(data.id);
            }
            router.refresh();
          }
        });
    });
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Organization</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Sebastian's Team"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            type="submit"
            variant="auth"
          >
            Create Organization
          </Button>
        </form>
      </Form>
    </>
  )
}