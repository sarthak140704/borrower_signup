import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { FormField } from '../ui/FormField';

interface AdditionalInfoFormValues {
  maritalStatus: string;
  dependents: string;
  city: string;
  state: string;
}

export const AdditionalInfoForm: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useAppContext();
  
  const { register, handleSubmit, formState: { errors } } = useForm<AdditionalInfoFormValues>({
    defaultValues: {
      maritalStatus: formData.maritalStatus,
      dependents: formData.dependents,
      city: formData.city,
      state: formData.state,
    }
  });

  const onSubmit = (data: AdditionalInfoFormValues) => {
    updateFormData(data);
    setCurrentStep(4);
  };

  const goBack = () => {
    setCurrentStep(2);
  };

  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
  ];

  const dependentsOptions = Array.from({ length: 11 }, (_, i) => ({
    value: i.toString(),
    label: i.toString(),
  }));

  // This would normally come from an API or larger dataset
  const states = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'NY', label: 'New York' },
    { value: 'TX', label: 'Texas' },
    // Add more states as needed
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
        <p className="text-muted-foreground mb-6">
          Please provide a few more details to complete your profile.
        </p>
      </div>

      <FormField
        label="Marital Status"
        error={errors.maritalStatus?.message}
      >
        <select
          {...register('maritalStatus', { required: 'Marital status is required' })}
          className="select"
        >
          <option value="">Select your marital status</option>
          {maritalStatusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>

      <FormField
        label="Number of Dependents"
        error={errors.dependents?.message}
      >
        <select
          {...register('dependents', { required: 'Number of dependents is required' })}
          className="select"
        >
          {dependentsOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="City"
          error={errors.city?.message}
        >
          <input
            {...register('city', { required: 'City is required' })}
            type="text"
            placeholder="New York"
            className="input"
          />
        </FormField>

        <FormField
          label="State"
          error={errors.state?.message}
        >
          <select
            {...register('state', { required: 'State is required' })}
            className="select"
          >
            <option value="">Select your state</option>
            {states.map(state => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </FormField>
      </div>

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
          Review Application
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </form>
  );
};