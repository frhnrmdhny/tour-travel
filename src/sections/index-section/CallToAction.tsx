import Image from 'next/image'

export default function CallToAction() {
  return (
    <div className="hero z-10">
      <Image
        src="/assets/bg-hero-2.png"
        width={1600}
        height={900}
        alt="Picture of the author"
      />
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="">
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
  )
}
