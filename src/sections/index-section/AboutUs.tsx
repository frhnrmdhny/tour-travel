export default function AboutUs() {
  return (
    <div className="container mx-auto my-12">
      <div className="mb-10 flex-col justify-center items-start gap-1 flex">
        <h1 className="text-slate-800 text-5xl font-bold leading-[60px]">
          Tentang Kami
        </h1>
        <p className="text-gray-400 text-lg font-normal leading-7">
          Membangun fondasi yang kokoh dari kisah Kami, nilai-nilai Kami, dan
          komitmen Kami untuk memberikan layanan terbaik dalam industri
          perjalanan, menginspirasi dan melayani Anda dengan penuh dedikasi dan
          integritas.
        </p>
      </div>
      <div className="card bg-[#003B47] text-primary-content p-10 rounded-3xl shadow-lg ">
        <div className="card-body">
          <div className="flex gap-8">
            <iframe
              className="aspect-video rounded-xl"
              height="315"
              src="https://www.youtube.com/embed/moQtMet7F7w?si=JG2TYLfLS49v8_SL"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            <div>
              <h1 className="text-3xl text-white leading-[36px] font-bold">
                About Tour & Travel
              </h1>
              <p className="py-6 text-wrap">
                Tour & travel adalah industri yang berkaitan dengan penyediaan
                layanan perjalanan, termasuk pemesanan tiket, akomodasi,
                transportasi, dan kegiatan wisata bagi individu atau kelompok.
                Layanan ini mencakup berbagai jenis perjalanan, mulai dari
                liburan keluarga, perjalanan bisnis, perjalanan petualangan,
                hingga perjalanan religius seperti haji dan umrah. Tour & travel
                berperan penting dalam membantu pelanggan merencanakan dan
                menjalani pengalaman perjalanan yang menyenangkan, aman, dan
                berkesan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
