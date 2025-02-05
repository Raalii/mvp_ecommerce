import { UserRole } from "@prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof ActionError) {
      return error.message;
    }

    return "Une erreur est survenue";
  },

  defineMetadataSchema() {
    return z.object({
      role: z.nativeEnum(UserRole),
    });
  },
});
