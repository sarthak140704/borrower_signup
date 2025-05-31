import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  residenceType: string;
  monthlyIncome: string;
  previousLoan: string;
  maritalStatus: string;
  dependents: string;
  city: string;
  state: string;
  [key: string]: string;
}

interface AppContextType {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  residenceType: '',
  monthlyIncome: '',
  previousLoan: 'no',
  maritalStatus: '',
  dependents: '0',
  city: '',
  state: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    setIsSubmitted(false);
    setError(null);
  };

  return (
    <AppContext.Provider
      value={{
        formData,
        updateFormData,
        resetForm,
        currentStep,
        setCurrentStep,
        isLoading,
        setIsLoading,
        isSubmitted,
        setIsSubmitted,
        error,
        setError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};