import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import * as bcrypt from 'bcrypt'

import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  pages: { signIn: '/sign-in', error: '/auth/error' },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) return null

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) return null

        return user
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.email = token.email ? token.email : ''
        session.user.picture = token.picture ? token.picture : ''
        session.user.name = token.name ? token.name : ''
      }
      return session
    },
    async jwt({ token, user }) {
      const query = token.id ? { id: token.id } : { email: token.email }

      const dbUser = await db.user.findUnique({
        // @ts-ignore
        where: query,
      })

      if (!dbUser) {
        token.id = user.id
        return token
      }

      return {
        id: dbUser.id,
        role: dbUser.role,
      }
    },
    redirect: () => '/',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const getAuthSession = () => getServerSession(authOptions)
