import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';

// "bg-gradient-to-b from-black via-black/85 to-black"
export default function Home() {
  return (
    <div>
      <Header theme="dark" />
      <Landing />
      <Footer />
    </div>
  );
}
