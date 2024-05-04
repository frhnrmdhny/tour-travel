import Link from 'next/link'
import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaMap,
  FaPhone,
  FaTiktok,
  FaYoutube
} from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="container mx-auto my-12 bg-[#003B47] rounded-xl p-10 text-white">
      <div className="footer font-medium">
        <div>
          <h1
            className="text-2xl font-bold italic"
            style={{
              background: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: '#FFFFFF',
              fontWeight: 800
            }}
          >
            Tour & Travel
          </h1>
          <p className="text-gray-300 font-semibold">Kantor Pusat</p>
          <p className=" flex gap-2 items-center p-2">
            <FaMap /> Jl. Pertamina Wates, Binong, Kec. Binong, <br /> Kabupaten
            Subang, Jawa Barat 41253
          </p>
          <p className="text-gray-300 font-semibold">Call Center</p>
          <div className="p-2  flex gap-2 items-center">
            <FaPhone />
            <p>(+62) 851 - 1111 - 1111</p>
          </div>
          <div className="p-2  flex gap-2 items-center">
            <MdEmail /> <p>cs@tourtravel.com</p>
          </div>
          <div className="p-2  flex gap-2 items-center">
            <FaClock /> <p>Mon - Fri 08.00 - 18.00</p>
          </div>
        </div>

        <nav>
          <h6 className="footer-title text-[#D0D5DD]">Menu</h6>
          <a className="link link-hover ">Daftar Harga</a>
          <a className="link link-hover ">Kontak Kami</a>
          <a className="link link-hover ">Tentang Kami</a>
        </nav>

        <nav>
          <h6 className="footer-title text-[#D0D5DD]">Paket</h6>
          <a className="link link-hover ">Haji</a>
          <a className="link link-hover ">Umrah</a>
        </nav>

        <nav>
          <h6 className="footer-title text-[#D0D5DD]">Resource</h6>
          <a className="link link-hover ">FAQ</a>
          <a className="link link-hover ">Testimonialy</a>
        </nav>

        <nav>
          <h6 className="footer-title text-[#D0D5DD]">Tetap Terhubung</h6>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Link
                  href={'/'}
                  className="h-10 w-10 link rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(180deg, #01B9DE 0%, #0190AD 100%)'
                  }}
                >
                  <MdEmail className="text-xl" />
                </Link>

                <Link
                  href={'/'}
                  className="h-10 w-10 link rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(180deg, #01B9DE 0%, #0190AD 100%)'
                  }}
                >
                  <FaFacebook className="text-xl" />
                </Link>

                <Link
                  href={'/'}
                  className="h-10 w-10 link rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(180deg, #01B9DE 0%, #0190AD 100%)'
                  }}
                >
                  <FaYoutube className="text-xl" />
                </Link>
              </div>

              <div className="flex gap-2">
                <Link
                  href={'/'}
                  className="h-10 w-10 link rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(180deg, #01B9DE 0%, #0190AD 100%)'
                  }}
                >
                  <FaInstagram className="text-xl" />
                </Link>

                <Link
                  href={'/'}
                  className="h-10 w-10 link rounded-full flex items-center justify-center"
                  style={{
                    background:
                      'linear-gradient(180deg, #01B9DE 0%, #0190AD 100%)'
                  }}
                >
                  <FaTiktok className="text-xl" />
                </Link>
              </div>
            </div>

            <a className="text-md font-bold ">
              Melangkah Bersama <br /> Menuju Puncak Kesucian
            </a>
            <a className="text-md font-normal ">
              Menyemai Makna dalam <br /> Setiap Langkah Perjalanan Anda
            </a>
          </div>
        </nav>
      </div>

      <div className="flex justify-center mt-8">
        <p>© 2024 Tour & Travel Website All Rights Reserved</p>
      </div>
    </footer>
  )
}
