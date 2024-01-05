import { DefaultSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { connectMongo } from '@/lib/database'
import NextAuth from 'next-auth/next'
import { User } from '../../models/user'

declare module 'next-auth' {
  interface User {
    role: string
  }
  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          credentials?.email.trim() === '' ||
          !credentials.password ||
          credentials?.password.trim() === ''
        ) {
          throw new Error('빈칸을 모두 입력해주세요.')
        }
        await connectMongo()
        const user = await User.findOne({ email: credentials?.email })

        if (!user) {
          throw new Error('존재하지 않는 회원입니다.')
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password,
        )
        if (!pwcheck) {
          throw new Error('잘못된 비밀번호입니다.')
        }
        return user
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? 'user',
        }
      },
    }),
  ],

  pages: {
    signIn: '/',
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET as string,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
