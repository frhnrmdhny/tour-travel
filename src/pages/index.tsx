import AboutUs from '~/sections/index-section/AboutUs'
import Benefits from '~/sections/index-section/Benefits'
import CallToAction from '~/sections/index-section/CallToAction'
import ContactUs from '~/sections/index-section/ContactUs'
import Faq from '~/sections/index-section/Faq'
import Footer from '~/sections/index-section/Footer'
import Hero from '~/sections/index-section/Hero'
import HowTo from '~/sections/index-section/HowTo'
import InfoBar from '~/sections/index-section/InfoBar'
import LastCall from '~/sections/index-section/LastCall'
import OurServices from '~/sections/index-section/OurServices'
import Packages from '~/sections/index-section/Packages'
import Portfolio from '~/sections/index-section/Portfolio'
import Review from '~/sections/index-section/Review'

export default function Home() {
  return (
    <>
      <InfoBar />

      <Hero />

      <OurServices />

      <AboutUs />

      <HowTo />

      <Packages />

      <CallToAction />

      <Benefits />

      <Portfolio />

      <Review />

      <Faq />

      <ContactUs />

      <LastCall />

      <Footer />
    </>
  )
}
