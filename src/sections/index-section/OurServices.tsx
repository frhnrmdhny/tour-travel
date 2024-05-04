import Image from 'next/image'

export default function OurServices() {
  return (
    <div className="container mx-auto mb-12">
      <div className="card bg-[#003B47] text-primary-content p-10 rounded-3xl ">
        <div className="card-body">
          <h1 className="card-title text-[#01B9DE] text-2xl font-semibold leading-loose">
            Layanan Kami
          </h1>
          <div className="inline-flex gap-96">
            <h2 className="text-white text-3xl font-bold text-balance">
              Temukan Layanan Berkualitas Tinggi dan Pengalaman Berkesan Bersama
              Kami!
            </h2>
            <p className="text-white text-base font-normal leading-normal text-balance">
              Tingkatkan pengalaman perjalanan Anda dengan layanan kami dari
              rencana hingga realisasi, Kami hadir untuk memberikan kemudahan,
              kesejahteraan, dan kenangan abadi dalam setiap perjalanan Anda.
            </p>
          </div>

          <div className="py-10 grid grid-cols-3 gap-4">
            <div className="card border border-cyan-500 text-primary-content ">
              <div className="card-body ">
                <div className="avatar">
                  <div className="w-20">
                    <Image
                      src="/assets/card-icon-1.png"
                      width={512}
                      height={512}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
                <h2 className="card-title text-white text-xl font-bold leading-[30px]">
                  Paket Haji & Umrah Premium
                </h2>
                <p className="text-gray-400 text-sm font-normal">
                  Layanan ini menawarkan pengalaman ibadah haji dan umrah yang
                  tak terlupakan dengan fasilitas premium. Jamaah akan
                  mendapatkan akomodasi yang nyaman dan mewah, transportasi yang
                  aman dan nyaman, serta panduan langsung oleh pendamping yang
                  berpengalaman.
                </p>
              </div>
            </div>
            <div className="card border border-gray-500 text-primary-content ">
              <div className="card-body ">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <Image
                      src="/assets/card-icon-2.png"
                      width={512}
                      height={512}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
                <h2 className="card-title text-white text-xl font-bold leading-[30px] ">
                  Pendampingan Profesional
                </h2>
                <p className="text-gray-400 text-sm font-normal">
                  Layanan ini menekankan pentingnya pendampingan profesional
                  selama perjalanan haji dan umrah. Para jamaah akan didampingi
                  oleh tim yang terlatih dan berpengalaman dalam menangani
                  kebutuhan ibadah serta logistik perjalanan.
                </p>
              </div>
            </div>
            <div className="card border border-gray-500 text-primary-content">
              <div className="card-body">
                <div className="avatar">
                  <div className="w-20 rounded-full">
                    <Image
                      src="/assets/card-icon-3.png"
                      width={512}
                      height={512}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
                <h2 className="card-title text-white text-xl font-bold leading-[30px]">
                  Terkelola Dengan Baik
                </h2>
                <p className="text-gray-400 text-sm font-normal">
                  Layanan ini menekankan manajemen perjalanan yang terorganisir
                  dengan baik demi kepentingan kesejahteraan dan kepuasan
                  jamaah. Semua aspek perjalanan, mulai dari akomodasi,
                  transportasi, hingga kebutuhan harian.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
