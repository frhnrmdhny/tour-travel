import Image from 'next/image'

export default function Portfolio() {
  return (
    <div className="container mx-auto my-12">
      <div className="flex justify-center gap-4 items-center flex-col lg:flex-row">
        <div className="grid grid-rows-2 grid-flow-col gap-2 w-1/2 grow">
          <div className="row-span-2 col-span-2 ">
            <Image
              src="/assets/image-1.png"
              width={200}
              height={200}
              alt="portfolio image 1"
              className="mb-2 rounded-lg"
            />
            <Image
              src="/assets/image-2.png"
              width={200}
              height={200}
              alt="portfolio image 2"
              className="rounded-lg"
            />
          </div>

          <div className="row-span-3 ...">
            <Image
              src="/assets/image-3.png"
              width={400}
              height={900}
              alt="portfolio image 2"
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold">
            Nikmati Ibadah Anda Dengan Pengalaman Baru
          </h1>

          <p>
            Jelajahi dunia dengan mata baru dengan temukan keindahan dan
            kebahagiaan dalam setiap perjalanan bersama Kami.
          </p>

          <div className="flex gap-6">
            <div>
              <p className="font-bold">4 Years +</p>
              <p>Experience</p>
            </div>
            <div>
              <p className="font-bold">23.000 +</p>
              <p>Jemaah Umrah</p>
            </div>
            <div>
              <p className="font-bold">2.000 +</p>
              <p>Jemaah Haji</p>
            </div>
          </div>

          <div>
            <button className="flex-initial w-36 btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white btn-ghost rounded-full font-semibold">
              PIlih Paket
            </button>
            <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost">
              Hubungi Kami
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
