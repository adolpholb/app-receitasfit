'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, Clock, Users, X } from 'lucide-react';
import { RECIPE_CATEGORIES } from '@/lib/constants';
import { Recipe, RecipeCategory } from '@/lib/types';

export default function RecipesTab() {
  const { recipes, toggleFavorite, addMealEntry } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Receitas Saudáveis
        </h2>
        <p className="text-gray-600">
          Explore {recipes.length} receitas deliciosas e práticas
        </p>
      </div>

      {/* Search */}
      <Input
        placeholder="Buscar receitas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-md"
      />

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          className={selectedCategory === 'all' ? 'bg-[#4CAF50] hover:bg-[#388E3C]' : ''}
        >
          Todas
        </Button>
        {RECIPE_CATEGORIES.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? 'bg-[#4CAF50] hover:bg-[#388E3C]' : ''}
          >
            {category.icon} {category.name}
          </Button>
        ))}
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card
            key={recipe.id}
            className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all group cursor-pointer"
            onClick={() => setSelectedRecipe(recipe)}
          >
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
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{recipe.prepTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{recipe.servings} porções</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma receita encontrada</p>
        </div>
      )}

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <div>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800">
                  {selectedRecipe.title}
                </DialogTitle>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-64 object-cover rounded-xl"
                />

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#4CAF50]" />
                    <span className="font-medium">{selectedRecipe.prepTime} minutos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#4CAF50]" />
                    <span className="font-medium">{selectedRecipe.servings} porções</span>
                  </div>
                </div>

                <Card className="p-4 bg-[#E8F5E9] border-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Calorias por porção</p>
                      <p className="text-2xl font-bold text-[#2E7D32]">
                        {selectedRecipe.caloriesPerServing} cal
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-xl font-semibold text-gray-700">
                        {selectedRecipe.totalCalories} cal
                      </p>
                    </div>
                  </div>
                </Card>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Ingredientes</h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-[#4CAF50] mt-1">•</span>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Modo de Preparo</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.steps.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-[#4CAF50] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      toggleFavorite(selectedRecipe.id);
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${
                        selectedRecipe.isFavorite ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                    {selectedRecipe.isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                  </Button>
                  <Button
                    onClick={() => {
                      addMealEntry({
                        mealType: 'almoco',
                        recipeId: selectedRecipe.id,
                        calories: selectedRecipe.caloriesPerServing,
                      });
                      setSelectedRecipe(null);
                    }}
                    className="flex-1 bg-[#4CAF50] hover:bg-[#388E3C]"
                  >
                    Adicionar ao Meu Dia
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
