import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';

export default function Home() {
  return (
    <div>
      <Header theme="light" />
      <Landing />
      <Footer />
    </div>
  );
}
