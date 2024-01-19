import { Inter, Montserrat, Lato } from 'next/font/google'

export const montserrat = Montserrat({ preload: true, subsets: ['latin'] })
export const lato = Lato({ preload: true, weight: ["400", "700"], subsets: ["latin"] })