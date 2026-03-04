import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import ScrollProgress from '../components/ScrollProgress';
import { Hero } from '../components/home/Hero';
import Stats from '../components/home/Stats';
import ServicesPreview from '../components/home/ServicesPreview';
import Process from '../components/home/Process';
import PortfolioPreview from '../components/home/PortfolioPreview';
import Testimonials from '../components/home/Testimonials';
import CTA from '../components/home/CTA';

function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <ServicesPreview />
        <Process />
        <PortfolioPreview />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default Home;
