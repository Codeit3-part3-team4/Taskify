import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Card from '@/components/card/Card';

export default function Home() {
  return (
    <div className="bg-black">
      <Header theme="dark" />
      <Landing />
      <Card />
      <Footer />
    </div>
  );
}
