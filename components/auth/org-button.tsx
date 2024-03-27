"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { CreateOrganization } from "./create-organization";
import { Hint } from "../hint";

interface NewOrgButtonProps {
    activeOrganization: string | null;
    setActiveOrganization: (id: string) => void;
};

export const NewOrgButton = ({
    setActiveOrganization
}: NewOrgButtonProps) => {

  return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="aspect-square">
                    <Hint label="Create Organization" side="right" align="start" sideOffset={18}>
                        <button className="bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition">
                            <PlusIcon className="text-white"/>
                        </button>
                    </Hint>
                </div>
            </DialogTrigger>
            <DialogContent>
                <CreateOrganization 
                    setActiveOrganization={setActiveOrganization}
                />
            </DialogContent>
        </Dialog>
  );
};
