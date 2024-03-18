'use client';
import Header from '@/components/header/Header';
import Footer from './components/Footer';
import Landing from './components/Landing';
import GetColumnData from '@/components/getColumnData.tsx/GetColumnData';

import TodoCard from '@/components/Todo/TodoCard';
import TodoForm from '@/components/Todo/TodoForm';
import TodoUpdate from '@/components/Todo/TodoUpdate';
import LoginForm from '@/api/LoginForm';

export default function Home() {
  return (
    <div className="bg-black">
      <Header theme="dark" />
      <Landing />
      <GetColumnData />
      <Footer />
      <TodoCard />
      <TodoForm />
      <TodoUpdate />
    </div>
  );
}
