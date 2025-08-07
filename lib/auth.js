import GoogleProvider from 'next-auth/providers/google'
import connectDB from '@/utils/mongodb';
import User from '@/models/User'
import NextAuth from 'next-auth';

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async session({ session, token }) {
            if (token?.id) session.user.id = token.id
            return session
        },
        async jwt({ token, profile }) {
            if (profile?.email) {
                await connectDB()
                const user = await User.findOne({ email: profile.email })
                if (!user) throw new Error('No user found')
                token.id = user._id.toString()
            }
            return token
        },
        async signIn({ profile }) {
            if (!profile?.email) throw new Error('No profile')
            await connectDB()
            try {
                await User.findOneAndUpdate(
                    { email: profile.email },
                    { $set: { name: profile.name, email: profile.email } },
                    { upsert: true, new: true }
                )
            } catch (e) {
                console.log("ERR:" + e);
            }
            return true
        },
    },
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions)