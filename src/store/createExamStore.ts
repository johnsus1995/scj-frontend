import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Store = {
  examName: string;
  currentQuestion: string;
  currentAnswer: string;
  currentQuestionNumber: number;
  setCurrentQuestionNumber: (num: number) => void;
};

export const useExam = create<Store>()(
  persist(
    (set, _get) => ({
      examName: 'no_name',
      currentAnswer: 'no_answer',
      currentQuestion: 'no_question',
      currentQuestionNumber: 1,
      setCurrentQuestionNumber: (number) =>
        set({ currentQuestionNumber: number }),
    }),
    {
      name: 'create-exam-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
