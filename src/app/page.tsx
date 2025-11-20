'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import Quiz from '@/components/Quiz';
import SalesPage from '@/components/SalesPage';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const { user, hasCompletedQuiz } = useApp();
  const [showSales, setShowSales] = useState(false);

  // Flow: Quiz -> Sales -> Dashboard
  if (!hasCompletedQuiz) {
    return <Quiz onComplete={() => setShowSales(true)} />;
  }

  if (showSales && !user) {
    return <SalesPage onActivate={() => setShowSales(false)} />;
  }

  if (!user) {
    return <SalesPage onActivate={() => setShowSales(false)} />;
  }

  return <Dashboard />;
}
