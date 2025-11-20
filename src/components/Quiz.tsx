'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { QUIZ_QUESTIONS } from '@/lib/constants';
import { QuizAnswers } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const { setHasCompletedQuiz } = useApp();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    preferredRecipes: [],
    restrictions: [],
  });

  const question = QUIZ_QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1;

  const handleAnswer = (value: string) => {
    if (question.multiple) {
      const current = answers[question.id as keyof QuizAnswers] as string[] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      setAnswers({ ...answers, [question.id]: updated });
    } else {
      setAnswers({ ...answers, [question.id]: value });
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setHasCompletedQuiz(true);
      onComplete();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const canProceed = () => {
    const answer = answers[question.id as keyof QuizAnswers];
    if (question.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8F5E9] via-white to-[#F5E6D3] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 md:p-12 shadow-2xl border-0">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-[#4CAF50]">
              Pergunta {currentQuestion + 1} de {QUIZ_QUESTIONS.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#4CAF50] to-[#81C784] transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option) => {
            const isSelected = question.multiple
              ? (answers[question.id as keyof QuizAnswers] as string[] || []).includes(option.value)
              : answers[question.id as keyof QuizAnswers] === option.value;

            return (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center justify-between group hover:scale-[1.02] ${
                  isSelected
                    ? 'border-[#4CAF50] bg-[#E8F5E9] shadow-md'
                    : 'border-gray-200 bg-white hover:border-[#81C784] hover:shadow-sm'
                }`}
              >
                <span className={`font-medium ${isSelected ? 'text-[#2E7D32]' : 'text-gray-700'}`}>
                  {option.label}
                </span>
                {isSelected && (
                  <CheckCircle2 className="w-6 h-6 text-[#4CAF50]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          {currentQuestion > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              className="flex-1"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex-1 bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#388E3C] hover:to-[#4CAF50] text-white font-semibold py-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLastQuestion ? 'Ver Meu Plano' : 'Próxima'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
