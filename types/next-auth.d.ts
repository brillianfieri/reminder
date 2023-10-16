import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
        user_id: number,
        username: string,
        name: string,
        email: string,
        role: string,
        created_at:Date
    }
  }
  interface User extends DefaultUser {
    user_id: number,
    username: string,
    name: string,
    role: string,
    email: string,
    delete_user: boolean,
    created_at:Date
}
}