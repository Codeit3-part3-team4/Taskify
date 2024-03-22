import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';

export default function Home() {
  const url = '/images/mokoko-bg.png';
  return (
    <div className="w-full h-[100dvh] text-white overflow-scroll">
      <div
        className="absolute w-full h-[100dvh]"
        style={{
          backgroundImage: `url(${url})`,
          filter: 'blur(7px)',
          zIndex: -1,
        }}
      />
      <Header theme="light" />
      <Landing />
      <Footer />
    </div>
  );
}
