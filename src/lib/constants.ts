import { Recipe, RecipeCategory } from './types';

// Categorias de receitas
export const RECIPE_CATEGORIES: { id: RecipeCategory; name: string; icon: string }[] = [
  { id: 'cafe-lanches', name: 'Café & Lanches de Nutri', icon: '🥞' },
  { id: 'sobremesas-zero', name: 'Sobremesas Zero Açúcar', icon: '🍫' },
  { id: 'saladas-molhos', name: 'Saladas & Molhos', icon: '🥗' },
  { id: 'paes-sem-gluten', name: 'Pães Sem Glúten', icon: '🍞' },
  { id: 'airfryer-proteica', name: 'Airfryer Proteica Sem Glúten', icon: '🍗' },
  { id: 'low-carb', name: 'Receitas Low Carb', icon: '🥑' },
  { id: 'marmitas-fit', name: 'Marmitas Fit para Congelar', icon: '🍱' },
  { id: 'sucos-detox', name: 'Sucos Detox', icon: '🥒' },
];

// Receitas de exemplo (banco de dados mockado)
export const MOCK_RECIPES: Recipe[] = [
  // Café & Lanches
  {
    id: '1',
    title: 'Panqueca de Aveia com Banana',
    category: 'cafe-lanches',
    image: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&h=600&fit=crop',
    ingredients: [
      '2 ovos',
      '1 banana madura',
      '3 colheres de aveia',
      '1 colher de canela',
      'Mel para servir (opcional)'
    ],
    steps: [
      'Amasse a banana em um bowl',
      'Adicione os ovos e misture bem',
      'Acrescente a aveia e a canela',
      'Aqueça uma frigideira antiaderente',
      'Despeje a massa e cozinhe por 2-3 minutos de cada lado',
      'Sirva com mel se desejar'
    ],
    totalCalories: 320,
    caloriesPerServing: 160,
    servings: 2,
    prepTime: 10,
  },
  {
    id: '2',
    title: 'Tapioca Fit com Queijo Branco',
    category: 'cafe-lanches',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=600&fit=crop',
    ingredients: [
      '4 colheres de goma de tapioca',
      '50g de queijo branco light',
      'Orégano a gosto',
      'Tomate cereja (opcional)'
    ],
    steps: [
      'Aqueça uma frigideira antiaderente',
      'Espalhe a tapioca uniformemente',
      'Aguarde formar uma massa',
      'Adicione o queijo e orégano',
      'Dobre ao meio e sirva'
    ],
    totalCalories: 180,
    caloriesPerServing: 180,
    servings: 1,
    prepTime: 5,
  },
  // Sobremesas Zero Açúcar
  {
    id: '3',
    title: 'Mousse de Chocolate Proteico',
    category: 'sobremesas-zero',
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800&h=600&fit=crop',
    ingredients: [
      '1 abacate maduro',
      '2 colheres de cacau em pó 100%',
      '1 scoop de whey protein chocolate',
      '100ml de leite de amêndoas',
      'Adoçante a gosto'
    ],
    steps: [
      'Bata todos os ingredientes no liquidificador',
      'Ajuste a consistência com leite se necessário',
      'Leve à geladeira por 2 horas',
      'Sirva gelado'
    ],
    totalCalories: 280,
    caloriesPerServing: 140,
    servings: 2,
    prepTime: 5,
  },
  {
    id: '4',
    title: 'Brigadeiro Fit de Biomassa',
    category: 'sobremesas-zero',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4cdb0e0f?w=800&h=600&fit=crop',
    ingredients: [
      '200g de biomassa de banana verde',
      '3 colheres de cacau em pó',
      '2 colheres de pasta de amendoim',
      'Adoçante a gosto',
      'Cacau para decorar'
    ],
    steps: [
      'Misture todos os ingredientes em uma panela',
      'Leve ao fogo baixo mexendo sempre',
      'Cozinhe até desgrudar do fundo',
      'Deixe esfriar e faça bolinhas',
      'Passe no cacau em pó'
    ],
    totalCalories: 400,
    caloriesPerServing: 40,
    servings: 10,
    prepTime: 20,
  },
  // Saladas & Molhos
  {
    id: '5',
    title: 'Salada Caesar Fit',
    category: 'saladas-molhos',
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&h=600&fit=crop',
    ingredients: [
      'Alface romana',
      '150g de frango grelhado',
      '2 colheres de parmesão ralado',
      'Croutons integrais',
      'Molho caesar light'
    ],
    steps: [
      'Lave e corte a alface',
      'Grelhe o frango e corte em tiras',
      'Monte a salada em um bowl',
      'Adicione o parmesão e croutons',
      'Regue com molho caesar'
    ],
    totalCalories: 350,
    caloriesPerServing: 350,
    servings: 1,
    prepTime: 15,
  },
  {
    id: '6',
    title: 'Molho de Iogurte com Ervas',
    category: 'saladas-molhos',
    image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&h=600&fit=crop',
    ingredients: [
      '200g de iogurte grego natural',
      'Suco de 1 limão',
      'Dill fresco picado',
      'Cebolinha picada',
      'Sal e pimenta'
    ],
    steps: [
      'Misture o iogurte com o suco de limão',
      'Adicione as ervas picadas',
      'Tempere com sal e pimenta',
      'Leve à geladeira por 30 minutos'
    ],
    totalCalories: 120,
    caloriesPerServing: 30,
    servings: 4,
    prepTime: 5,
  },
  // Pães Sem Glúten
  {
    id: '7',
    title: 'Pão de Queijo Fit',
    category: 'paes-sem-gluten',
    image: 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=800&h=600&fit=crop',
    ingredients: [
      '1 ovo',
      '2 colheres de polvilho azedo',
      '2 colheres de queijo cottage',
      '1 colher de azeite',
      'Sal a gosto'
    ],
    steps: [
      'Misture todos os ingredientes',
      'Faça bolinhas pequenas',
      'Coloque em forma untada',
      'Asse a 180°C por 20 minutos'
    ],
    totalCalories: 240,
    caloriesPerServing: 60,
    servings: 4,
    prepTime: 25,
  },
  // Airfryer Proteica
  {
    id: '8',
    title: 'Frango Empanado na Airfryer',
    category: 'airfryer-proteica',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&h=600&fit=crop',
    ingredients: [
      '500g de peito de frango',
      '2 ovos',
      'Farinha de amêndoas',
      'Temperos a gosto',
      'Spray de azeite'
    ],
    steps: [
      'Corte o frango em tiras',
      'Tempere bem',
      'Passe no ovo batido',
      'Empane na farinha de amêndoas',
      'Coloque na airfryer a 200°C por 15 minutos'
    ],
    totalCalories: 600,
    caloriesPerServing: 300,
    servings: 2,
    prepTime: 20,
  },
  // Low Carb
  {
    id: '9',
    title: 'Omelete de Forno com Legumes',
    category: 'low-carb',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&h=600&fit=crop',
    ingredients: [
      '4 ovos',
      'Brócolis picado',
      'Tomate cereja',
      'Queijo ralado light',
      'Temperos'
    ],
    steps: [
      'Bata os ovos com os temperos',
      'Adicione os legumes picados',
      'Despeje em forma untada',
      'Polvilhe queijo por cima',
      'Asse a 180°C por 25 minutos'
    ],
    totalCalories: 400,
    caloriesPerServing: 200,
    servings: 2,
    prepTime: 30,
  },
  // Marmitas Fit
  {
    id: '10',
    title: 'Marmita de Frango com Batata Doce',
    category: 'marmitas-fit',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    ingredients: [
      '200g de frango grelhado',
      '150g de batata doce',
      'Brócolis no vapor',
      'Azeite e temperos'
    ],
    steps: [
      'Grelhe o frango temperado',
      'Cozinhe a batata doce',
      'Prepare o brócolis no vapor',
      'Monte a marmita dividindo em porções',
      'Congele por até 3 meses'
    ],
    totalCalories: 450,
    caloriesPerServing: 450,
    servings: 1,
    prepTime: 30,
  },
  // Sucos Detox
  {
    id: '11',
    title: 'Suco Verde Detox',
    category: 'sucos-detox',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&h=600&fit=crop',
    ingredients: [
      '1 folha de couve',
      '1/2 limão',
      '1 maçã verde',
      'Gengibre a gosto',
      '200ml de água de coco'
    ],
    steps: [
      'Lave bem todos os ingredientes',
      'Corte em pedaços',
      'Bata tudo no liquidificador',
      'Coe se preferir',
      'Beba imediatamente'
    ],
    totalCalories: 80,
    caloriesPerServing: 80,
    servings: 1,
    prepTime: 5,
  },
  {
    id: '12',
    title: 'Suco de Abacaxi com Hortelã',
    category: 'sucos-detox',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
    ingredients: [
      '2 rodelas de abacaxi',
      'Folhas de hortelã',
      'Suco de 1 limão',
      '300ml de água gelada',
      'Gelo'
    ],
    steps: [
      'Bata o abacaxi com água',
      'Adicione hortelã e limão',
      'Bata novamente',
      'Sirva com gelo'
    ],
    totalCalories: 60,
    caloriesPerServing: 60,
    servings: 1,
    prepTime: 5,
  },
];

// Perguntas do Quiz
export const QUIZ_QUESTIONS = [
  {
    id: 'goal',
    question: 'Qual seu objetivo principal?',
    options: [
      { value: 'emagrecer', label: 'Emagrecer' },
      { value: 'manter', label: 'Comer mais saudável' },
      { value: 'ganhar-massa', label: 'Manter peso' },
    ],
  },
  {
    id: 'weightToLose',
    question: 'Quanto peso deseja perder?',
    options: [
      { value: '1-3', label: '1–3 kg' },
      { value: '3-6', label: '3–6 kg' },
      { value: '6-10', label: '6–10 kg' },
      { value: '10+', label: '10+ kg' },
    ],
  },
  {
    id: 'cookingTime',
    question: 'Quanto tempo você tem para cozinhar por dia?',
    options: [
      { value: '10', label: '10 min' },
      { value: '20', label: '20 min' },
      { value: '30+', label: '30+ min' },
    ],
  },
  {
    id: 'preferredRecipes',
    question: 'Quais tipos de receitas você prefere?',
    multiple: true,
    options: [
      { value: 'low-carb', label: 'Low carb' },
      { value: 'zero-acucar', label: 'Zero açúcar' },
      { value: 'sem-gluten', label: 'Sem glúten' },
      { value: 'proteicas', label: 'Proteicas' },
      { value: 'todos', label: 'Todos' },
    ],
  },
  {
    id: 'restrictions',
    question: 'Você tem restrições?',
    multiple: true,
    options: [
      { value: 'gluten', label: 'Glúten' },
      { value: 'lactose', label: 'Lactose' },
      { value: 'acucar', label: 'Açúcar' },
      { value: 'nenhuma', label: 'Nenhuma' },
    ],
  },
  {
    id: 'sweetTooth',
    question: 'Você gosta de doces?',
    options: [
      { value: 'muito', label: 'Muito' },
      { value: 'medio', label: 'Mais ou menos' },
      { value: 'pouco', label: 'Não sou fã' },
    ],
  },
  {
    id: 'mainMeal',
    question: 'Você cozinha mais:',
    options: [
      { value: 'cafe', label: 'Café da manhã' },
      { value: 'almoco', label: 'Almoço' },
      { value: 'lanches', label: 'Lanches' },
      { value: 'jantar', label: 'Jantar' },
    ],
  },
];
