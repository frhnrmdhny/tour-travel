import Image from 'next/image'
import { FaChevronRight, FaPhone } from 'react-icons/fa'
import BackgroundHero from '~/../public/assets/bg-hero-3.png'

export default function LastCall() {
  return (
    <div className="relative">
      <div>
        <Image
          alt="background hero"
          src={BackgroundHero}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{
            objectFit: 'cover'
          }}
          objectPosition="bottom"
          className="-z-10"
        />
        <div className="container mx-auto flex justify-center items-center py-20">
          <div className="text-center text-neutral-content">
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
    </div>
  )
}
