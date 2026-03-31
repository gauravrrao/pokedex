import { Inter, Poppins } from 'next/font/google'
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from '@/theme'
import { TRPCProvider } from '@/utils/trpc-provider'
import Navigation from '@/components/Navigation'
import AnimatedBackground from '@/components/AnimatedBackground'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'] 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AnimatedBackground />
            <TRPCProvider>
              <Navigation />
              {children}
            </TRPCProvider>
          </ThemeProvider>

      </body>
    </html>
  )
}