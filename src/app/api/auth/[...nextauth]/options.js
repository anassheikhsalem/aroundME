import { NextAuthOptions } from "next-auth";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import prisma from "@/prisma/index";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const options = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            id:"credentials",
            name: "Credentials",
            async authorize(credentials) {
                try {                   
                    console.log(credentials);                        
                    const user = await prisma.user.findUnique({
                        where: {
                                email: credentials.email
                        }
                    });

                    if (!user) {
                        console.log('Invalid credentials');
                        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
                    }

                    const passwordMatched = await bcryptjs.compare(credentials.password, user.password);

                    if (!passwordMatched) {
                        console.log('Invalid credentials');
                        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
                    }
                    console.log('user found');
                    console.log('Password matched');
                        
                    return user
                } catch (error) {
                    console.log(error)
                    return NextResponse.json({message:`server error: ${error}`}, {status:501})
                }
            }
        })
    ],
    pages: {
        signIn: "/auth/login"
    }
}