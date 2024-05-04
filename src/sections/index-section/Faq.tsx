export default function Faq() {
  return (
    <div className="container mx-auto my-12">
      <div className="mb-10 flex-col justify-center items-center gap-1 flex">
        <h1 className="text-5xl font-bold text-black">
          Pertanyaan Umum Perjalanan Haji & Umrah
        </h1>
        <p className="text-gray-400 text-lg font-normal ">
          Jawaban atas pertanyaan yang sering diajukan untuk memahami lebih
          lanjut tentang persiapan dan proses perjalanan Anda.
        </p>
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-4">
        <div
          tabIndex={0}
          className="collapse collapse-arrow border border-base-300 bg-base-200"
        >
          <div className="collapse-title text-[#01B9DE] text-lg font-bold">
            Apa yang dibutuhkan untuk mendaftar sebagai jamaah haji atau umrah?
          </div>
          <div className="collapse-content">
            <p className="text-">
              Untuk mendaftar sebagai jamaah haji atau umrah, Anda akan
              membutuhkan paspor yang berlaku, serta dokumen-dokumen tambahan
              seperti surat keterangan kesehatan dan bukti pembayaran.
            </p>
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
            Bagaimana dengan pengaturan akomodasi dan transportasi selama
            perjalanan?
          </div>
          <div className="collapse-content">
            <p></p>
          </div>
        </div>
        <div tabIndex={0} className="collapse collapse-arrow">
          <div className="collapse-title text-xl font-medium">
            Apakah ada peraturan khusus yang harus diikuti selama perjalanan
            haji atau umrah?
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
            Apa yang harus dilakukan jika ada masalah atau keadaan darurat
            selama perjalanan?
          </div>
          <div className="collapse-content">
            <p>tabIndex={0} attribute is necessary to make the div focusable</p>
          </div>
        </div>
      </div>
    </div>
  )
}
