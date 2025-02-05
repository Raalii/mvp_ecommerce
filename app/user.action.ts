"use server";

import prisma from "@/src/config/prisma";
import { authActionClient } from "@/src/lib/actions/safe-middleware";
import { z } from "zod";

const SimpleSchema = z.object({
  userEmail: z.string(),
});

const getUserElements = authActionClient
  .schema(SimpleSchema)
  .metadata({
    role: "CUSTOMER",
  })
  .action(async ({ parsedInput: { userEmail } }) => {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    console.log(user);
    return user ?? {};
  });

export { getUserElements };
