import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"

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
            name: "Credentials",
            credentials: {
            email: { label: "Email", type: "email", placeholder: "email@email.com" },
            password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
            
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

            if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
            } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null

                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
            }
        })
    ],
    pages: {
        singIn: "/auth/login"
    }
}