"use client";

import { ArrowLeftRight, ChevronsUpDown, PlusIcon } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCurrentUser } from "@/hooks/use-current-user";
import { FcSettings } from "react-icons/fc";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { CreateOrganization } from "./create-organization";
import { OrganizationSettings } from "./org-settings";


interface OrganizationSwitcherProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const OrganizationSwitcher = ({
    activeOrganization,
    setActiveOrganization,
}: OrganizationSwitcherProps) => {
    const user = useCurrentUser();

    if (!user) return null;

    const hasOrg = user.organizations.length > 0 

    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const otherOrgs = user.organizations.filter(org => org.id !== activeOrganization);

    if (!activeOrg) return null;
    if (!otherOrgs) return null;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-zinc-200 rounded-lg p-[5px] flex items-center hover:bg-zinc-200">
                {hasOrg ? (
                    <>
                        <div className="aspect-square relative w-[33px] flex-shrink-0">
                            <Image
                                fill
                                alt={activeOrg.name}
                                src="/organization.webp"
                                className="rounded-md"
                            />
                        </div>
                        <p className="ml-3 text-sm truncate">{activeOrg.name}</p>
                    </>
                ) : (
                    <p className="ml-3 text-sm truncate">No organization</p>
                )}
                <ChevronsUpDown className="ml-auto text-zinc-400 flex-shrink-0" width={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-2xl shadow-xl w-[400px]">
                {hasOrg && (
                    <>
                        <div className="flex mb-3 items-center p-5 pb-0">
                            <Image
                                alt={activeOrg.name}
                                src="/organization.webp"
                                className="rounded-md"
                                width={45}
                                height={45}
                            />
                            <div className="ml-3">
                                <p>{activeOrg.name}</p>
                            </div>
                        </div>
                        <div className="py-3 px-8 text-[14px] hover:bg-slate-100">
                            <Dialog>
                                <DialogTrigger className="flex items-center">
                                    <FcSettings className="h-4 w-4 mr-2" />
                                    <p className="ml-5">Manage organization</p>
                                </DialogTrigger>
                                <DialogContent>
                                    <OrganizationSettings 
                                        activeOrganization={activeOrg}
                                    />
                                </DialogContent>
                            </Dialog>
                        </div>
                        <div className="border-t py-2">
                            {otherOrgs.map((org) => (
                                <DropdownMenuItem
                                    onClick={() => setActiveOrganization(org.id)}
                                    key={org.id}
                                    className="py-1.5 px-5 flex items-center hover:bg-zinc-100 cursor-pointer"
                                >
                                    <Image
                                        alt={org.name}
                                        src="/organization.webp"
                                        className="rounded-md flex-shrink-0"
                                        width={35}
                                        height={35}
                                    />
                                    <p className="ml-5 text-sm truncate">
                                        {org.name}
                                    </p>
                                </DropdownMenuItem>
                            ))}
                        </div>
                    </>
                )}
                <div className="py-3 px-8 text-[14px] hover:bg-slate-100">
                    <Dialog>
                        <DialogTrigger className="flex items-center">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            <p className="ml-5">Create organization</p>
                        </DialogTrigger>
                        <DialogContent>
                            <CreateOrganization
                                setActiveOrganization={setActiveOrganization}
                            />
                        </DialogContent>
                    </Dialog>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};