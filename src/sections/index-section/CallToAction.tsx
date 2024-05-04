import Image from 'next/image'
import BackgroundHero from '~/../public/assets/bg-hero-2.png'

export default function CallToAction() {
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
              Masih Bingung Mau Pilih Paket Mana? Konsultasi Dengan Pada Kami!{' '}
            </h1>
            <p className="mb-5 text-lg text-gray-100 font-normal leading-7">
              Hubungi kami untuk konsultasi apabila masih bingung untuk memilih
              paket yang ada di platform.
            </p>
            <button className="flex-initial w-36 btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white btn-ghost rounded-full font-semibold">
              PIlih Paket
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
