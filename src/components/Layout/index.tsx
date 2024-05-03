import Link from 'next/link'
import WaitingForVerification from '../WaitingForVerification'
import { useMemo } from 'react'
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react'
import { FaListAlt, FaUsers, FaSuitcase, FaBoxOpen, FaReceipt, FaHandshake, FaUserTie, FaHistory, FaSignOutAlt, FaBars, FaUserCircle } from 'react-icons/fa';
import { MdAirplanemodeActive } from 'react-icons/md';
import { IoIosPaper } from 'react-icons/io';



interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const { data: session } = useSession()
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);

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
        label: 'Report'
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
        label: 'Purchase Order'
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
    setIsDrawerCollapsed(!isDrawerCollapsed);
  };

  if (session?.user.role === 'USER') return <WaitingForVerification />


  return (
    <div className={`drawer drawer-open ${isDrawerCollapsed ? 'drawer-collapsed' : ''}`}>
      {/* Input checkbox for drawer, hidden as we're controlling drawer size via state now */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" readOnly checked={isDrawerCollapsed} />

      <div className="drawer-content">
        <div className="navbar w-full">
          <div className="flex-none px-2 mx-2">
            <button className="btn btn-square btn-ghost" onClick={toggleDrawer}>
              <FaBars size={24} />
            </button>
          </div>
          <div className="flex-1 px-2 mx-2"></div>
          <div className="flex-none">
            <FaUserCircle size={24} />
          </div>
        </div>
        <div className='px-10 py-2'>
          {children}
        </div>
      </div>

      <div className="drawer-side" style={{ width: isDrawerCollapsed ? '8rem' : '20rem', transition: 'width 0.3s ease' }}>
        <label htmlFor="my-drawer" className="drawer-overlay" onClick={toggleDrawer}></label>
        <ul className="menu p-4 min-h-full text-base-content">
          <li className="text-center p-4">
            <h1 className="text-3xl font-bold italic" 
              style={{ 
                  background: 'linear-gradient(to bottom, #01B9DE, #0190AD)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 700,
                  fontSize: isDrawerCollapsed ? '1rem' : '1.5rem', // Adjust font size based on drawer state
                }}>
              Tour & Travel
            </h1>
          </li>
          {MENU.map(({ href, label, icon, isHidden }) => 
            !isHidden && (
              <li key={href}>
                <Link href={href}>
                  <span className="flex items-center gap-4 p-2 rounded hover:bg-blue-100">
                    {icon}
                    <span className={`flex-1 text-lg ${isDrawerCollapsed ? 'hidden' : ''}`}>{label}</span>
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
              <span className={`${isDrawerCollapsed ? 'hidden' : ''}`}>Sign Out</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
