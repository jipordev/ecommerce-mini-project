import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const providers = [
    GithubProvider({
        clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
    GoogleProvider({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
    }),
];

const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
});

export { handlers, auth, signIn, signOut };
