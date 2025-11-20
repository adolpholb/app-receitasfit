'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe, UserProfile, MealEntry, WaterIntake, WeightProgress, QuizAnswers } from '@/lib/types';
import { MOCK_RECIPES } from '@/lib/constants';

interface AppContextType {
  // User
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  hasCompletedQuiz: boolean;
  setHasCompletedQuiz: (value: boolean) => void;
  
  // Recipes
  recipes: Recipe[];
  favoriteRecipes: Recipe[];
  toggleFavorite: (recipeId: string) => void;
  getRecipeById: (id: string) => Recipe | undefined;
  
  // Meals
  todayMeals: MealEntry[];
  addMealEntry: (entry: Omit<MealEntry, 'id' | 'date'>) => void;
  removeMealEntry: (id: string) => void;
  getTodayCalories: () => number;
  
  // Water
  todayWater: WaterIntake;
  addWaterGlass: () => void;
  removeWaterGlass: () => void;
  setWaterGoal: (goal: number) => void;
  
  // Weight
  weightHistory: WeightProgress[];
  addWeightEntry: (weight: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [todayMeals, setTodayMeals] = useState<MealEntry[]>([]);
  const [todayWater, setTodayWater] = useState<WaterIntake>({
    date: new Date().toISOString().split('T')[0],
    glasses: 0,
    goal: 8,
  });
  const [weightHistory, setWeightHistory] = useState<WeightProgress[]>([]);

  // Load from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('receitasfit-user');
    const savedQuiz = localStorage.getItem('receitasfit-quiz');
    const savedFavorites = localStorage.getItem('receitasfit-favorites');
    const savedMeals = localStorage.getItem('receitasfit-meals');
    const savedWater = localStorage.getItem('receitasfit-water');
    const savedWeight = localStorage.getItem('receitasfit-weight');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedQuiz) setHasCompletedQuiz(JSON.parse(savedQuiz));
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites);
      setRecipes(prev => prev.map(r => ({ ...r, isFavorite: favoriteIds.includes(r.id) })));
    }
    if (savedMeals) setTodayMeals(JSON.parse(savedMeals));
    if (savedWater) setTodayWater(JSON.parse(savedWater));
    if (savedWeight) setWeightHistory(JSON.parse(savedWeight));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('receitasfit-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('receitasfit-quiz', JSON.stringify(hasCompletedQuiz));
  }, [hasCompletedQuiz]);

  useEffect(() => {
    const favoriteIds = recipes.filter(r => r.isFavorite).map(r => r.id);
    localStorage.setItem('receitasfit-favorites', JSON.stringify(favoriteIds));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('receitasfit-meals', JSON.stringify(todayMeals));
  }, [todayMeals]);

  useEffect(() => {
    localStorage.setItem('receitasfit-water', JSON.stringify(todayWater));
  }, [todayWater]);

  useEffect(() => {
    localStorage.setItem('receitasfit-weight', JSON.stringify(weightHistory));
  }, [weightHistory]);

  // Recipe functions
  const toggleFavorite = (recipeId: string) => {
    setRecipes(prev => prev.map(r => 
      r.id === recipeId ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const getRecipeById = (id: string) => recipes.find(r => r.id === id);

  const favoriteRecipes = recipes.filter(r => r.isFavorite);

  // Meal functions
  const addMealEntry = (entry: Omit<MealEntry, 'id' | 'date'>) => {
    const newEntry: MealEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
    };
    setTodayMeals(prev => [...prev, newEntry]);
  };

  const removeMealEntry = (id: string) => {
    setTodayMeals(prev => prev.filter(m => m.id !== id));
  };

  const getTodayCalories = () => {
    return todayMeals.reduce((sum, meal) => sum + meal.calories, 0);
  };

  // Water functions
  const addWaterGlass = () => {
    setTodayWater(prev => ({ ...prev, glasses: prev.glasses + 1 }));
  };

  const removeWaterGlass = () => {
    setTodayWater(prev => ({ ...prev, glasses: Math.max(0, prev.glasses - 1) }));
  };

  const setWaterGoal = (goal: number) => {
    setTodayWater(prev => ({ ...prev, goal }));
  };

  // Weight functions
  const addWeightEntry = (weight: number) => {
    const entry: WeightProgress = {
      date: new Date().toISOString().split('T')[0],
      weight,
    };
    setWeightHistory(prev => [...prev, entry]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        hasCompletedQuiz,
        setHasCompletedQuiz,
        recipes,
        favoriteRecipes,
        toggleFavorite,
        getRecipeById,
        todayMeals,
        addMealEntry,
        removeMealEntry,
        getTodayCalories,
        todayWater,
        addWaterGlass,
        removeWaterGlass,
        setWaterGoal,
        weightHistory,
        addWeightEntry,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
