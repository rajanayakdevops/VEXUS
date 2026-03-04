import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useParams } from 'react-router-dom';

function PortfolioDetail() {
  const { slug } = useParams();
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', paddingTop: '5rem' }}>
        <h1>Portfolio Detail: {slug}</h1>
      </main>
      <Footer />
    </>
  );
}

export default PortfolioDetail;
