import Image from 'next/image'

export default function HowTo() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-center gap-4 flex-col lg:flex-row-reverse ">
        <Image
          src="/assets/card-package-information.png"
          width={700}
          height={700}
          alt="card package information"
        />
        <div className="w-full">
          <p className="text-[#01B9DE] font-bold text-md">Bagaimana Caranya</p>

          <h1 className="text-5xl font-bold ">
            Langkah-langkah untuk mendaftar di Platform Kami.
          </h1>

          <p className="w-1/2 my-2">
            Lorem ipsum dolor sit amet consectetur. Eu id in tortor elementum
            eget. Eget lorem egestas quis sed turpis. Luctus lectus augue
            senectus tincidunt. Vulputate cursus in ullamcorper purus ligula..
          </p>

          <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 gap-[20px] mt-4">
            <div className="card bg-[#F2F4F7] text-primary-content">
              <div className="card-body">
                <div className="grid">
                  <Image
                    src="/assets/number-01.png"
                    width={75}
                    height={75}
                    alt="1"
                  />
                  <h2 className="card-title text-[#01B9DE] text-2xl font-bold ">
                    Akses Platform & Pilih Paket
                  </h2>
                  <p className="text-[#667085] text-lg text-balance">
                    Calon jamaah mengakses platform agen perjalanan, memilih
                    paket haji atau umrah yang diinginkan.
                  </p>
                </div>
              </div>
            </div>
            <div className="card text-primary-content">
              <div className="card-body">
                <Image
                  src="/assets/number-02.png"
                  width={75}
                  height={75}
                  alt="2"
                />
                <h2 className="card-title text-black text-2xl font-bold ">
                  Pendaftaran dan Pembayaran
                </h2>
                <p className="text-[#667085] text-lg text-balance">
                  Mereka mendaftar dan membayar biaya perjalanan melalui
                  platform.
                </p>
              </div>
            </div>
            <div className="card text-primary-content">
              <div className="card-body">
                <Image
                  src="/assets/number-03.png"
                  width={75}
                  height={75}
                  alt="3"
                />
                <h2 className="card-title text-black text-2xl font-bold ">
                  Konfirmasi via WhatsApp
                </h2>
                <p className="text-[#667085] text-lg text-balance">
                  Setelah pembayaran diverifikasi, agen perjalanan mengirim
                  konfirmasi melalui pesan WhatsApp.
                </p>
              </div>
            </div>
            <div className="card text-primary-content">
              <div className="card-body">
                <Image
                  src="/assets/number-04.png"
                  width={75}
                  height={75}
                  alt="4"
                />
                <h2 className="card-title text-black text-2xl font-bold ">
                  Persiapan Akhir
                </h2>
                <p className="text-[#667085] text-lg text-balance">
                  Calon jamaah menyelesaikan administrasi dan persiapan lainnya
                  sesuai petunjuk agen perjalanan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
