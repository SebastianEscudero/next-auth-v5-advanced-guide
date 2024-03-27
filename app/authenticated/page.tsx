"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./components_/sidebar";
import { UserButton } from "@/components/auth/user-button";
import { EmptyOrg } from "@/components/empty-org";
import { useCurrentUser } from "@/hooks/use-current-user";
import { OrgSidebar } from "./components_/org-sidebar";

const DashboardPage = () => {
  const [activeOrganization, setActiveOrganization] = useState<string | null>(null);

  const user = useCurrentUser();
  const HasOrg = user?.organizations.length;

  useEffect(() => {
    setActiveOrganization(localStorage.getItem("activeOrganization"));
  }, []);

  useEffect(() => {
    if (!activeOrganization) return;
    localStorage.setItem("activeOrganization", activeOrganization);
  }, [activeOrganization]);

  return (
    <main className="h-full">
      <Sidebar
        activeOrganization={activeOrganization}
        setActiveOrganization={setActiveOrganization}
      />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar 
            setActiveOrganization={setActiveOrganization}
            activeOrganization={activeOrganization}
          />
          <div className="h-full flex-1">
            <div className="flex-1 h-[calc(100%-80px)] p-6">
              {!HasOrg ? (
                <EmptyOrg setActiveOrganization={setActiveOrganization} />
              ) : (
                <h1>the user has organizations {HasOrg} user: {user.name} activeorg: {activeOrganization}</h1>
              )}
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;