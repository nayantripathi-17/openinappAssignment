import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import { Session, TokenSet } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import urljoin from "url-join";
const {
    DEPLOYED_URL,
    CLIENT_ID_GOOGLE_OAUTH,
    CLIENT_SECRET_GOOGLE_OAUTH,
    JWT_SECRET,
} = process.env;

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: String(CLIENT_ID_GOOGLE_OAUTH),
            clientSecret: String(CLIENT_SECRET_GOOGLE_OAUTH),
            authorization: {
                params: {
                    scope: "openid email profile",
                    redirect_uri: urljoin(
                        String(DEPLOYED_URL),
                        `api`,
                        `auth`,
                        `callback`,
                        `google`
                    ),
                    state: String(JWT_SECRET),
                },
            },
        }),
    ],
    secret: JWT_SECRET,
    session: {
        maxAge: 1 * 24 * 60 * 60,
    },
    callbacks: {
        //@ts-ignore
        async signIn({ profile }) {
            try {
                //Expired Id token
                //@ts-ignore
                if (Date.now() > Number(new Date(Number(profile?.exp) * 1000))) return false;

                /*Normal Authentication Flow*/
                //Existing User
                return true;
            } catch (err) {
                //catch block
                console.log("error", err);
            }
        },

        //@ts-ignore
        async jwt({ token, profile, account }) {
            try {
                //New login
                if (account && profile) {
                    return {
                        ...token,
                        //@ts-ignore
                        google_expiring_at: Number(profile?.exp) * 1000,
                    };
                } else {
                    return token;
                }
            } catch (err) {
                console.log("error", err);
            }
        },
        async session({ session, token }: { session: Session, token: TokenSet }) {
            //@ts-ignore
            session.user.image = String(token?.picture);
            //@ts-ignore
            session.user.subId = String(token?.sub);

            return session;
        },
    },
}

const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: String(CLIENT_ID_GOOGLE_OAUTH),
            clientSecret: String(CLIENT_SECRET_GOOGLE_OAUTH),
            authorization: {
                params: {
                    scope: "openid email profile",
                    redirect_uri: urljoin(
                        String(DEPLOYED_URL),
                        `api`,
                        `auth`,
                        `callback`,
                        `google`
                    ),
                    state: String(JWT_SECRET),
                },
            },
        }),
    ],
    secret: JWT_SECRET,
    session: {
        maxAge: 1 * 24 * 60 * 60,
    },
    callbacks: {
        //@ts-ignore
        async signIn({ profile }) {
            try {
                //Expired Id token
                //@ts-ignore
                if (Date.now() > Number(new Date(Number(profile?.exp) * 1000))) return false;

                /*Normal Authentication Flow*/
                //Existing User
                return true;
            } catch (err) {
                //catch block
                console.log("error", err);
            }
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        //@ts-ignore
        async jwt({ token, profile, account }) {
            try {
                //New login
                if (account && profile) {
                    return {
                        ...token,
                        //@ts-ignore
                        google_expiring_at: Number(profile?.exp) * 1000,
                    };
                } else {
                    return token;
                }
            } catch (err) {
                console.log("error", err);
            }
        },
        async session({ session, token }: { session: Session, token: TokenSet }) {
            //@ts-ignore
            session.user.image = String(token?.picture);
            //@ts-ignore
            session.user.subId = String(token?.sub);

            return session;
        },
    },
})

export { handler as GET, handler as POST }
