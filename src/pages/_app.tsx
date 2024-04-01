import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { api } from '~/utils/api'
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import '~/styles/globals.css'
import '@fontsource-variable/figtree'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider
} from '@mui/material/styles'

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
    <AppCacheProvider {...pageProps}>
      <MUIThemeProvider theme={theme}>
        <ThemeProvider forcedTheme="winter">
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </MUIThemeProvider>
    </AppCacheProvider>
  )
}

export default api.withTRPC(MyApp)
