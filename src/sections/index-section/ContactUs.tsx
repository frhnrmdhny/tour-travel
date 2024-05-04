export default function ContactUs() {
  return (
    <div className="container mx-auto my-12">
      <div className="mb-10 flex-col justify-center items-start gap-1 flex">
        <h1 className="text-slate-800 text-5xl font-bold leading-[60px]">
          Kontak Kami
        </h1>
        <p className="text-gray-400 text-lg font-normal leading-7">
          Hubungi kami untuk informasi lebih lanjut dan temukan cara terbaik
          untuk menghubungi tim Kami dan memulai perjalanan Anda.
        </p>
      </div>

      <div className="flex gap-4 justify-center items-center flex-col lg:flex-row">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1129876412097!2d107.7960238769579!3d-6.379413862404928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6947780dd0aa4b%3A0x8b1b5de4d636db3a!2sPT.%20FITRIA%20DAMAN%20SUBANG!5e0!3m2!1sen!2sid!4v1714783617885!5m2!1sen!2sid"
          width="100%"
          style={{
            border: 0
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="aspect-square"
        />

        <div>
          <div className="">
            <div className="card w-96 bg-[#F5FDFF] text-primary-content">
              <div className="card-body">
                <h2 className="font-bold text-sm text-[#01B9DE]">
                  Office Address -{' '}
                  <a className="text-gray-500" href="">
                    Click to see on maps
                  </a>{' '}
                </h2>
                <p className="text-gray-500 font-medium">
                  Jl. Sriwijaya No.92, Cigereleng, Kec. Regol, Kota Bandung,
                  Jawa Barat 40253
                </p>
              </div>
            </div>
            <div className="card w-96  text-primary-content">
              <div className="card-body">
                <h2 className="font-bold text-sm text-[#01B9DE]">
                  WhatsApp -{' '}
                  <a className="text-gray-500" href="google.com">
                    Click to send message
                  </a>{' '}
                </h2>
                <p className="text-gray-500 font-medium">
                  (+62)851 - 1111 - 1111
                </p>
              </div>
            </div>
            <div className="card w-96  text-primary-content">
              <div className="card-body">
                <h2 className="font-bold text-sm text-[#01B9DE]">
                  Email -{' '}
                  <a className="text-gray-500" href="">
                    Click to send email
                  </a>{' '}
                </h2>
                <p className="text-gray-500 font-medium">cs@tourtravel.com</p>
              </div>
            </div>
            <div className="card w-96  text-primary-content">
              <div className="card-body">
                <h2 className="font-bold text-sm text-[#01B9DE]">
                  Tiktok -{' '}
                  <a className="text-gray-500" href="">
                    Click to see our tiktok
                  </a>{' '}
                </h2>
                <p className="text-gray-500 font-medium">
                  Tour dan Travel Bandung
                </p>
              </div>
            </div>
            <div className="card w-96  text-primary-content">
              <div className="card-body">
                <h2 className="font-bold text-sm text-[#01B9DE]">
                  Facebook -{' '}
                  <a className="text-gray-500" href="">
                    Click to see our facebook
                  </a>{' '}
                </h2>
                <p className="text-gray-500 font-medium">
                  Tour dan Travel Bandung
                </p>
              </div>
            </div>
            <div className="card w-96  text-primary-content">
              <div className="card-body">
                <h2 className="font-bold text-sm text-[#01B9DE]">
                  Instagram -{' '}
                  <a className="text-gray-500" href="">
                    Click to see our instagram
                  </a>{' '}
                </h2>
                <p className="text-gray-500 font-medium">
                  @trourtravel.bandung
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
