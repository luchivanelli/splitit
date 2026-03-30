import type { Metadata } from "next"
import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google"
import { ReduxProvider } from "@/store/ReduxProvider"
import "./globals.css"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
})

export const metadata: Metadata = {
  title: "SplitIt — División de Gastos",
  description: "Dividí los gastos de tu grupo de forma automática y sin drama.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={`
          ${bebasNeue.variable}
          ${dmSans.variable}
          ${dmMono.variable}
          font-dm bg-bg text-text-primary min-h-screen overflow-x-hidden
          antialiased
        `}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
