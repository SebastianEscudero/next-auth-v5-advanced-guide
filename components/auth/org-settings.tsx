"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { update } from "@/auth";
import { db } from "@/lib/db";

import { OrganizationSchema } from "@/schemas";
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

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
import { UserRole } from "@prisma/client";

interface OrganizationSettingsProps {
  activeOrganization: string | null;
}

export const OrganizationSettings = ({
  activeOrganization,
}: OrganizationSettingsProps) => {
    const user = useCurrentUser();

    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);

    if (!activeOrg) {
        return null;
    }

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof OrganizationSchema>>({
        resolver: zodResolver(OrganizationSchema),
        defaultValues: {
            name: activeOrg.name || undefined,
        }
    });
    
    const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
        startTransition(() => {
            db.organization.update({
                where: { id: activeOrg.id },
                data: { name: values.name },
            })
            .then((data: any) => {
                if (data) {
                    update();
                    setSuccess("Organization name updated successfully.");
                }
            })
            .catch((error) => {
                setError(error.message || "Something went wrong!");
            });
        });
    }

    return (
        <>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
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
                Save
              </Button>
            </form>
          </Form>
        </>
    );
}
