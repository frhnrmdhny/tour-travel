import Link from 'next/link'
import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaPhone,
  FaTiktok,
  FaYoutube
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function InfoBar() {
  return (
    <>
      <div className="navbar bg-[#003B47]">
        <div className="container mx-auto">
          <div className="navbar-start flex">
            <div className="p-2 text-white flex gap-2 items-center">
              <FaPhone />
              <p>(+62) 851 - 1111 - 1111</p>
            </div>
            <div className="p-2 text-white flex gap-2 items-center">
              <MdEmail /> <p>cs@tourtravel.com</p>
            </div>
            <div className="p-2 text-white flex gap-2 items-center">
              <FaClock /> <p>Mon - Fri 08.00 - 18.00</p>
            </div>
          </div>
          <div className="navbar-end gap-4 flex text-white px-2">
            <Link href={'/'} className="link">
              <MdEmail />
            </Link>
            <Link href={'/'} className="link">
              <FaFacebook />
            </Link>
            <Link href={'/'} className="link">
              <FaYoutube />
            </Link>
            <Link href={'/'} className="link">
              <FaInstagram />
            </Link>
            <Link href={'/'} className="link">
              <FaTiktok />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
