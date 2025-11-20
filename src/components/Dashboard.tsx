'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Home, BookOpen, Heart, Calculator, Droplets, Target, User } from 'lucide-react';
import HomeTab from './tabs/HomeTab';
import RecipesTab from './tabs/RecipesTab';
import FavoritesTab from './tabs/FavoritesTab';
import CaloriesTab from './tabs/CaloriesTab';
import WaterTab from './tabs/WaterTab';
import GoalsTab from './tabs/GoalsTab';
import ProfileTab from './tabs/ProfileTab';

type Tab = 'home' | 'recipes' | 'favorites' | 'calories' | 'water' | 'goals' | 'profile';

export default function Dashboard() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const tabs = [
    { id: 'home' as Tab, icon: Home, label: 'Início' },
    { id: 'recipes' as Tab, icon: BookOpen, label: 'Receitas' },
    { id: 'favorites' as Tab, icon: Heart, label: 'Favoritos' },
    { id: 'calories' as Tab, icon: Calculator, label: 'Calorias' },
    { id: 'water' as Tab, icon: Droplets, label: 'Água' },
    { id: 'goals' as Tab, icon: Target, label: 'Metas' },
    { id: 'profile' as Tab, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 md:pb-0">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#4CAF50]">ReceitasFit</h1>
              <p className="text-sm text-gray-600">Olá, {user?.name}!</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'home' && <HomeTab onNavigate={setActiveTab} />}
        {activeTab === 'recipes' && <RecipesTab />}
        {activeTab === 'favorites' && <FavoritesTab />}
        {activeTab === 'calories' && <CaloriesTab />}
        {activeTab === 'water' && <WaterTab />}
        {activeTab === 'goals' && <GoalsTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </main>

      {/* Bottom Navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 gap-1">
          {tabs.slice(0, 4).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-3 transition-colors ${
                  isActive ? 'text-[#4CAF50]' : 'text-gray-500'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Side Navigation - Desktop */}
      <nav className="hidden md:block fixed left-0 top-20 bottom-0 w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#E8F5E9] text-[#2E7D32] font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Content Offset */}
      <style jsx global>{`
        @media (min-width: 768px) {
          main {
            margin-left: 16rem;
          }
        }
      `}</style>
    </div>
  );
}
