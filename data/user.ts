import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        organizations: {
          select: {
            organization: {
              select: {
                id: true,
                name: true,
                users: true
              }
            }
          }
        },
        invitations: {
          select: {
            id: true,
            email: true,
            status: true,
            organization: { 
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getOrgById = async (id: string) => {
  try {
    const org = await db.organization.findUnique({ where: { id } });

    return org;
  } catch {
    return null;
  }
};

export const getOrganizations = async (userId: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        organizations: {
          include: {
            organization: true
          }
        }
      }
    });

    if (!user) return "User not found";

    return user.organizations as any;

  } catch(e) {
    return e; ;
  }
};
