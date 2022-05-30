import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (credentials === undefined)
                    throw new Error('Empty credentials')

                return null
            },
        }),
    ],
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        async jwt({ token }) {
            return token
        },
        async session({ session }) {
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET || '',
    jwt: {
        secret: process.env.NEXTAUTH_JWT_KEY || '',
    },
})
