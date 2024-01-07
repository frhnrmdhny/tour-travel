import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { api } from '~/utils/api'
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'
import '~/styles/globals.css'

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  return (
    <AppCacheProvider {...pageProps}>
      <ThemeProvider forcedTheme="winter">
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </AppCacheProvider>
  )
}

export default api.withTRPC(MyApp)
