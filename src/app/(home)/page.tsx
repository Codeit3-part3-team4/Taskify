import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import GetColumnData from '@/components/getColumnData.tsx/GetColumnData';
import Column from '@/components/column/Column';

export default function Home() {
  return (
    <div className="bg-black">
      <Header theme="dark" />
      <Landing />
      <GetColumnData />
      <Footer />
    </div>
  );
  // 컬럼, 카드 컴포넌트 감싸는 컨텐트 컴포넌트에서
  // 컬럼과 카드 분류하는 함수 넣고
  // 컬럼과 카드에는 하나의 컬럼, 카드만...
}
