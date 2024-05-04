import Image from 'next/image'
import { FaCheck } from 'react-icons/fa'

export default function Packages() {
  return (
    <div className="container mx-auto my-12">
      <div className="mb-10 flex-col justify-center items-center gap-1 flex">
        <h2 className=" text-2xl font-bold text-[#01B9DE]">
          Paket Tour & Travel
        </h2>
        <h1 className="text-6xl font-bold text-black text-center">
          Temukan Paket Perjalanan yang Tepat untuk Anda
        </h1>
        <p className="text-gray-400 text-lg font-normal leading-7">
          Beragam pilihan paket Haji & Umrah yang memenuhi kebutuhan dan
          preferensi Anda.
        </p>
      </div>

      <div className="flex flex-row gap-2 justify-center">
        <button className="flex-initial w-36 btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] btn-ghost text-white rounded-full font-semibold">
          Semua Layanan
        </button>
        <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost">
          Haji
        </button>
        <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost">
          Umrah
        </button>
      </div>

      <div className="flex flex-wrap gap-[30px] justify-center items-center mt-[40px]">
        <PackageCard />
        <PackageCard />
        <PackageCard />
      </div>

      <div className="flex justify-center mt-8">
        <div className="join gap-1">
          <button className="btn btn-ghost rounded-lg">Previous</button>
          <button className="btn btn-ghost rounded-lg hover:bg-sky-100">
            1
          </button>
          <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">
            2
          </button>
          <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">
            3
          </button>
          <button className=" btn btn-ghost">...</button>
          <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">
            8
          </button>
          <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">
            9
          </button>
          <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">
            10
          </button>
          <button className="btn btn-ghost rounded-lg ">Next</button>
        </div>
      </div>
    </div>
  )
}

function PackageCard() {
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure>
        <Image
          src="/assets/card-image.png"
          width={700}
          height={700}
          alt="Picture of the author"
        />
      </figure>
      <div className="p-4 flex flex-col gap-2">
        <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">
          Haji
        </div>

        <h2 className="card-title text-md font-bold">Paket Bronze Haji</h2>

        <p className="font-bold text-lg">Rp. {(90000000).toLocaleString()}</p>

        <ul className="p-4 border border-base-300 flex flex-col gap-2">
          <li className="flex gap-2 items-center">
            <FaCheck /> Tiket Pesawat PP Kelas Ekonomi
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck /> Makkah Kelas Ekonomi
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck /> Perlengkapan & Manasik
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck /> Akomodasi Hotel
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck /> Makan 3x Catering Hotel
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck />
            Tour Leader/Ustadz Pembimbing
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck />
            Handling di Jakarta & Arab Saudi
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck /> Asuransi Perjalanan
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck />
            Ziarah & City Tour (Jika di Izinkan)
          </li>
          <li className="flex gap-2 items-center">
            <FaCheck />
            Air Zam-zam 5 liter (Jika di Izinkan)
          </li>
        </ul>
        <button className="btn w-full text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">
          Pilih Paket
        </button>
      </div>
    </div>
  )
}
