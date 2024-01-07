import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface Props {
  shallow?: boolean
}

export default function useVerifySuperAdmin(
  { shallow }: Props = { shallow: false }
) {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user.role !== 'SUPERADMIN' && !shallow)
      void router.push('/dashboard')
  }, [router, session?.user.role, shallow])

  return {
    isSuperAdmin: session?.user.role === 'SUPERADMIN'
  }
}
