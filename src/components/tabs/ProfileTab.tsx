'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { User, Mail, Calendar, Target, AlertCircle, Edit2, Save, X } from 'lucide-react';

export default function ProfileTab() {
  const { user, updateUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    age: user?.age || 0,
    email: user?.email || '',
    objective: user?.objective || '',
    restrictions: user?.restrictions || [],
  });

  const handleSave = () => {
    if (updateUser) {
      updateUser(formData);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      age: user?.age || 0,
      email: user?.email || '',
      objective: user?.objective || '',
      restrictions: user?.restrictions || [],
    });
    setIsEditing(false);
  };

  const toggleRestriction = (restriction: string) => {
    setFormData(prev => ({
      ...prev,
      restrictions: prev.restrictions.includes(restriction)
        ? prev.restrictions.filter(r => r !== restriction)
        : [...prev.restrictions, restriction]
    }));
  };

  const restrictionOptions = ['Glúten', 'Lactose', 'Açúcar', 'Vegano', 'Vegetariano'];
  const objectiveOptions = ['Emagrecer', 'Manter peso', 'Ganhar massa'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.name || 'Usuário'}</h2>
              <p className="text-white/90">{user?.email || 'email@exemplo.com'}</p>
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Pessoais</h3>

        {!isEditing ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-semibold text-gray-900">{user?.name || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">E-mail</p>
                <p className="font-semibold text-gray-900">{user?.email || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Idade</p>
                <p className="font-semibold text-gray-900">{user?.age || 'Não informado'} anos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Target className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Objetivo</p>
                <p className="font-semibold text-gray-900">{user?.objective || 'Não informado'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-600 mb-2">Restrições Alimentares</p>
                {user?.restrictions && user.restrictions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.restrictions.map((restriction) => (
                      <span
                        key={restriction}
                        className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full"
                      >
                        {restriction}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="font-semibold text-gray-900">Nenhuma restrição</p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
              <input
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
                placeholder="Sua idade"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objetivo</label>
              <select
                value={formData.objective}
                onChange={(e) => setFormData({ ...formData, objective: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-transparent"
              >
                <option value="">Selecione seu objetivo</option>
                {objectiveOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Restrições Alimentares
              </label>
              <div className="flex flex-wrap gap-2">
                {restrictionOptions.map((restriction) => (
                  <button
                    key={restriction}
                    onClick={() => toggleRestriction(restriction)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      formData.restrictions.includes(restriction)
                        ? 'bg-red-100 text-red-700 border-2 border-red-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {restriction}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-[#4CAF50] text-white py-3 rounded-lg font-semibold hover:bg-[#45a049] transition-colors"
              >
                <Save className="w-5 h-5" />
                Salvar Alterações
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{user?.favorites?.length || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Favoritos</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{user?.waterIntake || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Copos de Água</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{user?.dailyCalories || 0}</p>
            <p className="text-sm text-gray-600 mt-1">Calorias Hoje</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">
              {user?.currentWeight && user?.targetWeight 
                ? (user.currentWeight - user.targetWeight).toFixed(1) 
                : '0'}
            </p>
            <p className="text-sm text-gray-600 mt-1">kg a Perder</p>
          </div>
        </div>
      </div>

      {/* App Info */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Sobre o ReceitasFit</h3>
        <p className="text-sm text-gray-700 mb-4">
          Seu aplicativo completo para uma vida mais saudável. Receitas deliciosas, controle de calorias, 
          acompanhamento de metas e muito mais!
        </p>
        <p className="text-xs text-gray-600">Versão 1.0.0</p>
      </div>
    </div>
  );
}
