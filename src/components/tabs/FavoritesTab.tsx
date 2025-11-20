'use client';

import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Users } from 'lucide-react';

export default function FavoritesTab() {
  const { favoriteRecipes, toggleFavorite } = useApp();

  if (favoriteRecipes.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Nenhuma receita favorita ainda
        </h3>
        <p className="text-gray-600 mb-6">
          Comece adicionando receitas que você ama aos favoritos
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Minhas Receitas Favoritas
        </h2>
        <p className="text-gray-600">
          {favoriteRecipes.length} {favoriteRecipes.length === 1 ? 'receita salva' : 'receitas salvas'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteRecipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all group">
            <div className="relative h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <button
                onClick={() => toggleFavorite(recipe.id)}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <Heart className="w-5 h-5 fill-red-500 text-red-500" />
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
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.prepTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings} porções</span>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => toggleFavorite(recipe.id)}
                className="w-full"
              >
                Remover dos Favoritos
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
