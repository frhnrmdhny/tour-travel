import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function useVerifySuperAdmin() {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session && session.user.role !== 'SUPERADMIN' && router.isReady) {
      void router.push('/dashboard')
    }
  }, [router, session, session?.user.role])

  return {
    isSuperAdmin: session?.user.role === 'SUPERADMIN'
  }
}
