import Image from 'next/image'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import BackgroundHero from '~/../public/assets/bg-hero-1.png'

export default function Hero() {
  return (
    <div
      className="container mx-auto relative w-full h-full mt-8"
      style={{
        aspectRatio: 2880 / 2048
      }}
    >
      <Image
        alt="background hero"
        src={BackgroundHero}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'contain',
          objectPosition: 'top'
        }}
        className="-z-10"
      />

      <div className="navbar pt-4">
        <div className="flex justify-between items-center w-full px-8">
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

      <div className="w-full h-full text-center flex items-center justify-center pb-20">
        <div>
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
