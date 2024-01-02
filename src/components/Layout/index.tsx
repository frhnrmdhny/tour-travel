import { Button } from '@mui/material'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

interface Props {
  children: React.ReactElement
}

export default function Layout({ children }: Props) {
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
          <li>
            <Link href={'/user'}>User</Link>
          </li>

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
