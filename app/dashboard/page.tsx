"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "./components_/sidebar";
import { EmptyOrg } from "@/components/empty-org";
import { useCurrentUser } from "@/hooks/use-current-user";
import { OrgSidebar } from "./components_/org-sidebar";
import { Navbar } from "./components_/navbar";

const DashboardPage = () => {
  const [activeOrganization, setActiveOrganization] = useState<string | null>(null);

  const user = useCurrentUser();

  useEffect(() => {
    setActiveOrganization(localStorage.getItem("activeOrganization"));
  }, []);

  useEffect(() => {
    if (!activeOrganization) return;
    localStorage.setItem("activeOrganization", activeOrganization);
  }, [activeOrganization]);

  const activeOrg = user?.organizations.find(org => org.id === activeOrganization);

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
            <Navbar 

              setActiveOrganization={setActiveOrganization}
              activeOrganization={activeOrganization}
              activeOrg={activeOrg}
            />
            <div className="flex-1 h-[calc(100%-80px)] p-6">
              {!activeOrg ? (
                <EmptyOrg setActiveOrganization={setActiveOrganization} />
              ) : (
                <div>
                  <h1 className="text-2xl font-bold">Welcome to {activeOrg.name}</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;