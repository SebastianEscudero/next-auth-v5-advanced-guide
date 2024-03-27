"use client";

import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { FcSettings } from "react-icons/fc";
import { SettingsButton } from "./settings-button";


export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-custom-blue">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl">
        <div className="w-full p-5 mr-10">
          <div className="flex flex-row mb-3 items-center">
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-custom-blue">
                <FaUser className="text-white" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="text-md font-semibold">
                {user?.name}
              </p>
              <p className="text-sm">
                {user?.email}
              </p>
            </div>
          </div>
          <SettingsButton>
            <DropdownMenuItem className="py-3">
              <FcSettings className="h-4 w-4 mr-2" />
              <p className="ml-5">Manage account</p>
            </DropdownMenuItem>
          </SettingsButton>
          <LogoutButton>
            <DropdownMenuItem className="py-3">
              <ExitIcon className="h-4 w-4 mr-2" />
              <p className="ml-5">Sign out</p>
            </DropdownMenuItem>
          </LogoutButton>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
