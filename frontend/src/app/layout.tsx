import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components'

export const metadata: Metadata = {
    title: 'Felipe Coletti',
    description: 'The definitive (and goth) portfolio',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <Header />
                {children}
            </body>
        </html>
    )
}
