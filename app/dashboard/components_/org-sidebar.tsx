"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@/components/auth/org-switcher";
const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface OrgSidebarProps {
  activeOrganization: string | null;
  setActiveOrganization: (id: string) => void;
}

export const OrgSidebar = ({
    activeOrganization,
    setActiveOrganization,
}: OrgSidebarProps) => {
  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image
            src="/logo.svg"
            alt="Logo"
            height={60}
            width={60}
          />
          <span className={cn(
            "font-semibold text-xl",
            font.className,
          )}>
            Sketchlie
          </span>
        </div>
      </Link>
      <OrganizationSwitcher 
        setActiveOrganization={setActiveOrganization}
        activeOrganization={activeOrganization}
      />
    </div>
  );
};