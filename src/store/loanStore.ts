import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoanFormData } from "../types/loan";

interface LoanStore {
  currentStep: number;
  formData: LoanFormData;
  setStep: (step: number) => void;
  updateFormData: (data: Partial<LoanFormData>) => void;
  resetApplication: () => void;
}

const initialFormData: LoanFormData = {
  loanType: "",
  loanAmount: "",
  loanTenure: "",
  loanPurpose: "",
  referralCode: "",
};

export const useLoanStore = create<LoanStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: initialFormData,

      setStep: (step) => set({ currentStep: step }),

      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),

      resetApplication: () =>
        set({
          currentStep: 1,
          formData: initialFormData,
        }),
    }),
    {
      name: "lendswift-loan-application",
    }
  )
);