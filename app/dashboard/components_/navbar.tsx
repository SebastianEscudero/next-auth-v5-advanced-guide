"use client";

import { OrganizationSwitcher } from "@/components/auth/org-switcher";
import { UserButton } from "@/components/auth/user-button";
import { InviteButton } from "./org-invite-button";

interface NavbarProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
  }

export const Navbar = ({
    activeOrganization,
    setActiveOrganization,
}: NavbarProps) => {

    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <h1>test</h1>
            </div>
            <div className="block lg:hidden flex-1">
                <OrganizationSwitcher 
                    setActiveOrganization={setActiveOrganization}
                    activeOrganization={activeOrganization}
                />
            </div>
            {activeOrganization && (
                <InviteButton 
                    activeOrganization={activeOrganization}
                />
            )}
            <UserButton />
        </div>
    )
}