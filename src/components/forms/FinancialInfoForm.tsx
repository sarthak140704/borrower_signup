import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { FormField } from '../ui/FormField';

interface FinancialInfoFormValues {
  residenceType: string;
  monthlyIncome: string;
  previousLoan: string;
}

export const FinancialInfoForm: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useAppContext();
  
  const { register, handleSubmit, formState: { errors } } = useForm<FinancialInfoFormValues>({
    defaultValues: {
      residenceType: formData.residenceType,
      monthlyIncome: formData.monthlyIncome,
      previousLoan: formData.previousLoan,
    }
  });

  const onSubmit = (data: FinancialInfoFormValues) => {
    updateFormData(data);
    setCurrentStep(3);
  };

  const goBack = () => {
    setCurrentStep(1);
  };

  const residenceOptions = [
    { value: 'owned', label: 'Owned' },
    { value: 'rented', label: 'Rented' },
    { value: 'mortgaged', label: 'Mortgaged' },
    { value: 'living_with_parents', label: 'Living with Parents' },
    { value: 'company_provided', label: 'Company Provided' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Financial Information</h2>
        <p className="text-muted-foreground mb-6">
          Please provide your financial details for loan assessment.
        </p>
      </div>

      <FormField
        label="Residence Type"
        error={errors.residenceType?.message}
      >
        <select
          {...register('residenceType', { required: 'Residence type is required' })}
          className="select"
        >
          <option value="">Select your residence type</option>
          {residenceOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Monthly Income (USD)"
        error={errors.monthlyIncome?.message}
      >
        <input
          {...register('monthlyIncome', { 
            required: 'Monthly income is required',
            pattern: { 
              value: /^[0-9]+$/, 
              message: 'Please enter a valid amount' 
            } 
          })}
          type="number"
          placeholder="5000"
          className="input"
        />
      </FormField>

      <FormField
        label="Previous Loan Experience"
        error={errors.previousLoan?.message}
      >
        <div className="flex gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="yes"
              {...register('previousLoan', { required: 'Please select an option' })}
              className="h-4 w-4 text-primary"
            />
            <span>Yes</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="no"
              {...register('previousLoan', { required: 'Please select an option' })}
              className="h-4 w-4 text-primary"
            />
            <span>No</span>
          </label>
        </div>
      </FormField>

      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={goBack}
          className="btn btn-outline py-2 px-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <button 
          type="submit" 
          className="btn btn-primary py-2 px-4"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </form>
  );
};