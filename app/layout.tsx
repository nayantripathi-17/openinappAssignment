import type { Metadata } from 'next'
import './globals.css'
import NextAuthProvider from '@/components/NextauthProvider'
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { montserrat } from '@/lib/fonts';


export const metadata: Metadata = {
  title: 'OpenInApp Assignment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={montserrat.className}>
        <NextAuthProvider>
          <MantineProvider>
            {children}
          </MantineProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
