import Image from 'next/image'
import { FaChevronRight, FaPhone } from 'react-icons/fa'

export default function LastCall() {
  return (
    <div className="hero min-h-screen">
      <Image
        src="/assets/bg-hero-3.png"
        width={1600}
        height={900}
        alt="Picture of the author"
      />
      <div className="hero-content text-center text-neutral-content">
        <div>
          <h1 className="mb-2 text-4xl font-bold leading-[60px] text-center text-white ">
            Tunggu Apalagi, Ayo Pilih Paket Sekarang!
          </h1>
          <div className="mt-8 flex justify-center gap-4">
            <button className="flex btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white btn-ghost rounded-full font-semibold">
              PIlih Paket <FaChevronRight />
            </button>
            <button className="flex btn text-white rounded-full btn-ghost">
              Hubungi Kami <FaPhone />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
