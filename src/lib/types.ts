// Tipos do aplicativo ReceitasFit

export type RecipeCategory = 
  | 'cafe-lanches'
  | 'sobremesas-zero'
  | 'saladas-molhos'
  | 'paes-sem-gluten'
  | 'airfryer-proteica'
  | 'low-carb'
  | 'marmitas-fit'
  | 'sucos-detox';

export type MealType = 'cafe' | 'almoco' | 'lanche' | 'ceia';

export type UserGoal = 'emagrecer' | 'manter' | 'ganhar-massa';

export interface Recipe {
  id: string;
  title: string;
  category: RecipeCategory;
  image: string;
  ingredients: string[];
  steps: string[];
  totalCalories: number;
  caloriesPerServing: number;
  servings: number;
  prepTime: number;
  isFavorite?: boolean;
}

export interface QuizAnswers {
  goal: UserGoal;
  weightToLose: string;
  cookingTime: string;
  preferredRecipes: string[];
  restrictions: string[];
  sweetTooth: string;
  mainMeal: string;
}

export interface UserProfile {
  name: string;
  age: number;
  goal: UserGoal;
  restrictions: string[];
  quizAnswers?: QuizAnswers;
  currentWeight?: number;
  targetWeight?: number;
  dailyCalorieGoal?: number;
  dailyWaterGoal?: number;
}

export interface MealEntry {
  id: string;
  mealType: MealType;
  recipeId?: string;
  customName?: string;
  calories: number;
  date: string;
}

export interface WaterIntake {
  date: string;
  glasses: number;
  goal: number;
}

export interface WeightProgress {
  date: string;
  weight: number;
}
