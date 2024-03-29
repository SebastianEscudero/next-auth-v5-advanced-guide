"use server";

import * as z from "zod";
import { OrganizationInviteSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";
import { sendOrganizationInvite } from "@/lib/mail";

export const invite = async (
  validEmails: z.infer<typeof OrganizationInviteSchema>,
  activeOrg: any,
) => {
  const user = await currentUser();

  if (!user?.email) {
    return { error: "Add an email account before inviting members" }
  }

  for (const email of validEmails.emails) {
    if (email) {
        await sendOrganizationInvite(email, activeOrg.name, user);
    }
  }

  return { success: "Invitations Sent" }
}