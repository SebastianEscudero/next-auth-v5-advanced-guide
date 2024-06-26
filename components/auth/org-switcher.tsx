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
import { Button } from "../ui/button";
import { acceptInvite } from "@/actions/accept-invite";
import { useSession } from "next-auth/react";
import { rejectInvite } from "@/actions/reject-invite";


interface OrganizationSwitcherProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
}

export const OrganizationSwitcher = ({
    activeOrganization,
    setActiveOrganization,
}: OrganizationSwitcherProps) => {
    const user = useCurrentUser();
    const { update } = useSession();
    if (!user) return null;
    const hasOrg = user.organizations.length > 0

    const activeOrg = user?.organizations.find(org => org.id === activeOrganization);
    const otherOrgs = user.organizations.filter(org => org.id !== activeOrganization);
    const Initial = activeOrg?.name.charAt(0).toUpperCase();
    const invitations = user.invitations;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border border-zinc-200 rounded-lg p-[10px] flex items-center hover:bg-zinc-200 w-full max-w-[380px]">
                {hasOrg && activeOrg ? (
                    <>
                        <div className="aspect-square relative w-[33px] flex-shrink-0">
                            <Image
                                fill
                                alt={activeOrg.name}
                                src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${Initial}&isSquare=true&bgType=marble&bgColor=6c47ff&fgType=initials&fgColor=FFFFFF&type=organization&w=48&q=75`}
                                className="rounded-md"
                            />
                        </div>
                        <div className="flex items-center truncate pr-2">
                            <p className="ml-3 text-sm truncate">{activeOrg.name}</p>
                            {invitations.length > 0 && (
                                <p className="ml-2 bg-custom-blue text-white px-1 mt-0.5 text-[10px] rounded-sm items-center animate-popup">{invitations.length}</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center truncate pr-2">
                        <p className="ml-3 text-sm truncate">No organization selected</p>
                        {invitations.length > 0 && (
                            <p className="ml-2 bg-custom-blue text-white px-1 mt-0.5 text-[10px] rounded-sm items-center animate-popup">{invitations.length}</p>
                        )}
                    </div>
                )}
                <ChevronsUpDown className="ml-auto text-zinc-400 flex-shrink-0" width={20} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="rounded-2xl shadow-xl w-[400px]">
                {hasOrg && activeOrg && (
                    <>
                        <div className="flex mb-3 items-center p-5 pb-0">
                            <Image
                                alt={activeOrg.name}
                                src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${Initial}&isSquare=true&bgType=marble&bgColor=6c47ff&fgType=initials&fgColor=FFFFFF&type=organization&w=48&q=75`}
                                className="rounded-md"
                                width={45}
                                height={45}
                            />
                            <div className="ml-3">
                                <p>{activeOrg.name}</p>
                            </div>
                        </div>
                            <Dialog>
                                <div className="border-b py-3 px-8 text-[14px] hover:bg-slate-100 w-full">
                                    <DialogTrigger className="flex items-center">
                                        <FcSettings className="h-4 w-4 mr-2" />
                                        <p className="ml-5">Manage organization</p>
                                    </DialogTrigger>
                                </div>
                                <DialogContent className="min-h-[500px] w-full max-w-[768px]">
                                    <OrganizationSettings
                                        setActiveOrganization={setActiveOrganization}
                                        activeOrganization={activeOrganization}
                                    />
                                </DialogContent>
                            </Dialog>
                    </>
                )}
                {invitations.length > 0 && (
                    <div className="border-b py-2">
                        {invitations.map((invitation) => (
                            <div
                                key={invitation.id}
                                className="py-1.5 px-5 flex items-center"
                            >
                                <Image
                                    alt={invitation.organization.id}
                                    src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${invitation.organization.name.charAt(0).toUpperCase()}&isSquare=true&bgType=marble&bgColor=6c47ff&fgType=initials&fgColor=FFFFFF&type=organization&w=48&q=75`}
                                    className="rounded-md flex-shrink-0"
                                    width={35}
                                    height={35}
                                />
                                <p className="ml-5 text-sm truncate">
                                    {invitation.organization.name}
                                </p>
                                <DropdownMenuItem className="ml-auto p-0 mr-2">
                                    <Button
                                        onClick={() => {
                                            rejectInvite(invitation.id)
                                                .then(() => {;
                                                update({ event: "session" });
                                                });
                                        }}
                                        variant="destructive"
                                    >
                                        Reject
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="border border-zinc-300 p-0">
                                    <Button
                                        onClick={() => {
                                            acceptInvite(invitation.organization.id, invitation.id)
                                                .then(() => {
                                                    setActiveOrganization(invitation.organization.id);
                                                    update({ event: "session" });
                                                });
                                        }}
                                        variant="ghost"
                                    >
                                        Join
                                    </Button>
                                </DropdownMenuItem>
                            </div>
                        ))}
                    </div>
                )}
                {otherOrgs.length > 0 && (
                    <div className="py-2">
                        {otherOrgs.map((org) => (
                            <DropdownMenuItem
                                onClick={() => setActiveOrganization(org.id)}
                                key={org.id}
                                className="py-1.5 px-5 flex items-center hover:bg-zinc-100 cursor-pointer"
                            >
                                <Image
                                    alt={org.name}
                                    src={`https://img.clerk.com/preview.png?size=144&seed=seed&initials=${org.name.charAt(0).toUpperCase()}&isSquare=true&bgType=marble&bgColor=6c47ff&fgType=initials&fgColor=FFFFFF&type=organization&w=48&q=75`}
                                    className="rounded-md flex-shrink-0"
                                    width={35}
                                    height={35}
                                />
                                <p className="ml-5 text-sm truncate">
                                    {org.name}
                                </p>
                                <ArrowLeftRight className="h-4 w-4 ml-auto text-zinc-400" />
                            </DropdownMenuItem>
                        ))}
                    </div>
                )}
                <div className="py-3 px-8 text-[14px] hover:bg-slate-100">
                    <Dialog>
                        <DialogTrigger className="flex items-center">
                            <PlusIcon className="h-4 w-4 mr-2" />
                            <p className="ml-5">Create organization</p>
                        </DialogTrigger>
                        <DialogContent className="max-w-[480px] w-full">
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