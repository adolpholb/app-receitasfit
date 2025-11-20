'use client';

import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, Plus, Minus } from 'lucide-react';

export default function WaterTab() {
  const { todayWater, addWaterGlass, removeWaterGlass, setWaterGoal } = useApp();

  const progress = (todayWater.glasses / todayWater.goal) * 100;
  const isGoalReached = todayWater.glasses >= todayWater.goal;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Controle de Água
        </h2>
        <p className="text-gray-600">
          Mantenha-se hidratado durante o dia
        </p>
      </div>

      {/* Water Progress */}
      <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-[#2196F3] to-[#64B5F6] text-white">
        <div className="text-center mb-6">
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="white"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progress / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Droplets className="w-12 h-12 text-white" />
            </div>
          </div>
          <p className="text-5xl font-bold mb-2">{todayWater.glasses}</p>
          <p className="text-white/80 text-lg">de {todayWater.goal} copos</p>
          {isGoalReached && (
            <p className="text-white font-semibold mt-2">🎉 Meta alcançada!</p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={removeWaterGlass}
            disabled={todayWater.glasses === 0}
            variant="secondary"
            size="lg"
            className="w-16 h-16 rounded-full"
          >
            <Minus className="w-6 h-6" />
          </Button>
          <Button
            onClick={addWaterGlass}
            variant="secondary"
            size="lg"
            className="w-16 h-16 rounded-full"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </Card>

      {/* Water Glasses Visual */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="font-bold text-gray-800 mb-4 text-center">
          Seus Copos de Hoje
        </h3>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {Array.from({ length: todayWater.goal }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index < todayWater.glasses) {
                  removeWaterGlass();
                } else {
                  addWaterGlass();
                }
              }}
              className="aspect-square flex items-center justify-center transition-all hover:scale-110"
            >
              <Droplets
                className={`w-12 h-12 ${
                  index < todayWater.glasses
                    ? 'text-[#2196F3] fill-[#2196F3]'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
      </Card>

      {/* Goal Settings */}
      <Card className="p-6 border-0 shadow-md">
        <h3 className="font-bold text-gray-800 mb-4">Meta Diária</h3>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setWaterGoal(Math.max(4, todayWater.goal - 1))}
            variant="outline"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="flex-1 text-center">
            <p className="text-3xl font-bold text-gray-800">{todayWater.goal}</p>
            <p className="text-sm text-gray-600">copos por dia</p>
          </div>
          <Button
            onClick={() => setWaterGoal(Math.min(15, todayWater.goal + 1))}
            variant="outline"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Tips */}
      <Card className="p-6 border-0 shadow-md bg-[#E3F2FD]">
        <h3 className="font-bold text-gray-800 mb-3">💡 Dicas de Hidratação</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Beba um copo de água ao acordar</li>
          <li>• Mantenha uma garrafa sempre por perto</li>
          <li>• Beba água antes das refeições</li>
          <li>• Configure lembretes no celular</li>
          <li>• Aumente a ingestão em dias quentes</li>
        </ul>
      </Card>
    </div>
  );
}
