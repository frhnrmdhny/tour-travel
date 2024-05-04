import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

export default function Hero() {
  return (
    <div className="hero min-h-screen relative">
      <div className="navbar absolute top-8">
        <div className="container mx-auto flex justify-between items-center">
          <h1
            className="text-2xl font-bold italic link"
            style={{
              background: 'linear-gradient(to bottom, #01B9DE, #0190AD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800
            }}
          >
            Tour & Travel
          </h1>

          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={'/'} className="text-white link">
                Daftar Harga
              </Link>
            </li>
            <li>
              <Link href={'/'} className="text-white link">
                Kontak Kami
              </Link>
            </li>
            <li>
              <Link href={'/'} className="text-white link">
                Tentang Kami
              </Link>
            </li>
          </ul>

          <button className="btn btn-ghost btn-md rounded-full bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white ">
            Hubungi Kami
            <FaArrowRight />
          </button>
        </div>
      </div>

      <Image
        src="/assets/bg-hero-1.png"
        width={1600}
        height={900}
        alt="hero image"
      />

      <div className="hero-content text-center text-neutral-content">
        <div className="">
          <h1 className="mb-2 text-5xl font-bold leading-[60px] text-center text-white ">
            Welcome to Tours & Travel{' '}
          </h1>
          <p className="mb-5 text-lg text-white font-normal leading-7">
            Book your ticket, explore amazing tours, and plan your next
            adventure with us.
          </p>
          <button className="btn btn-ghost btn-lg rounded-full bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white">
            Mulai Sekarang
          </button>
        </div>
      </div>
    </div>
  )
}
