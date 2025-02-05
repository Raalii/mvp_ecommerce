"use client";

// import { auth } from "@/src/config/auth";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { SessionProvider, useSession } from "next-auth/react";
import { useState } from "react";
import { LoginButton, LogoutButton } from "./AuthButton";
import { getUserElements } from "./user.action";

export default function Home() {
  const { data: session } = useSession();
  const [user, setUser] = useState({} as User);

  const getInfo = async () => {
    try {
      const result = await getUserElements({
        userEmail: session?.user?.email ?? "dfddf",
      });
      if (result?.data) {
        setUser(result?.data as User);
        alert("Les infos ont bien été récupéré !");
      }

      if (result?.serverError) {
        alert(result.serverError);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SessionProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {session?.user
            ? `Authentificated : bienvenue petit con de ${
                session.user.email
              }, ton role est ${user.role ?? "RIEN"}`
            : "Non t'es pas co bg"}

          <div className="mt-10">
            {session?.user ? <LogoutButton /> : <LoginButton />}
          </div>

          <Button
            variant="outline"
            onClick={() => {
              getInfo();
            }}
          >
            Get Role
          </Button>
        </main>
      </div>
    </SessionProvider>
  );
}
