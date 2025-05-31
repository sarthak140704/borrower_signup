import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { PersonalInfoForm } from './forms/PersonalInfoForm';
import { FinancialInfoForm } from './forms/FinancialInfoForm';
import { AdditionalInfoForm } from './forms/AdditionalInfoForm';
import { ReviewForm } from './forms/ReviewForm';
import { SuccessScreen } from './SuccessScreen';
import { FormProgress } from './FormProgress';
import { ErrorBanner } from './ui/ErrorBanner';

export const BorrowSignUp: React.FC = () => {
  const { 
    currentStep, 
    isSubmitted, 
    error, 
    setError 
  } = useAppContext();

  const steps = [
    { id: 1, name: 'Personal Information' },
    { id: 2, name: 'Financial Information' },
    { id: 3, name: 'Additional Information' },
    { id: 4, name: 'Review & Submit' }
  ];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />;
      case 2:
        return <FinancialInfoForm />;
      case 3:
        return <AdditionalInfoForm />;
      case 4:
        return <ReviewForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  if (isSubmitted) {
    return <SuccessScreen />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}
      
      <div className="bg-card rounded-lg shadow-lg overflow-hidden">
        <FormProgress steps={steps} currentStep={currentStep} />
        
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};