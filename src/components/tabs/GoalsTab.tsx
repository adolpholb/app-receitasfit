'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Target, TrendingDown, Calendar, Award } from 'lucide-react';

export default function GoalsTab() {
  const { user, updateUser } = useApp();
  const [currentWeight, setCurrentWeight] = useState(user?.currentWeight || 0);
  const [targetWeight, setTargetWeight] = useState(user?.targetWeight || 0);
  const [targetDate, setTargetDate] = useState(user?.targetDate || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (updateUser) {
      updateUser({
        currentWeight,
        targetWeight,
        targetDate,
      });
    }
    setIsEditing(false);
  };

  const weightToLose = currentWeight - targetWeight;
  const progress = currentWeight > 0 && targetWeight > 0 
    ? Math.max(0, Math.min(100, ((currentWeight - targetWeight) / (currentWeight - targetWeight)) * 100))
    : 0;

  const daysRemaining = targetDate 
    ? Math.ceil((new Date(targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Target className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Minhas Metas</h2>
        </div>
        <p className="text-white/90">Acompanhe seu progresso de emagrecimento</p>
      </div>

      {/* Goal Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Peso Atual</p>
              <p className="text-2xl font-bold text-gray-900">{currentWeight || '--'} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Meta</p>
              <p className="text-2xl font-bold text-gray-900">{targetWeight || '--'} kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Dias Restantes</p>
              <p className="text-2xl font-bold text-gray-900">{daysRemaining > 0 ? daysRemaining : '--'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      {currentWeight > 0 && targetWeight > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Progresso</h3>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">
                {weightToLose.toFixed(1)} kg para perder
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progresso</span>
              <span className="font-semibold">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Peso Inicial</p>
              <p className="text-xl font-bold text-gray-900">{currentWeight} kg</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Peso Meta</p>
              <p className="text-xl font-bold text-green-600">{targetWeight} kg</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Goals Form */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Editar Metas' : 'Configurar Metas'}
          </h3>
          {!isEditing && (currentWeight > 0 || targetWeight > 0) && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-sm font-medium text-[#4CAF50] hover:bg-green-50 rounded-lg transition-colors"
            >
              Editar
            </button>
          )}
        </div>

        {(isEditing || currentWeight === 0) && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso Atual (kg)
              </label>
              <input
                type="number"
                value={currentWeight || ''}
                onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                placeholder="Ex: 75"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peso Meta (kg)
              </label>
              <input
                type="number"
                value={targetWeight || ''}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                placeholder="Ex: 65"
                step="0.1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Meta
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 bg-[#4CAF50] text-white py-3 rounded-lg font-semibold hover:bg-[#45a049] transition-colors"
              >
                Salvar Metas
              </button>
              {isEditing && (
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        )}

        {!isEditing && currentWeight > 0 && targetWeight > 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-gray-600">
              Suas metas estão configuradas! Continue firme no seu objetivo.
            </p>
          </div>
        )}
      </div>

      {/* Motivational Tips */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">💪 Dicas para Alcançar sua Meta</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Beba pelo menos 2 litros de água por dia</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Mantenha um déficit calórico saudável (300-500 calorias)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Pratique atividade física regularmente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Durma bem (7-8 horas por noite)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Seja consistente e paciente com o processo</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
