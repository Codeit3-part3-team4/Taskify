import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black via-black/85 to-black">
      <Header theme="dark" />
      <Landing />
      <Footer />
    </div>
  );
}
