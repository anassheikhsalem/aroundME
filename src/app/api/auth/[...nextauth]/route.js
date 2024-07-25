import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

const handler = NextAuth();

export {handler as GET, handler as POST}