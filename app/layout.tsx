'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from './navbar';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider >
    <html lang="en">
      <head>
        <title>Reminder</title>
        <meta name='description' content='Reminder' />
      </head>
      <body className={inter.className}>
        <NavBar/>
        {children}
      </body>
    </html>
    </SessionProvider >

  )
}
