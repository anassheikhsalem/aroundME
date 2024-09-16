import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import prisma from "@/prisma/index";
import { NextAuthOptions } from "next-auth";
import { NextResponse } from "next/server";

export const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials) {
                try {
                    if (!credentials.email || !credentials.password) {
                        throw new Error('Missing credentials');
                    }                        
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email }
                    });

                    if (!user) {
                        console.log('Invalid credentials: User not found');
                        return null;
                    }

                    const passwordMatched = await bcryptjs.compare(credentials.password, user.password);

                    if (!passwordMatched) {
                        console.log('Invalid credentials: Password does not match');
                        return null;
                    }

                    return user;
                } catch (error) {
                    console.error('Error during login:', error);
                    throw new Error('Login failed');
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    },
    callbacks: {
        async signIn({ user, account, profile, credentials }) {
            if (account.provider === 'credentials') {
                if (user) {
                    console.log('Credentials login successful');
                    return true;
                } else {
                    console.log('Invalid credentials');
                    return false;
                }
            }
            if (account.provider === 'github' || account.provider === 'google') {
                console.log('Third-party login:', user);
                return true;
            }
            return false;
        },
        async session({ session, token, user }) {
            session.user = token.user;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        }
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
};
