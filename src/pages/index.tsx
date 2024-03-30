import { FaRegCircleCheck } from "react-icons/fa6";
import BackgroundHero2 from "public/assets/bg-hero-2.png"
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <nav className="flex items-center justify-between bg-[#003B47]">
        <div className="px-12 py-2">
          <h1 className="text-2xl font-bold italic"
            style={{
              background: 'linear-gradient(to bottom, #01B9DE, #0190AD)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              //  fontSize: isDrawerCollapsed ? '1rem' : '1.5rem', // Adjust font size based on drawer state
            }}>
            Tour & Travel
          </h1>
        </div>
        <div className="px-10">
          <ul className="flex gap-10">
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                Daftar Harga
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                Kontak
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200">
                Tentang Kami
              </a>
            </li>
          </ul>
        </div>
        <button className="btn btn-active bg-[#01B9DE] hover:bg-sky-500 rounded-full text-white font-medium">Hubungi Kami</button>
      </nav>

      {/* <header className="bg-transparent py-4">
        <div className="container mx-auto px-4">
          
        </div>
      </header> */}

      {/* <section className="container mx-auto p-4 items-center flex justify-center h-full">
        
      </section> */}

      {/* Hero 1 */}
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-2 text-5xl font-bold leading-[60px] text-center text-white ">Welcome to Tours & Travel </h1>
            <p className="mb-5 text-lg text-white font-normal leading-7">Book your ticket, explore amazing tours, and plan your next adventure with us.</p>
            <button className="btn bg-[#01B9DE] hover:bg-sky-500 rounded-full text-white">Mulai Sekarang</button>
          </div>
        </div>
      </div>


      <div className="p-20">
        <div className="card bg-[#003B47] text-primary-content p-10 rounded-3xl ">
          <div className="card-body">

            <h1 className="card-title text-[#01B9DE] text-2xl font-semibold leading-loose">Layanan Kami</h1>
            <div className="inline-flex gap-96">
              <h2 className="text-white text-3xl font-bold text-balance">Temukan Layanan Berkualitas Tinggi dan Pengalaman Berkesan Bersama Kami!</h2>
              <p className="text-white text-base font-normal leading-normal text-balance">Tingkatkan pengalaman perjalanan Anda dengan layanan kami dari rencana hingga realisasi, Kami hadir untuk memberikan kemudahan, kesejahteraan, dan kenangan abadi dalam setiap perjalanan Anda.</p>
            </div>

            <div className="py-10 grid grid-cols-3">
              <div className="card w-96 border border-cyan-500 text-primary-content ">
                <div className="card-body ">
                  <div className="avatar">
                    <div className="w-20 rounded-full  border-2 border-cyan-500 rounded">
                      <img src="" />
                    </div>
                  </div>
                  <h2 className="card-title text-white text-xl font-bold leading-[30px]">Paket Haji & Umrah Premium</h2>
                  <p className="text-gray-400 text-sm font-normal">Layanan ini menawarkan pengalaman ibadah haji dan umrah yang tak terlupakan dengan fasilitas premium. Jamaah akan mendapatkan akomodasi yang nyaman dan mewah, transportasi yang aman dan nyaman, serta panduan langsung oleh pendamping yang berpengalaman.</p>
                </div>
              </div>
              <div className="card w-96 border border-gray-500 text-primary-content ">
                <div className="card-body ">
                  <div className="avatar">
                    <div className="w-20 rounded-full  border-2 border-gray-500 rounded">
                      <img src="" />
                    </div>
                  </div>
                  <h2 className="card-title text-white text-xl font-bold leading-[30px] ">Pendampingan Profesional</h2>
                  <p className="text-gray-400 text-sm font-normal">Layanan ini menekankan pentingnya pendampingan profesional selama perjalanan haji dan umrah. Para jamaah akan didampingi oleh tim yang terlatih dan berpengalaman dalam menangani kebutuhan ibadah serta logistik perjalanan.</p>
                </div>
              </div>
              <div className="card w-96 border border-gray-500 text-primary-content">
                <div className="card-body">
                  <div className="avatar">
                    <div className="w-20 rounded-full  border-2 border-gray-500 rounded">
                      <img src="" />
                    </div>
                  </div>
                  <h2 className="card-title text-white text-xl font-bold leading-[30px]">Terkelola Dengan Baik</h2>
                  <p className="text-gray-400 text-sm font-normal">Layanan ini menekankan manajemen perjalanan yang terorganisir dengan baik demi kepentingan kesejahteraan dan kepuasan jamaah. Semua aspek perjalanan, mulai dari akomodasi, transportasi, hingga kebutuhan harian.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="p-20">
        <div className="mb-10 flex-col justify-center items-start gap-1 flex">
          <h1 className="text-slate-800 text-5xl font-bold leading-[60px]">
            Tentang Kami
          </h1>
          <p className="text-gray-400 text-lg font-normal leading-7">Membangun fondasi yang kokoh dari kisah Kami, nilai-nilai Kami, dan komitmen Kami untuk memberikan layanan terbaik dalam industri perjalanan, menginspirasi dan melayani Anda dengan penuh dedikasi dan integritas.</p>
        </div>
        <div className="card bg-[#003B47] text-primary-content p-10 rounded-3xl shadow-lg ">
          <div className="card-body">
            <div className="hero-content flex-col lg:flex-row">

              <div>
                <h1 className="text-3xl text-white leading-[36px] font-bold">About Tour & Travel</h1>
                <p className="py-6 text-wrap">Tour & travel adalah industri yang berkaitan dengan penyediaan layanan perjalanan, termasuk pemesanan tiket, akomodasi, transportasi, dan kegiatan wisata bagi individu atau kelompok. Layanan ini mencakup berbagai jenis perjalanan, mulai dari liburan keluarga, perjalanan bisnis, perjalanan petualangan, hingga perjalanan religius seperti haji dan umrah. Tour & travel berperan penting dalam membantu pelanggan merencanakan dan menjalani pengalaman perjalanan yang menyenangkan, aman, dan berkesan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20 ">
        <div className="">
          <div className="mb-10 flex-col justify-center items-start flex gap-2">
            <h2 className="text-cyan-500 text-2xl font-semibold leading-loose">
              Bagimana caranya
            </h2>
            <h1 className="text-slate-800 text-5xl font-bold ">
              Langkah-langkah untuk <br />mendaftar di Platform <br />Kami.
            </h1>
            <p className="text-gray-400 text-lg font-normal text-balance ">Lorem ipsum dolor sit amet consectetur. Eu id in tortor elementum eget. Eget lorem egestas quis sed turpis. Luctus lectus augue senectus tincidunt. Vulputate cursus in ullamcorper purus ligula.</p>

            <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 gap-2">
              <div className="card bg-[#F2F4F7] text-primary-content ">
                <div className="card-body">
                  <h2 className="card-title text-[#01B9DE] text-2xl font-bold ">Akses Platform & Pilih Paket</h2>
                  <p className="text-[#667085] text-lg">Calon jamaah mengakses platform agen perjalanan, memilih paket haji atau umrah yang diinginkan.</p>
                </div>
              </div>
              <div className="card text-primary-content ">
                <div className="card-body">
                  <h2 className="card-title text-black text-2xl font-bold ">Pendaftaran dan Pembayaran</h2>
                  <p className="text-[#667085] text-lg">Mereka mendaftar dan membayar biaya perjalanan melalui platform.</p>
                </div>
              </div>
              <div className="card text-primary-content ">
                <div className="card-body">
                  <h2 className="card-title text-black text-2xl font-bold ">Konfirmasi via WhatsApp</h2>
                  <p className="text-[#667085] text-lg">Setelah pembayaran diverifikasi, agen perjalanan mengirim konfirmasi melalui pesan WhatsApp.</p>
                </div>
              </div>
              <div className="card text-primary-content ">
                <div className="card-body">
                  <h2 className="card-title text-black text-2xl font-bold ">Persiapan Akhir</h2>
                  <p className="text-[#667085] text-lg">Calon jamaah menyelesaikan administrasi dan persiapan lainnya sesuai petunjuk agen perjalanan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20">
        <div className="mb-10 flex-col justify-center items-center gap-1 flex">
          <h2 className=" text-2xl font-bold text-[#01B9DE]">
            Paket Tour & Travel
          </h2>
          <h1 className="text-6xl font-bold text-black">Temukan Paket Perjalanan yang Tepat untuk Anda</h1>
          <p className="text-gray-400 text-lg font-normal leading-7">Beragam pilihan paket Haji & Umrah yang memenuhi kebutuhan dan preferensi Anda.</p>
        </div>
        <div className="flex flex-row gap-2 justify-center">
          <button className="flex-initial w-36 btn bg-[#01B9DE] text-white rounded-full font-semibold">Semua Layanan</button>
          <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost">Haji</button>
          <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost">Umrah</button>
        </div>
        <div className="flex flex-wrap gap-[30px] justify-center items-center mt-[40px]">
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3"> Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3">Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3">Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3">Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Fio Haji</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3">Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Bronze Haji</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3">Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Silver</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3">Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="image" /></figure>
            <div className="card-body">
              <div className="badge bg-[#01B9DE] text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Gol Haji</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium ">
                  Fitur Paket
                </div>
                <div className="collapse-content bg-white border border-base-300 shadow-md">
                  <p className="mt-3">Tiket Pesawat PP Kelas Ekonomi</p>
                  <p className="mt-3">Makkah Kelas Ekonomi</p>
                  <p className="mt-3">Perlengkapan & Manasik </p>
                  <p className="mt-3">Akomodasi Hotel </p>
                  <p className="mt-3">Makan 3x Catering Hotel </p>
                  <p className="mt-3">Tour Leader/Ustadz Pembimbing </p>
                  <p className="mt-3">Handling di Jakarta & Arab Saudi </p>
                  <p className="mt-3">Asuransi Perjalanan </p>
                  <p className="mt-3">Ziarah & City Tour (Jika di Izinkan) </p>
                  <p className="mt-3">Air Zam-zam 5 liter (Jika di Izinkan) </p>
                </div>
              </div>
              <button className="btn text-black font-medium text-md rounded-full bg-white outline outline-gray-200 mt-4">Pilih Paket</button>
            </div>
          </div>
          <div>
            <div className="join gap-1">
              <button className="btn btn-ghost rounded-lg">Previous</button>
              <button className="btn btn-ghost rounded-lg hover:bg-sky-100">1</button>
              <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">2</button>
              <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">3</button>
              <button className=" btn btn-ghost">...</button>
              <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">8</button>
              <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">9</button>
              <button className=" btn btn-ghost rounded-lg hover:bg-sky-100">10</button>
              <button className="btn btn-ghost rounded-lg ">Next</button>
            </div>
          </div>
        </div>
      </div>







      {/* Hero 2 */}
      <div className="hero min-h-screen z-10" style={{ backgroundImage: '../assets/bg-hero-2.png)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-2 text-4xl font-bold leading-[60px] text-center text-white ">Masih Bingung Mau Pilih Paket Mana? Konsultasi Dengan Pada Kami! </h1>
            <p className="mb-5 text-lg text-gray-100 font-normal leading-7">Hubungi kami untuk konsultasi apabila masih bingung untuk memilih paket yang ada di platform.</p>
            <button className="flex-initial w-36 btn bg-[#01B9DE] text-white rounded-full font-semibold">PIlih Paket</button>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen">
        <div className="hero-content flex-row">
          <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className=" rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">4 Unggulan Layanan <br /> Kami Kepada Customer</h1>
            <p className="text-gray-400 text-pretty">Menggali lebih dalam tentang keunggulan layanan Trijaya Trans Indo Mandiri dalam memenuhi kebutuhan transportasi Anda.</p>

          </div>
        </div>
      </div>

      <div className="p-20">
        <div className="mb-10 flex-col justify-center items-center gap-1 flex">
          <h1 className="text-5xl font-bold text-black">Pertanyaan Umum Perjalanan Haji & Umrah</h1>
          <p className="text-gray-400 text-lg font-normal ">Jawaban atas pertanyaan yang sering diajukan untuk memahami lebih lanjut tentang persiapan dan proses perjalanan Anda.</p>
        </div>
        <div className="flex flex-wrap">
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium text-[#01B9DE] text-lg font-bold">
              Apa yang dibutuhkan untuk mendaftar sebagai jamaah haji atau umrah?
            </div>
            <div className="collapse-content">
              <p className="text-">Untuk mendaftar sebagai jamaah haji atau umrah, Anda akan membutuhkan paspor yang berlaku, serta dokumen-dokumen tambahan seperti surat keterangan kesehatan dan bukti pembayaran.</p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
              Bagaimana cara memilih paket haji atau umrah yang sesuai?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
              Berapa lama biasanya perjalanan haji atau umrah berlangsung?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
              Apa saja persiapan yang perlu dilakukan sebelum berangkat?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
              Bagaimana dengan pengaturan akomodasi dan transportasi selama perjalanan?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
              Apakah ada peraturan khusus yang harus diikuti selama perjalanan haji atau umrah?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
              Bagaimana dengan prosedur keamanan dan kesehatan selama perjalanan?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-xl font-medium">
              Apa yang harus dilakukan jika ada masalah atau keadaan darurat selama perjalanan?
            </div>
            <div className="collapse-content">
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-2 text-4xl font-bold leading-[60px] text-center text-white ">Tunggu Apalagi, Ayo Pilih Paket Kami Sekarang!</h1>
            <button className="flex-initial w-36 btn bg-[#01B9DE] text-white rounded-full font-semibold">PIlih Paket</button>
            <button className="flex-initial w-36 btn text-white rounded-full btn-ghost">Hubungi Kami</button>
          </div>
        </div>
      </div>

      <div className="p-20">
        <footer className="footer p-10 text-base-content bg-[#003B47] rounded-xl">
          <div className="mt-2">
            <h1 className="text-white text-xl font-bold font-italic">Tour & Travel</h1>
            <p className="text-gray-300 font-semibold">Kantor Pusat</p>
            <p className="text-white">Jl. Lokomotif Kav.pjka No.28-30 RT.007 RW.014 Padasuka, Cimahi Tengah</p>
            <p className="text-gray-300 font-semibold">Call Center</p>
            <p className="text-white font-normal">cs@tourtravel.com</p>
            <p className="text-white font-normal">(+62) 851 - 1111 - 1111</p>
            <p className="text-white font-normal">tourtravel.bandung</p>
          </div>
          <nav>
            <h6 className="footer-title text-[#D0D5DD]">Menu</h6>
            <a className="link link-hover text-white">Daftar Harga</a>
            <a className="link link-hover text-white">Kontak Kami</a>
            <a className="link link-hover text-white">Tentang Kami</a>
          </nav>
          <nav>
            <h6 className="footer-title text-[#D0D5DD]">Paket</h6>
            <a className="link link-hover text-white">Haji</a>
            <a className="link link-hover text-white">Umrah</a>
          </nav>
          <nav>
            <h6 className="footer-title text-[#D0D5DD]">Resource</h6>
            <a className="link link-hover text-white">FAQ</a>
            <a className="link link-hover text-white">Testimonialy</a>
          </nav>
          <nav>
            <h6 className="footer-title text-[#D0D5DD]">Tetap Terhubung</h6>

            <a className="text-md font-bold text-white">Melangkah Bersama Menuju Puncak Kesucian</a>
            <a className="text-md font-normal text-white">Menyemai Makna dalam Setiap Langkah Perjalanan Anda</a>
          </nav>
        </footer>

      </div>


    </div >
  )
}