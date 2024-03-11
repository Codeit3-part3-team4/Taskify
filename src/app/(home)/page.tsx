import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import GetCard from '@/components/getCard/GetCard';
import GetColumn from '@/components/column/Column';

export default function Home() {
  return (
    <div className="bg-black">
      <Header theme="dark" />
      <Landing />
      <GetCard />
      <GetColumn />
      <Footer />
    </div>
  );
}
