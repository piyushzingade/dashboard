"use client"

import { SessionProvider } from "next-auth/react"

type Props = {
    children: React.ReactNode
}

export default function AuthProvider({ children }: Props) {
    return (
        <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
            {children}
        </SessionProvider>
    )
}