import Image from 'next/image'

export default function Review() {
  return (
    <div className="container mx-auto my-12">
      <div className="flex gap-4 items-center justify-center flex-col lg:flex-row">
        <Image
          src={'/assets/main-review-image.png'}
          width={522}
          height={604}
          alt="main review image"
        />

        <div>
          <p className="px-2 font-semibold text-[#01B9DE] text-lg">
            Apa Kata Mereka
          </p>
          <h1 className="text-5xl font-bold text-black">
            Apa Kata Customer <br /> Tentang Kami
          </h1>
          <div className="card w-96 bg-white shadow-sm">
            <div className="card-body">
              <p className="px-2 py-2">
                Dengan layanan tour & travel mereka, perjalanan haji saya
                menjadi pengalaman yang luar biasa. Mereka tidak hanya
                menyediakan akomodasi yang nyaman dan fasilitas yang memadai,
                tetapi juga memberikan panduan yang sangat membantu sepanjang
                perjalanan. Saya sangat terkesan dengan profesionalisme dan
                keramahan tim mereka. Terima kasih atas pengalaman yang tak
                terlupakan!.
              </p>
              <div className="avatar">
                <div className="w-12 rounded-full px">
                  <Image
                    src={'/assets/review-avatar.png'}
                    width={64}
                    height={64}
                    alt="review avatar"
                  />
                </div>
                <p className="px-3 py-3 font-bold text-black">
                  Ahmad • Jamaah Haji{' '}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
