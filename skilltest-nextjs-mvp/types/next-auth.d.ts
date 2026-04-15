import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: "student" | "company"
    } & DefaultSession["user"]
  }

  interface User {
    role: "student" | "company"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "student" | "company"
  }
}
