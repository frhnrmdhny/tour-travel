import Image from 'next/image'

export default function Benefits() {
  return (
    <div className="container mx-auto my-12">
      <div className="flex items-center justify-center gap-4 flex-col lg:flex-row">
        <Image
          src="/assets/card-information-2.png"
          width={1248}
          height={1664}
          alt="Picture of the author"
        />

        <div>
          <h1 className="text-5xl font-bold">
            4 Unggulan Layanan <br /> Kami Kepada Customer
          </h1>
          <p className="text-gray-400 text-balance w-1/2 my-2">
            Menggali lebih dalam tentang keunggulan layanan kami dalam memenuhi
            kebutuhan transportasi Anda.
          </p>
          <div className="mt-4">
            <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 gap-2">
              <div className="card bg-[#F2F4F7] text-primary-content">
                <div className="card-body">
                  <Image
                    src="/assets/number-01.png"
                    width={75}
                    height={75}
                    alt="Picture of the author"
                  />
                  <h2 className="card-title text-[#01B9DE] text-2xl font-bold ">
                    Pengalaman Terpercaya
                  </h2>
                  <p className="text-[#667085] text-lg">
                    Kami telah mengakumulasi pengalaman yang solid dan luas
                    dalam menyelenggarakan perjalanan haji dan umrah, memberikan
                    keamanan dan keyakinan kepada pelanggan.
                  </p>
                </div>
              </div>
              <div className="card text-primary-content">
                <div className="card-body">
                  <Image
                    src="/assets/number-02.png"
                    width={75}
                    height={75}
                    alt="Picture of the author"
                  />
                  <h2 className="card-title text-black text-2xl font-bold ">
                    Pelayanan Personalisasi
                  </h2>
                  <p className="text-[#667085] text-lg">
                    Kami menyediakan pelayanan yang disesuaikan dengan kebutuhan
                    dan preferensi individu setiap pelanggan, memastikan
                    pengalaman perjalanan yang sesuai dengan harapan mereka.
                  </p>
                </div>
              </div>
              <div className="card text-primary-content">
                <div className="card-body">
                  <Image
                    src="/assets/number-03.png"
                    width={75}
                    height={75}
                    alt="Picture of the author"
                  />
                  <h2 className="card-title text-black text-2xl font-bold ">
                    Kemudahan Akses
                  </h2>
                  <p className="text-[#667085] text-lg">
                    Melalui platform digital kami yang mudah diakses, pelanggan
                    dapat dengan cepat mengakses informasi, melakukan
                    pendaftaran, dan berkomunikasi dengan kami, menjadikan
                    proses pemesanan lebih lancar dan efisien..
                  </p>
                </div>
              </div>
              <div className="card text-primary-content">
                <div className="card-body">
                  <Image
                    src="/assets/number-04.png"
                    width={75}
                    height={75}
                    alt="Picture of the author"
                  />
                  <h2 className="card-title text-black text-2xl font-bold ">
                    Bimbingan Terampil
                  </h2>
                  <p className="text-[#667085] text-lg">
                    Tim kami terdiri dari profesional berpengalaman yang siap
                    memberikan panduan yang terampil sepanjang perjalanan,
                    memberikan dukungan penuh kepada pelanggan dalam setiap
                    tahap perjalanan mereka.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
