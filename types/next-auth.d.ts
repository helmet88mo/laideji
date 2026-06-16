import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      grade?: string | null
      province?: string | null
      targetPath?: string | null
    }
  }
}
