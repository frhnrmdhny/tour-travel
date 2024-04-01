import { FaRegCircleCheck } from "react-icons/fa6";
import { Poppins } from 'next/font/google'
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="">
        <div className="navbar bg-[#003B47]">
          <div className="navbar-start">
            <p className="p-2 text-white">(+62) 851 - 1111 - 1111</p>
            <p className="p-2 text-white">cs@tourtravel.com</p>
            <p className="p-2 text-white">Mon - Fri 08.00 - 18.00</p>
          </div>
          <div className="navbar-end gap-[20px] px-3 text-white px-2">
            <p>Email</p>
            <p>FB</p>
            <p>YT</p>
            <p>IG</p>
            <p>TT</p>
          </div>
        </div>
        <div className="navbar">
          <div className="navbar-start">
            <h1 className="text-2xl font-bold italic p-1"
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
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><a className="text-white">Daftar Harga</a></li>
              <li><a className="text-white">Kontak Kami</a></li>
              <li><a className="text-white">Tentang Kami</a></li>
            </ul>
          </div>
          <div className="navbar-end">
            <button className="btn btn-ghost btn-md rounded-full bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white ">Hubungi Kami</button>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen">
        <Image
          src="/assets/bg-hero-1.png"
          width={4500}
          height={3000}
          alt="Picture of the author"
        />
        <div className="hero-overlay bg-opacity-40" />
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-2 text-5xl font-bold leading-[60px] text-center text-white ">Welcome to Tours & Travel </h1>
            <p className="mb-5 text-lg text-white font-normal leading-7">Book your ticket, explore amazing tours, and plan your next adventure with us.</p>
            <button className="btn btn-ghost btn-lg rounded-full bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white">Mulai Sekarang</button>
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
                    <div className="w-20">
                      <Image
                        src="/assets/card-icon-1.png"
                        width={512}
                        height={512}
                        alt="Picture of the author"
                      />
                    </div>
                  </div>
                  <h2 className="card-title text-white text-xl font-bold leading-[30px]">Paket Haji & Umrah Premium</h2>
                  <p className="text-gray-400 text-sm font-normal">Layanan ini menawarkan pengalaman ibadah haji dan umrah yang tak terlupakan dengan fasilitas premium. Jamaah akan mendapatkan akomodasi yang nyaman dan mewah, transportasi yang aman dan nyaman, serta panduan langsung oleh pendamping yang berpengalaman.</p>
                </div>
              </div>
              <div className="card w-96 border border-gray-500 text-primary-content ">
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
                  <h2 className="card-title text-white text-xl font-bold leading-[30px] ">Pendampingan Profesional</h2>
                  <p className="text-gray-400 text-sm font-normal">Layanan ini menekankan pentingnya pendampingan profesional selama perjalanan haji dan umrah. Para jamaah akan didampingi oleh tim yang terlatih dan berpengalaman dalam menangani kebutuhan ibadah serta logistik perjalanan.</p>
                </div>
              </div>
              <div className="card w-96 border border-gray-500 text-primary-content">
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
        <div className="hero-overlay bg-white justify-between ">
          <div className="hero-content flex-col lg:flex-row-reverse ">
            <Image
              src="/assets/card-package-information.png"
              width={700}
              height={700}
              alt="Picture of the author"
            />
            <div>
              <p className="text-[#01B9DE] font-bold text-md">Bagaimana Caranya</p>
              <h1 className="text-5xl font-bold w-[614px]">Langkah-langkah untuk mendaftar di Platform Kami.</h1>
              <p className="w-[614px]">Lorem ipsum dolor sit amet consectetur. Eu id in tortor elementum eget. Eget lorem egestas quis sed turpis. Luctus lectus augue senectus tincidunt. Vulputate cursus in ullamcorper purus ligula..</p>
              <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 gap-[20px]">
                <div className="card bg-[#F2F4F7] text-primary-content w-[614px] ">
                  <div className="card-body">
                    <div className="grid">
                      <Image
                        src="/assets/number-01.png"
                        width={75}
                        height={75}
                        alt="Picture of the author"
                      />
                      <h2 className="card-title text-[#01B9DE] text-2xl font-bold ">Akses Platform & Pilih Paket</h2>
                      <p className="text-[#667085] text-lg text-balance">Calon jamaah mengakses platform agen perjalanan, memilih paket haji atau umrah yang diinginkan.</p>
                    </div>
                  </div>
                </div>
                <div className="card text-primary-conten w-[614px]t ">
                  <div className="card-body">
                    <Image
                      src="/assets/number-02.png"
                      width={75}
                      height={75}
                      alt="Picture of the author"
                    />
                    <h2 className="card-title text-black text-2xl font-bold ">Pendaftaran dan Pembayaran</h2>
                    <p className="text-[#667085] text-lg text-balance">Mereka mendaftar dan membayar biaya perjalanan melalui platform.</p>
                  </div>
                </div>
                <div className="card text-primary-content w-[614px] ">
                  <div className="card-body">
                    <Image
                      src="/assets/number-03.png"
                      width={75}
                      height={75}
                      alt="Picture of the author"
                    />
                    <h2 className="card-title text-black text-2xl font-bold ">Konfirmasi via WhatsApp</h2>
                    <p className="text-[#667085] text-lg text-balance">Setelah pembayaran diverifikasi, agen perjalanan mengirim konfirmasi melalui pesan WhatsApp.</p>
                  </div>
                </div>
                <div className="card text-primary-content w-[614px] ">
                  <div className="card-body">
                    <Image
                      src="/assets/number-04.png"
                      width={75}
                      height={75}
                      alt="Picture of the author"
                    />
                    <h2 className="card-title text-black text-2xl font-bold ">Persiapan Akhir</h2>
                    <p className="text-[#667085] text-lg text-balance">Calon jamaah menyelesaikan administrasi dan persiapan lainnya sesuai petunjuk agen perjalanan.</p>
                  </div>
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
          <button className="flex-initial w-36 btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white btn-ghost text-white rounded-full font-semibold">Semua Layanan</button>
          <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost">Haji</button>
          <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost">Umrah</button>
        </div>
        <div className="flex flex-wrap gap-[30px] justify-center items-center mt-[40px]">
          <div className="card w-72 bg-base-100 shadow-xl">
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium ">
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
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              /></figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md text-white font-medium bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white ">
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
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title text-md bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white ">
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
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">Umrah</div>
              <h2 className="card-title text-md font-bold">Paket Family Tour</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white ">
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
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Fio Haji</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white ">
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
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Bronze Haji</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium ">
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
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Silver</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium ">
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
            <figure>
              <Image
                src="/assets/card-image.png"
                width={700}
                height={700}
                alt="Picture of the author"
              />
            </figure>
            <div className="card-body">
              <div className="badge bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium w-20 h-10">Haji</div>
              <h2 className="card-title text-md font-bold">Paket Gold Haji</h2>
              <p className="font-bold text-lg">Rp</p>
              <div tabIndex={0} className="collapse collapse-arrow bg-[#01B9DE]">
                <div className="collapse-title bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white font-medium ">
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
      <div className="hero min-h-screen z-10">
        <Image
          src="/assets/bg-hero-2.png"
          width={2880}
          height={1920}
          alt="Picture of the author"
        />
        <div className="hero-overlay bg-opacity-40"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-2 text-4xl font-bold leading-[60px] text-center text-white ">Masih Bingung Mau Pilih Paket Mana? Konsultasi Dengan Pada Kami! </h1>
            <p className="mb-5 text-lg text-gray-100 font-normal leading-7">Hubungi kami untuk konsultasi apabila masih bingung untuk memilih paket yang ada di platform.</p>
            <button className="flex-initial w-36 btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white btn-ghost rounded-full font-semibold">PIlih Paket</button>
          </div>
        </div>
      </div>

      <div className="p-20">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src="/assets/card-information-2.png"
              width={1248}
              height={1664}
              alt="Picture of the author"
            />
            <div>
              <h1 className="text-5xl font-bold">4 Unggulan Layanan <br /> Kami Kepada Customer</h1>
              <p className="text-gray-400 text-balance w-[608px]">Menggali lebih dalam tentang keunggulan layanan Trijaya Trans Indo Mandiri dalam memenuhi kebutuhan transportasi Anda.</p>
              <div className="mt-3">
                <div className="grid grid-flow-row-dense grid-cols-1 grid-rows-1 gap-2">
                  <div className="card bg-[#F2F4F7] text-primary-content w-[608px] ">
                    <div className="card-body">
                      <Image
                        src="/assets/number-01.png"
                        width={75}
                        height={75}
                        alt="Picture of the author"
                      />
                      <h2 className="card-title text-[#01B9DE] text-2xl font-bold ">Pengalaman Terpercaya</h2>
                      <p className="text-[#667085] text-lg">Kami telah mengakumulasi pengalaman yang solid dan luas dalam menyelenggarakan perjalanan haji dan umrah, memberikan keamanan dan keyakinan kepada pelanggan.</p>
                    </div>
                  </div>
                  <div className="card text-primary-content w-[608px] ">
                    <div className="card-body">
                      <Image
                        src="/assets/number-02.png"
                        width={75}
                        height={75}
                        alt="Picture of the author"
                      />
                      <h2 className="card-title text-black text-2xl font-bold ">Pelayanan Personalisasi</h2>
                      <p className="text-[#667085] text-lg">Kami menyediakan pelayanan yang disesuaikan dengan kebutuhan dan preferensi individu setiap pelanggan, memastikan pengalaman perjalanan yang sesuai dengan harapan mereka.</p>
                    </div>
                  </div>
                  <div className="card text-primary-content w-[608px] ">
                    <div className="card-body">
                      <Image
                        src="/assets/number-03.png"
                        width={75}
                        height={75}
                        alt="Picture of the author"
                      />
                      <h2 className="card-title text-black text-2xl font-bold ">Kemudahan Akses</h2>
                      <p className="text-[#667085] text-lg">Melalui platform digital kami yang mudah diakses, pelanggan dapat dengan cepat mengakses informasi, melakukan pendaftaran, dan berkomunikasi dengan kami, menjadikan proses pemesanan lebih lancar dan efisien..</p>
                    </div>
                  </div>
                  <div className="card text-primary-content w-[608px] ">
                    <div className="card-body">
                      <Image
                        src="/assets/number-04.png"
                        width={75}
                        height={75}
                        alt="Picture of the author"
                      />
                      <h2 className="card-title text-black text-2xl font-bold ">Bimbingan Terampil</h2>
                      <p className="text-[#667085] text-lg">Tim kami terdiri dari profesional berpengalaman yang siap memberikan panduan yang terampil sepanjang perjalanan, memberikan dukungan penuh kepada pelanggan dalam setiap tahap perjalanan mereka.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row">

            <div className="grid grid-rows-3 grid-flow-col gap-2">
              <div className="row-span-2 col-span-2 ">
                <Image
                  src="/assets/image-1.png"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                  className="mb-4 rounded-lg"
                />
                <Image
                  src="/assets/image-1.png"
                  width={200}
                  height={200}
                  alt="Picture of the author"
                  className="rounded-lg"
                />
              </div>
              <div className="row-span-3 ...">
                <Image
                  src="/assets/image-3.png"
                  width={400}
                  height={900}
                  alt="Picture of the author"
                  className="rounded-lg"
                />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold">Nikmati Ibadah Anda Dengan Pengalaman Baru</h1>
              <p className="py-2">Jelajahi dunia dengan mata baru dengan temukan keindahan dan kebahagiaan dalam setiap perjalanan bersama Kami.</p>
              <div className="flex gap-2">
                <p className="font-bold">4 Years +</p>
                <p className="font-bold">120+</p>
                <p className="font-bold">360K+</p>
                <button className="flex-initial w-36 btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white btn-ghost rounded-full font-semibold mt-8">PIlih Paket</button>
                <button className="flex-initial w-36 btn text-[#01B9DE] rounded-full btn-ghost mt-8">Hubungi Kami</button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="p-20">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row">
            <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="w-96 rounded-lg shadow-2xl" />
            <div>
              <p className="px-2 font-semibold text-[#01B9DE] text-lg">Apa Kata Mereka</p>
              <h1 className="text-5xl font-bold text-black">Apa Kata Customer <br /> Tentang Kami</h1>
              <div className="card w-96 bg-white shadow-sm">
                <div className="card-body">
                  <p className="px-2 py-2">Dengan layanan tour & travel mereka, perjalanan haji saya menjadi pengalaman yang luar biasa. Mereka tidak hanya menyediakan akomodasi yang nyaman dan fasilitas yang memadai, tetapi juga memberikan panduan yang sangat membantu sepanjang perjalanan. Saya sangat terkesan dengan profesionalisme dan keramahan tim mereka. Terima kasih atas pengalaman yang tak terlupakan!.</p>
                  <div className="avatar">
                    <div className="w-12 rounded-full px">
                      <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                    <p className="px-3 py-3 font-bold text-black">Ahmad • Jamaah Haji </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="p-20">
        <div className="mb-10 flex-col justify-center items-center gap-1 flex">
          <h1 className="text-5xl font-bold text-black">Pertanyaan Umum Perjalanan Haji & Umrah</h1>
          <p className="text-gray-400 text-lg font-normal ">Jawaban atas pertanyaan yang sering diajukan untuk memahami lebih lanjut tentang persiapan dan proses perjalanan Anda.</p>
        </div>
        <div className="grid grid-rows-4 grid-flow-col gap-4">
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">

            <div className="collapse-title text-xl font-medium text-[#01B9DE] text-lg font-bold">
              Apa yang dibutuhkan untuk mendaftar sebagai jamaah haji atau umrah?
            </div>
            <div className="collapse-content">
              <p className="text-">Untuk mendaftar sebagai jamaah haji atau umrah, Anda akan membutuhkan paspor yang berlaku, serta dokumen-dokumen tambahan seperti surat keterangan kesehatan dan bukti pembayaran.</p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-xl font-medium">
              Bagaimana cara memilih paket haji atau umrah yang sesuai?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-xl font-medium">
              Berapa lama biasanya perjalanan haji atau umrah berlangsung?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-xl font-medium">
              Apa saja persiapan yang perlu dilakukan sebelum berangkat?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-xl font-medium">
              Bagaimana dengan pengaturan akomodasi dan transportasi selama perjalanan?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-xl font-medium">
              Apakah ada peraturan khusus yang harus diikuti selama perjalanan haji atau umrah?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-xl font-medium">
              Bagaimana dengan prosedur keamanan dan kesehatan selama perjalanan?
            </div>
            <div className="collapse-content">
              <p></p>
            </div>
          </div>
          <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title text-xl font-medium">
              Apa yang harus dilakukan jika ada masalah atau keadaan darurat selama perjalanan?
            </div>
            <div className="collapse-content">
              <p>tabIndex={0} attribute is necessary to make the div focusable</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-20">
        <div className="mb-10 flex-col justify-center items-start gap-1 flex">
          <h1 className="text-slate-800 text-5xl font-bold leading-[60px]">
            Kontak Kami
          </h1>
          <p className="text-gray-400 text-lg font-normal leading-7">Hubungi kami untuk informasi lebih lanjut dan temukan cara terbaik untuk menghubungi tim Kami dan memulai perjalanan Anda.</p>
        </div>
        <div className="">
          <div className="hero-content flex-col lg:flex-row">
            <img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" className="w-96 rounded-lg shadow-2xl" />
            <div>
              <div className="">
                <div className="card w-96 bg-[#F5FDFF] text-primary-content">
                  <div className="card-body">
                    <h2 className="font-bold text-sm text-[#01B9DE]">Office Address - <a className="text-gray-500" href="">Click to see on maps</a> </h2>
                    <p className="text-gray-500 font-medium">Jl. Sriwijaya No.92, Cigereleng, Kec. Regol, Kota Bandung, Jawa Barat 40253</p>
                  </div>
                </div>
                <div className="card w-96  text-primary-content">
                  <div className="card-body">
                    <h2 className="font-bold text-sm text-[#01B9DE]">WhatsApp - <a className="text-gray-500" href="google.com">Click to send message
                    </a> </h2>
                    <p className="text-gray-500 font-medium">(+62)851 - 1111 - 1111</p>
                  </div>
                </div>
                <div className="card w-96  text-primary-content">
                  <div className="card-body">
                    <h2 className="font-bold text-sm text-[#01B9DE]">Email - <a className="text-gray-500" href="">Click to send email</a> </h2>
                    <p className="text-gray-500 font-medium">cs@tourtravel.com</p>
                  </div>
                </div>
                <div className="card w-96  text-primary-content">
                  <div className="card-body">
                    <h2 className="font-bold text-sm text-[#01B9DE]">Tiktok - <a className="text-gray-500" href="">Click to see our tiktok</a> </h2>
                    <p className="text-gray-500 font-medium">Tour dan Travel Bandung</p>
                  </div>
                </div>
                <div className="card w-96  text-primary-content">
                  <div className="card-body">
                    <h2 className="font-bold text-sm text-[#01B9DE]">Facebook - <a className="text-gray-500" href="">Click to see our facebook</a> </h2>
                    <p className="text-gray-500 font-medium">Tour dan Travel Bandung</p>
                  </div>
                </div>
                <div className="card w-96  text-primary-content">
                  <div className="card-body">
                    <h2 className="font-bold text-sm text-[#01B9DE]">Instagram - <a className="text-gray-500" href="">Click to see our instagram</a> </h2>
                    <p className="text-gray-500 font-medium">@trourtravel.bandung</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="">
            <h1 className="mb-2 text-4xl font-bold leading-[60px] text-center text-white ">Tunggu Apalagi, Ayo Pilih Paket Kami Sekarang!</h1>
            <button className="flex-initial w-36 btn bg-gradient-to-b from-[#01B9DE] to-[#0190AD] text-white btn-ghost rounded-full font-semibold mt-8">PIlih Paket</button>
            <button className="flex-initial w-36 btn text-white rounded-full btn-ghost mt-8">Hubungi Kami</button>
          </div>
        </div>
      </div>

      <div className="p-20">
        <footer className="footer p-10 text-base-content bg-[#003B47] rounded-xl">
          <div className="mt-2">
            <h1 className="text-2xl font-bold italic"
              style={{
                background: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: '#FFFFFF',
                fontWeight: 800,
                //  fontSize: isDrawerCollapsed ? '1rem' : '1.5rem', // Adjust font size based on drawer state
              }}>
              Tour & Travel
            </h1>
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