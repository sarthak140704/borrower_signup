import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
  hint?: string;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  children,
  error,
  hint,
  className,
}) => {
  return (
    <div className={cn("form-group", className)}>
      <label className="form-label">{label}</label>
      {children}
      {hint && <p className="form-hint">{hint}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};