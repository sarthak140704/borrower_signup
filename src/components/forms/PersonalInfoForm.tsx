import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { FormField } from '../ui/FormField';

interface PersonalInfoFormValues {
  name: string;
  email: string;
  phone: string;
}

export const PersonalInfoForm: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useAppContext();
  
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalInfoFormValues>({
    defaultValues: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    }
  });

  const onSubmit = (data: PersonalInfoFormValues) => {
    updateFormData(data);
    setCurrentStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <p className="text-muted-foreground mb-6">
          Please provide your personal details to get started.
        </p>
      </div>

      <FormField
        label="Full Name"
        error={errors.name?.message}
      >
        <input
          {...register('name', { 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          })}
          type="text"
          placeholder="John Doe"
          className="input"
        />
      </FormField>

      <FormField
        label="Email Address"
        error={errors.email?.message}
      >
        <input
          {...register('email', { 
            required: 'Email is required', 
            pattern: { 
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
              message: 'Invalid email address' 
            } 
          })}
          type="email"
          placeholder="you@example.com"
          className="input"
        />
      </FormField>

      <FormField
        label="Phone Number"
        error={errors.phone?.message}
      >
        <input
          {...register('phone', { 
            required: 'Phone number is required',
            pattern: { 
              value: /^[0-9]{10}$/, 
              message: 'Please enter a valid 10-digit phone number' 
            } 
          })}
          type="tel"
          placeholder="1234567890"
          className="input"
        />
      </FormField>

      <div className="pt-4">
        <button type="submit" className="btn btn-primary w-full py-2">
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </form>
  );
};