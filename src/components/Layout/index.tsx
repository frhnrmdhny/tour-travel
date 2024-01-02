import { Button } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import WaitingForVerification from '../WaitingForVerification'

interface Props {
  children: React.ReactElement
}

export default function Layout({ children }: Props) {
  const { data: session } = useSession()

  if (session?.user.role === 'USER') return <WaitingForVerification />

  return (
    <div className="drawer drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <main className="container mx-auto">
          <div className="p-4">{children}</div>
        </main>
      </div>

      <div className="drawer-side">
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>

          {session?.user.role === 'SUPERADMIN' && (
            <li>
              <Link href={'/user'}>User</Link>
            </li>
          )}

          <Button
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
            className="btn btn-secondary btn-sm mt-8"
          >
            Sign Out
          </Button>
        </ul>
      </div>
    </div>
  )
}
