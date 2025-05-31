import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '../utils/cn';

interface Step {
  id: number;
  name: string;
}

interface FormProgressProps {
  steps: Step[];
  currentStep: number;
}

export const FormProgress: React.FC<FormProgressProps> = ({ steps, currentStep }) => {
  return (
    <div className="bg-muted py-4 px-6">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-between">
          {steps.map((step) => (
            <li key={step.id} className="relative flex items-center">
              <div className="flex flex-col items-center">
                <span 
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    currentStep === step.id && "border-2 border-primary bg-background",
                    currentStep > step.id && "bg-primary",
                    currentStep < step.id && "bg-muted-foreground/30"
                  )}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  ) : (
                    <span 
                      className={cn(
                        "text-sm font-medium",
                        currentStep === step.id ? "text-primary" : "text-muted-foreground"
                      )}
                    >
                      {step.id}
                    </span>
                  )}
                </span>
                <span 
                  className={cn(
                    "mt-2 text-xs",
                    currentStep === step.id ? "text-foreground font-medium" : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
              </div>
              
              {step.id < steps.length && (
                <div 
                  className={cn(
                    "mx-2 h-0.5 w-12 bg-muted-foreground/30",
                    currentStep > step.id && "bg-primary"
                  )} 
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};