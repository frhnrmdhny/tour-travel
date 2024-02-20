/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <div className="relative bg-cover bg-fixed overflow-hidden bg-[url('/assets/hero-2.jpg')]">
      <div className="h-[70vh]">
        <header className="bg-transparent py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-between">
              <a href="#" className="text-white text-xl font-bold">
                Tour and Travel
              </a>
              <ul className="flex space-x-4">
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
            </nav>
          </div>
        </header>

        <section className="container mx-auto p-4 items-center flex justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-8">
              Welcome to Tours, and Travel
            </h1>
            <p className="text-lg  mb-8">
              Book your tickets, explore amazing tours, and plan your next
              adventure with us.
            </p>
            <a href="#" className="btn btn-outline text-white">
              Get Started
            </a>
          </div>
        </section>
      </div>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Tour and Travel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src="/assets/showcase-1.jpg"
                alt="Tour 1"
                className="w-full mb-4 aspect-square object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Tour 1</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vitae justo ac nunc lacinia lacinia. Nulla facilisi.
              </p>
              <a href="#" className="btn btn-primary btn-sm mt-4">
                Learn More
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src="/assets/showcase-2.jpg"
                alt="Tour 2"
                className="w-full mb-4 aspect-square object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Tour 2</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vitae justo ac nunc lacinia lacinia. Nulla facilisi.
              </p>
              <a href="#" className="btn btn-primary btn-sm mt-4">
                Learn More
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img
                src="/assets/showcase-3.jpg"
                alt="Tour 3"
                className="w-full mb-4 aspect-square object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Tour 3</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                vitae justo ac nunc lacinia lacinia. Nulla facilisi.
              </p>
              <a href="#" className="btn btn-primary btn-sm mt-4">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4  py-8">
          <h2 className="text-3xl text-center font-bold mb-8 text-white">
            Surah of The Day
          </h2>
          <div className="p-6 text-center bg-slate-200 bg-opacity-30">
            <blockquote className="text-2xl text-gray-800 mb-4">
              اِنَّ رَبَّكُمُ اللّٰهُ الَّذِيْ خَلَقَ السَّمٰوٰتِ وَالْاَرْضَ
              فِيْ سِتَّةِ اَيَّامٍ ثُمَّ اسْتَوٰى عَلَى الْعَرْشِۗ يُغْشِى
              الَّيْلَ النَّهَارَ يَطْلُبُهٗ حَثِيْثًاۙ وَّالشَّمْسَ وَالْقَمَرَ
              وَالنُّجُوْمَ مُسَخَّرٰتٍ ۢ بِاَمْرِهٖٓۙ اَلَا لَهُ الْخَلْقُ
              وَالْاَمْرُۗ تَبٰرَكَ اللّٰهُ رَبُّالْعٰلَمِيْنَ
            </blockquote>

            <blockquote className="text-lg text-gray-800">
              "Indeed, your Lord is Allāh, who created the heavens and earth in
              six days and then established Himself above the Throne. He covers
              the night with the day, [another night] chasing it rapidly; and
              [He created] the sun, the moon, and the stars, subjected by His
              command. Unquestionably, His is the creation and the command;
              blessed is Allāh, Lord of the worlds."
            </blockquote>
            <cite className="block mt-4 text-sm font-bold">
              - Surah Al-A'raf - 54
            </cite>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">John Doe</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                euismod, nunc id aliquam aliquet, nunc nunc ultrices nunc, nec
                aliquam nunc nunc id.
              </p>
              <p className="text-gray-500">- Happy Customer</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Jane Smith</h3>
              <p className="text-gray-600 mb-4">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Sed euismod, nunc id aliquam aliquet,
                nunc nunc ultrices nunc, nec aliquam nunc nunc id.
              </p>
              <p className="text-gray-500">- Satisfied Traveler</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Mike Johnson</h3>
              <p className="text-gray-600 mb-4">
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Sed euismod, nunc id aliquam
                aliquet, nunc nunc ultrices nunc, nec aliquam nunc nunc id.
              </p>
              <p className="text-gray-500">- Repeat Customer</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">About Us</h3>
              <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                vitae elit libero, a pharetra augue.
              </p>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-sm">123 Main Street, City, Country</p>
              <p className="text-sm">info@example.com</p>
              <p className="text-sm">+1 234 567 890</p>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Links</h3>
              <ul className="list-none">
                <li>
                  <a href="#" className="text-sm">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Social Media</h3>
              <ul className="list-none">
                <li>
                  <a href="#" className="text-sm">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
