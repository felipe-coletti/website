import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
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
                <ThemeProvider>
                    <div className='container'>
                        <Header />
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
