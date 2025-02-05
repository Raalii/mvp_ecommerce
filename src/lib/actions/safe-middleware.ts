import { getUserElements } from "@/app/user.action";
import { auth } from "../../config/auth";
import { actionClient, ActionError } from "./safe-actions";

export const authActionClient = actionClient.use(async ({ next, metadata }) => {
  const session = await auth();
  console.log(session);
  if (!session?.user) {
    throw new ActionError(
      "Vous ne pouvez pas réaliser cette action. Vous devez être connecté"
    );
  }

  console.log(session.user.role);

  if (session?.user.role !== metadata.role) {
    throw new ActionError("Frérot tu dois être admin");
  }

  return next({ ctx: { user: session.user } });
});

export const authActionAdmin = actionClient.use(async ({ next }) => {
  const sessionInfo = await getUserElements({
    userEmail: "rayanedu92290@gmail.com",
  });

  console.log(sessionInfo);

  return next({ ctx: { user: session.user } });
});
