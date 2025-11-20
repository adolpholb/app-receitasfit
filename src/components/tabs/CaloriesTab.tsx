'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Coffee, Utensils, Cookie, Moon } from 'lucide-react';
import { MealType } from '@/lib/types';

export default function CaloriesTab() {
  const { user, todayMeals, addMealEntry, removeMealEntry, getTodayCalories, recipes } = useApp();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('cafe');
  const [addType, setAddType] = useState<'recipe' | 'custom'>('recipe');
  const [selectedRecipeId, setSelectedRecipeId] = useState('');
  const [customName, setCustomName] = useState('');
  const [customCalories, setCustomCalories] = useState('');

  const calorieGoal = user?.dailyCalorieGoal || 1800;
  const todayCalories = getTodayCalories();
  const progress = (todayCalories / calorieGoal) * 100;
  const remaining = calorieGoal - todayCalories;

  const mealTypes: { id: MealType; label: string; icon: any }[] = [
    { id: 'cafe', label: 'Café da Manhã', icon: Coffee },
    { id: 'almoco', label: 'Almoço', icon: Utensils },
    { id: 'lanche', label: 'Lanche', icon: Cookie },
    { id: 'ceia', label: 'Ceia', icon: Moon },
  ];

  const getMealsByType = (type: MealType) => {
    return todayMeals.filter(m => m.mealType === type);
  };

  const getMealCalories = (type: MealType) => {
    return getMealsByType(type).reduce((sum, m) => sum + m.calories, 0);
  };

  const handleAddMeal = () => {
    if (addType === 'recipe') {
      const recipe = recipes.find(r => r.id === selectedRecipeId);
      if (!recipe) return;
      
      addMealEntry({
        mealType: selectedMealType,
        recipeId: recipe.id,
        calories: recipe.caloriesPerServing,
      });
    } else {
      if (!customName || !customCalories) return;
      
      addMealEntry({
        mealType: selectedMealType,
        customName,
        calories: parseInt(customCalories),
      });
    }

    setShowAddDialog(false);
    setSelectedRecipeId('');
    setCustomName('');
    setCustomCalories('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Minhas Calorias no Dia
        </h2>
        <p className="text-gray-600">
          Acompanhe sua ingestão calórica diária
        </p>
      </div>

      {/* Summary Card */}
      <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm mb-1">Total Hoje</p>
            <p className="text-4xl font-bold">{todayCalories}</p>
            <p className="text-white/80 text-sm">de {calorieGoal} calorias</p>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm mb-1">Restante</p>
            <p className={`text-3xl font-bold ${remaining < 0 ? 'text-red-200' : ''}`}>
              {remaining > 0 ? remaining : 0}
            </p>
            <p className="text-white/80 text-sm">calorias</p>
          </div>
        </div>
        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              progress > 100 ? 'bg-red-400' : 'bg-white'
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        {progress > 100 && (
          <p className="text-white/90 text-sm mt-2">
            Você ultrapassou sua meta em {todayCalories - calorieGoal} calorias
          </p>
        )}
      </Card>

      {/* Meals */}
      <div className="space-y-4">
        {mealTypes.map((mealType) => {
          const Icon = mealType.icon;
          const meals = getMealsByType(mealType.id);
          const calories = getMealCalories(mealType.id);

          return (
            <Card key={mealType.id} className="p-6 border-0 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#E8F5E9] rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#4CAF50]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{mealType.label}</h3>
                    <p className="text-sm text-gray-600">{calories} calorias</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setSelectedMealType(mealType.id);
                    setShowAddDialog(true);
                  }}
                  className="bg-[#4CAF50] hover:bg-[#388E3C]"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>

              {meals.length > 0 ? (
                <div className="space-y-2">
                  {meals.map((meal) => {
                    const recipe = meal.recipeId ? recipes.find(r => r.id === meal.recipeId) : null;
                    const name = recipe?.title || meal.customName || 'Alimento';

                    return (
                      <div
                        key={meal.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{name}</p>
                          <p className="text-sm text-gray-600">{meal.calories} cal</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeMealEntry(meal.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum alimento adicionado ainda
                </p>
              )}
            </Card>
          );
        })}
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Alimento</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="flex gap-2">
              <Button
                variant={addType === 'recipe' ? 'default' : 'outline'}
                onClick={() => setAddType('recipe')}
                className={addType === 'recipe' ? 'bg-[#4CAF50] hover:bg-[#388E3C]' : ''}
              >
                Receita do App
              </Button>
              <Button
                variant={addType === 'custom' ? 'default' : 'outline'}
                onClick={() => setAddType('custom')}
                className={addType === 'custom' ? 'bg-[#4CAF50] hover:bg-[#388E3C]' : ''}
              >
                Alimento Personalizado
              </Button>
            </div>

            {addType === 'recipe' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione a receita
                </label>
                <Select value={selectedRecipeId} onValueChange={setSelectedRecipeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha uma receita" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id}>
                        {recipe.title} ({recipe.caloriesPerServing} cal)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome do alimento
                  </label>
                  <Input
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Ex: Banana"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calorias
                  </label>
                  <Input
                    type="number"
                    value={customCalories}
                    onChange={(e) => setCustomCalories(e.target.value)}
                    placeholder="Ex: 105"
                  />
                </div>
              </>
            )}

            <Button
              onClick={handleAddMeal}
              disabled={
                addType === 'recipe'
                  ? !selectedRecipeId
                  : !customName || !customCalories
              }
              className="w-full bg-[#4CAF50] hover:bg-[#388E3C]"
            >
              Adicionar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
