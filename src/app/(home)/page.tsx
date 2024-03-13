import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import GetColumnData from '@/components/getColumnData.tsx/GetColumnData';

export default function Home() {
  return (
    <div className="bg-black">
      <Header theme="dark" />
      <Landing />
      <GetColumnData />
      <Footer />
    </div>
  );
}
