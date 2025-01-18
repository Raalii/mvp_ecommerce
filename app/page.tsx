"use client";

// import { auth } from "@/src/config/auth";
import { SessionProvider, useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "./AuthButton";

export default function Home() {
  const { data: session } = useSession();
  return (
    <SessionProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          {session?.user
            ? `Authentificated : bienvenue petit con de ${session.user.email}`
            : "Non t'es pas co bg"}

          <div className="mt-10">
            {session?.user ? <LogoutButton /> : <LoginButton />}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
