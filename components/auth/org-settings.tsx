"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { OrganizationSchema } from "@/schemas";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import Image from "next/image";
import { Button } from "../ui/button";
import { Settings, User, X } from "lucide-react";
import { organizationSettings } from "@/actions/organization-settings";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { deleteOrganization } from "@/actions/delete-organization";
import { DialogClose } from "../ui/dialog";

interface OrganizationSettingsProps {
  activeOrganization: string | null;
  setActiveOrganization: (id: string) => void;
}

export const OrganizationSettings = ({
  activeOrganization,
  setActiveOrganization,
}: OrganizationSettingsProps) => {
  const user = useCurrentUser();
  const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: activeOrg?.name || undefined,
    }
  });

  const [selectedSection, setSelectedSection] = useState('Members');

  const onSubmit = (values: z.infer<typeof OrganizationSchema>) => {
    organizationSettings(values, activeOrg)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        }

        if (data.success) {
          update();
          setSuccess(data.success);
        }
      })
      .catch(() => setError("Something went wrong!"));
  }

  return (
    <div className="flex">
      <div className="w-1/3 space-y-4 pr-4 border-r">
        <div className="flex mb-3 items-center pb-0">
          <Image
            alt={activeOrg.name}
            src="/organization.webp"
            className="rounded-md"
            width={35}
            height={35}
          />
          <div className="ml-3 text-sm">
            <p>{activeOrg.name}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <Button
            onClick={() => setSelectedSection('Members')}
            variant="ghost"
            className={`${selectedSection === 'Members' ? 'text-black border-2 border-blue-500 bg-accent text-accent-foreground' : 'text-zinc-400 bg-white'}flex items-center justify-start`}
          >
            <User className="w-4 h-4 mr-2" />Members
          </Button>
          <Button
            onClick={() => setSelectedSection('Settings')}
            variant="ghost"
            className={`${selectedSection === 'Settings' ? 'text-black border-2 border-blue-500 bg-accent text-accent-foreground' : 'text-zinc-400 bg-white'}flex items-center justify-start`}
          >
            <Settings className="w-4 h-4 mr-2" />Settings
          </Button>
        </div>
      </div>
      <div className="w-2/3 pl-4">
        <h3 className="text-3xl font-semibold mb-4">
          {selectedSection}
        </h3>
        {selectedSection === 'Members' ? (
          <ul>
            {activeOrg?.users.map((orgUser: any) => (
              <li key={orgUser.id} className="flex">
                <Avatar>
                  <AvatarImage src={orgUser?.image || ""} />
                  <AvatarFallback className="bg-custom-blue">
                    <FaUser className="text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="truncate text-[14px]">
                    {orgUser.name} <span className="bg-[#D8E0FC] px-[4px] py-[2px] rounded-sm text-[12px] text-custom-blue">{orgUser.id === user?.id ? "You" : ""} </span>
                  </p>
                  <p className="truncate text-[12px] text-zinc-400">{orgUser.email}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : selectedSection === "Settings" ? (
          <div>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">Organization Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Sebastian's Team"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                  type="submit"
                  variant="auth"
                >
                  Save
                </Button>
              </form>
            </Form>
            <div className="mt-4">
              <p className="mt-4 pb-1 border-b">
                Danger
              </p>
              <Button variant="destructive" className="mt-4" onClick={() => setSelectedSection("Delete organization")}>
                <X className="h-4 w-4 mr-2" /> Delete Organization
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p>Are you sure you want to delete this organization?</p>

            <p>This action is permanent and irreversible.</p>
            <div className="space-x-2 pt-2">
              <Button variant="auth" onClick={() => setSelectedSection("Settings")}>
                Cancel
              </Button>
              <DialogClose>
                <Button variant="destructive" 
                  onClick={() => deleteOrganization(activeOrg.id)
                    .then(() =>  {
                    setActiveOrganization("null");
                    localStorage.setItem("activeOrganization", "null");
                    update();}
                  )}
                > 
                  Delete Organization
                </Button>
              </DialogClose>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};