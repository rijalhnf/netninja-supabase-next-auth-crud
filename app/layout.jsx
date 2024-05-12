// this layout.jsx wrap all
// this layout page is to make something that doesnt need to write in every page.jsx (we cant override this)
// ^such as navbar, import global/index.css, 

import './globals.css'
import { Rubik } from 'next/font/google'

//it needs, so nextjs dont try to build the app statistically
export const dynamic = 'force-dynamic'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Dojo | Home',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {children}
      </body>
    </html>
  )
}