import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)
console.log(handler)

export const { GET, POST } = handler.handlers
