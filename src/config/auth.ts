import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { Session, User } from "next-auth";
import { getServerSession } from "next-auth/next"; // Ajoutez cette import
import EmailProvider from "next-auth/providers/email";
import prisma from "./prisma";
// TODO : ajouter les permissions dans les élements de session, gestion des droits propre
// TODO : ajouter les différents
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    // TODO : gérer les types
    async session({
      session,
      user,
    }: {
      session: Session;
      user: User & { role: string };
    }) {
      return {
        ...session,
        user: {
          ...session.user,
          role: user.role, // Ajout du rôle aux données de session
        },
      };
    },
  },
};

export const { signIn, signOut } = NextAuth(authOptions);
export const auth = () => getServerSession(authOptions);
