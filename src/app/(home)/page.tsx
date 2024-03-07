'use client';
import TodoForm from '@/components/Todo/TodoForm';
import React from 'react';

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Hello, world!</h1>
      <TodoForm />
    </div>
  );
}
