'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { UserProfile } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Sparkles, TrendingDown, Clock, Heart, Target, Droplets, BarChart3 } from 'lucide-react';

interface SalesPageProps {
  onActivate: () => void;
}

export default function SalesPage({ onActivate }: SalesPageProps) {
  const { setUser } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    currentWeight: '',
    targetWeight: '',
    calorieGoal: '',
  });

  const handleActivate = () => {
    if (!formData.name || !formData.age) {
      alert('Por favor, preencha seu nome e idade');
      return;
    }

    const user: UserProfile = {
      name: formData.name,
      age: parseInt(formData.age),
      goal: 'emagrecer',
      restrictions: [],
      currentWeight: formData.currentWeight ? parseFloat(formData.currentWeight) : undefined,
      targetWeight: formData.targetWeight ? parseFloat(formData.targetWeight) : undefined,
      dailyCalorieGoal: formData.calorieGoal ? parseInt(formData.calorieGoal) : 1800,
      dailyWaterGoal: 8,
    };

    setUser(user);
    onActivate();
  };

  if (showForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-white to-[#F5E6D3] flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 shadow-2xl border-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#66BB6A] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Crie Seu Perfil
            </h2>
            <p className="text-gray-600">
              Vamos personalizar sua experiência
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idade *
              </label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="Sua idade"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso Atual (kg)
              </label>
              <Input
                type="number"
                value={formData.currentWeight}
                onChange={(e) => setFormData({ ...formData, currentWeight: e.target.value })}
                placeholder="Ex: 75"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso Desejado (kg)
              </label>
              <Input
                type="number"
                value={formData.targetWeight}
                onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                placeholder="Ex: 65"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta de Calorias Diárias
              </label>
              <Input
                type="number"
                value={formData.calorieGoal}
                onChange={(e) => setFormData({ ...formData, calorieGoal: e.target.value })}
                placeholder="Ex: 1800"
                className="w-full"
              />
            </div>

            <Button
              onClick={handleActivate}
              className="w-full bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#388E3C] hover:to-[#4CAF50] text-white font-semibold py-6 rounded-xl shadow-lg mt-6"
            >
              Ativar Meu Acesso
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-white to-[#F5E6D3]">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md mb-6">
            <Sparkles className="w-5 h-5 text-[#4CAF50]" />
            <span className="text-sm font-semibold text-[#2E7D32]">Plano Personalizado Pronto!</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Parabéns! Criamos um plano<br />
            <span className="text-[#4CAF50]">perfeito para você</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Com base em suas respostas, preparamos um conjunto de receitas deliciosas, práticas e saudáveis para te ajudar a atingir seu objetivo.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Emagrecimento Saudável</h3>
                <p className="text-sm text-gray-600">Perca peso sem sofrimento, comendo comidas deliciosas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Receitas Rápidas</h3>
                <p className="text-sm text-gray-600">Refeições práticas que cabem na sua rotina</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Comer Sem Culpa</h3>
                <p className="text-sm text-gray-600">Sobremesas e lanches saudáveis que não sabotam a dieta</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Calorias Calculadas</h3>
                <p className="text-sm text-gray-600">Todas as receitas com informações nutricionais completas</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <Droplets className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Controle de Água</h3>
                <p className="text-sm text-gray-600">Monitore sua hidratação diária facilmente</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#E8F5E9] rounded-xl flex items-center justify-center flex-shrink-0">
                <BarChart3 className="w-6 h-6 text-[#4CAF50]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Acompanhamento do Peso</h3>
                <p className="text-sm text-gray-600">Visualize seu progresso com gráficos simples</p>
              </div>
            </div>
          </Card>
        </div>

        {/* What's Included */}
        <Card className="p-8 border-0 shadow-xl mb-12 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            O que você vai encontrar:
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              '8 categorias completas de receitas',
              'Receitas zero açúcar e sem glúten',
              'Opções low carb e proteicas',
              'Marmitas para a semana toda',
              'Sucos detox que aceleram resultados',
              'Sobremesas saudáveis deliciosas',
              'Controle total de calorias diário',
              'Sugestões personalizadas para você',
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#4CAF50] flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#388E3C] hover:to-[#4CAF50] text-white font-bold text-lg px-12 py-7 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
          >
            Quero Desbloquear Meu Plano e Começar Hoje
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Comece sua transformação agora mesmo
          </p>
        </div>
      </div>
    </div>
  );
}
