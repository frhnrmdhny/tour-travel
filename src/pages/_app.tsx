import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { api } from '~/utils/api'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import '~/styles/globals.css'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider
} from '@mui/material/styles'
import Head from 'next/head'
import { Figtree } from 'next/font/google'

const figtree = Figtree({ subsets: ['latin'] })

const theme = createTheme({
  typography: {
    fontFamily: [
      'Figtree Variable',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Poppins"',
      '"Inter"'
    ].join(',')
  }
})

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <main className={figtree.className}>
      <Head>
        <title>Tour and Travel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="The super application you will need to make sure to have a pleasent and meaningful experience throughtout your Umroh Journey"
        />
      </Head>

      <AppCacheProvider {...pageProps}>
        <MUIThemeProvider theme={theme}>
          <ThemeProvider forcedTheme="customTheme">
            <SessionProvider session={session}>
              <Component {...pageProps} />
            </SessionProvider>
          </ThemeProvider>
        </MUIThemeProvider>
      </AppCacheProvider>
    </main>
  )
}

export default api.withTRPC(MyApp)
