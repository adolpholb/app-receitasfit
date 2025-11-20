'use client';

import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingDown, Flame, Droplets, ChevronRight, Heart } from 'lucide-react';
import { RECIPE_CATEGORIES } from '@/lib/constants';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
}

export default function HomeTab({ onNavigate }: HomeTabProps) {
  const { recipes, getTodayCalories, todayWater, user, toggleFavorite } = useApp();

  // Get recommended recipes (first 3 from different categories)
  const recommendedRecipes = recipes.slice(0, 3);

  const todayCalories = getTodayCalories();
  const calorieGoal = user?.dailyCalorieGoal || 1800;
  const calorieProgress = (todayCalories / calorieGoal) * 100;

  const waterProgress = (todayWater.glasses / todayWater.goal) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Bem-vinda de volta, {user?.name}!
        </h2>
        <p className="text-gray-600">
          Vamos continuar sua jornada saudável hoje
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('calories')}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#FFF3E0] rounded-xl flex items-center justify-center">
              <Flame className="w-6 h-6 text-[#FF9800]" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Calorias Hoje</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayCalories} <span className="text-base text-gray-500">/ {calorieGoal}</span>
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF9800] to-[#FFB74D] transition-all"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('water')}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E3F2FD] rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-[#2196F3]" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Água Hoje</p>
            <p className="text-2xl font-bold text-gray-800">
              {todayWater.glasses} <span className="text-base text-gray-500">/ {todayWater.goal} copos</span>
            </p>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2196F3] to-[#64B5F6] transition-all"
                style={{ width: `${Math.min(waterProgress, 100)}%` }}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('goals')}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-[#4CAF50]" />
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Meta de Peso</p>
            <p className="text-2xl font-bold text-gray-800">
              {user?.currentWeight || '--'} kg
            </p>
            <p className="text-sm text-gray-600">
              Meta: {user?.targetWeight || '--'} kg
            </p>
          </div>
        </Card>
      </div>

      {/* Recommended Recipes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">
            Sugestões de Hoje
          </h3>
          <Button
            variant="ghost"
            onClick={() => onNavigate('recipes')}
            className="text-[#4CAF50] hover:text-[#388E3C]"
          >
            Ver todas
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all group">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe.id);
                  }}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      recipe.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                    }`}
                  />
                </button>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-800">
                    {recipe.caloriesPerServing} cal
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">
                  {recipe.title}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {recipe.prepTime} min • {recipe.servings} porções
                </p>
                <Button
                  onClick={() => onNavigate('recipes')}
                  className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white"
                >
                  Ver Receita
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories Quick Access */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Explorar Categorias
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {RECIPE_CATEGORIES.map((category) => (
            <Card
              key={category.id}
              className="p-6 border-0 shadow-md hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => onNavigate('recipes')}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <p className="text-sm font-semibold text-gray-800 leading-tight">
                  {category.name}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
