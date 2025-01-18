"use client";

import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return <button onClick={() => signIn()}>Viens</button>;
};

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>Dégage</button>;
};
