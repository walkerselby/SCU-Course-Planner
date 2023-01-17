import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
require("dotenv").config()

const options = {
  providers: [
    GoogleProvider({
      clientId: "GOOGLE-CLIENT-ID",
      clientSecret: "GOOGLE-CLIENT-SECRET",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@scu.edu")
      }
      return true // Do different verification for other providers that don"t have `email_verified`
    },
  },
  debug: false
}

export default (req, res) => NextAuth(req, res, options)