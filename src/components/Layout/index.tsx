import Link from 'next/link'
import WaitingForVerification from '../WaitingForVerification'
import { useMemo } from 'react'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import {
  FaListAlt,
  FaUsers,
  FaSuitcase,
  FaBoxOpen,
  FaReceipt,
  FaHandshake,
  FaUserTie,
  FaHistory,
  FaSignOutAlt,
  FaBars,
  FaBox
} from 'react-icons/fa'
import { MdAirplanemodeActive } from 'react-icons/md'
import { IoIosPaper, IoMdDocument } from 'react-icons/io'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { data: session } = useSession()
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false)

  const MENU = useMemo(
    () => [
      {
        href: '/dashboard',
        label: 'Dashboard',
        icon: <FaListAlt />
      },
      {
        href: '/user',
        label: 'User',
        icon: <FaUsers />,
        isHidden: session?.user.role !== 'SUPERADMIN'
      },
      {
        href: '/report',
        label: 'Report',
        icon: <IoMdDocument />
      },
      {
        href: '/customer',
        label: 'Customer',
        icon: <FaSuitcase />
      },
      {
        href: '/departure',
        label: 'Departure',
        icon: <MdAirplanemodeActive />
      },
      {
        href: '/component',
        label: 'Component',
        icon: <FaBoxOpen />
      },
      {
        href: '/product',
        label: 'Product',
        icon: <FaReceipt />
      },
      {
        href: '/purchase-order',
        label: 'Purchase Order',
        icon: <FaBox />
      },
      {
        href: '/transaction',
        label: 'Transaction',
        icon: <FaHandshake />
      },
      {
        href: '/partner',
        label: 'Mitra',
        icon: <IoIosPaper />
      },
      {
        href: '/employee',
        label: 'Karyawan',
        icon: <FaUserTie />
      },
      {
        href: '/access-history',
        label: 'Access History',
        icon: <FaHistory />
      }
    ],
    [session?.user.role]
  )

  const toggleDrawer = () => {
    setIsDrawerCollapsed(!isDrawerCollapsed)
  }

  if (session?.user.role === 'USER') return <WaitingForVerification />

  return (
    <div
      className={`drawer drawer-open ${isDrawerCollapsed ? 'drawer-collapsed' : ''}`}
    >
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        readOnly
        checked={isDrawerCollapsed}
      />

      <div className="drawer-content">
        <div className="p-4">{children}</div>
      </div>

      <div
        className="drawer-side"
        style={{
          width: isDrawerCollapsed ? '8rem' : '20rem',
          transition: 'width 0.3s ease'
        }}
      >
        <label
          htmlFor="my-drawer"
          className="drawer-overlay"
          onClick={toggleDrawer}
        ></label>

        <div className="flex justify-between p-4 items-center">
          {!isDrawerCollapsed && (
            <h1
              className="text-3xl font-bold italic"
              style={{
                fontWeight: 700,
                fontSize: isDrawerCollapsed ? '1rem' : '1.5rem',
                color: '#01B9DE'
              }}
            >
              Tour & Travel
            </h1>
          )}

          <button className="btn btn-square btn-ghost" onClick={toggleDrawer}>
            <FaBars size={24} />
          </button>
        </div>

        <ul className="menu p-4 min-h-full text-base-content">
          {MENU.map(
            ({ href, label, icon, isHidden }) =>
              !isHidden && (
                <li key={href}>
                  <Link href={href}>
                    <span className="flex items-center gap-4 p-2 rounded">
                      {icon}
                      <span
                        className={`flex-1 text-lg ${isDrawerCollapsed ? 'hidden' : ''}`}
                      >
                        {label}
                      </span>
                    </span>
                  </Link>
                </li>
              )
          )}
          <li className="mt-auto">
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center justify-center btn w-full mt-4 py-2 rounded-lg bg-[#48E0FE]"
            >
              <FaSignOutAlt className="text-lg mr-2" />
              <span className={`${isDrawerCollapsed ? 'hidden' : ''}`}>
                Sign Out
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
