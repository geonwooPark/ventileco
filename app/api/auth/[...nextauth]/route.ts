import { AuthOptions, DefaultSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { connectMongo } from '@/app/_utils/database'
import NextAuth from 'next-auth/next'
import { User } from '@/models/user'
import { UserType } from '@/app/_interfaces/interface'

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

export const authOptions: AuthOptions = {
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
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  pages: {
    signIn: '/',
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.type === 'oauth') {
        return await signInWithOAuth(account, profile)
      }
      return true
    },
    async jwt({ token, user }) {
      const userDB = await User.findOne<UserType>({ email: user?.email })
      if (!userDB) return token

      if (user) {
        token.id = userDB._id
        token.role = userDB.role
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
  debug: process.env.NODE_ENV === 'development',

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

/* eslint-disable-next-line */
const signInWithOAuth = async (account: any, profile: any) => {
  await connectMongo()
  const user = await User.findOne({ email: profile.email })
  if (user) return true

  await User.create({
    name: profile.name,
    email: profile.email,
    image: account.provider === 'google' ? profile.picture : profile.avatar_url,
    provider: account.provider,
  })
  return true
}
