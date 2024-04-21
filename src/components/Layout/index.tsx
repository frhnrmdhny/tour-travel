import Link from 'next/link'
import WaitingForVerification from '../WaitingForVerification'
import { useMemo } from 'react'
import { signOut, useSession } from 'next-auth/react'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { data: session } = useSession()

  const MENU = useMemo(
    () => [
      {
        href: '/dashboard',
        label: 'Dashboard'
      },
      {
        href: '/user',
        label: 'User',
        isHidden: session?.user.role !== 'SUPERADMIN'
      },
      {
        href: '/report',
        label: 'Report'
      },
      {
        href: '/customer',
        label: 'Customer'
      },
      {
        href: '/departure',
        label: 'Departure'
      },
      {
        href: '/component',
        label: 'Component'
      },
      {
        href: '/product',
        label: 'Product'
      },
      {
        href: '/purchase-order',
        label: 'Purchase Order'
      },
      {
        href: '/transaction',
        label: 'Transaction'
      },
      {
        href: '/partner',
        label: 'Mitra'
      },
      {
        href: '/employee',
        label: 'Karyawan'
      },
      {
        href: '/access-history',
        label: 'Access History'
      }
    ],
    [session?.user.role]
  )

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
          {MENU.map(({ href, label, isHidden }) =>
            isHidden ? null : (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            )
          )}

          <button
            onClick={() =>
              signOut({
                callbackUrl: '/login'
              })
            }
            className="btn btn-secondary btn-outline btn-sm mt-8"
          >
            Sign Out
          </button>
        </ul>
      </div>
    </div>
  )
}
