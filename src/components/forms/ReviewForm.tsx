import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { submitApplication } from '../../services/api';

export const ReviewForm: React.FC = () => {
  const { 
    formData, 
    setCurrentStep, 
    setIsLoading, 
    isLoading,
    setIsSubmitted,
    setError
  } = useAppContext();
  
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const goBack = () => {
    setCurrentStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions to continue.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      await submitApplication(formData);
      
      setIsSubmitted(true);
    } catch (error) {
      setError('There was a problem submitting your application. Please try again.');
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Maps from backend values to display values
  const getDisplayValue = (key: string, value: string) => {
    const mappings: Record<string, Record<string, string>> = {
      residenceType: {
        owned: 'Owned',
        rented: 'Rented',
        mortgaged: 'Mortgaged',
        living_with_parents: 'Living with Parents',
        company_provided: 'Company Provided',
        other: 'Other'
      },
      maritalStatus: {
        single: 'Single',
        married: 'Married',
        divorced: 'Divorced',
        widowed: 'Widowed'
      },
      previousLoan: {
        yes: 'Yes',
        no: 'No'
      }
    };

    if (key in mappings && value in mappings[key]) {
      return mappings[key][value];
    }
    
    return value;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Review Your Application</h2>
        <p className="text-muted-foreground mb-6">
          Please review your information before submitting.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-3">Personal Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Name</dt>
              <dd>{formData.name}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd>{formData.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Phone</dt>
              <dd>{formData.phone}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-3">Financial Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Residence Type</dt>
              <dd>{getDisplayValue('residenceType', formData.residenceType)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Monthly Income</dt>
              <dd>${formData.monthlyIncome}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Previous Loan</dt>
              <dd>{getDisplayValue('previousLoan', formData.previousLoan)}</dd>
            </div>
          </dl>
        </div>

        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-3">Additional Information</h3>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            <div>
              <dt className="text-sm text-muted-foreground">Marital Status</dt>
              <dd>{getDisplayValue('maritalStatus', formData.maritalStatus)}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Dependents</dt>
              <dd>{formData.dependents}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">City</dt>
              <dd>{formData.city}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">State</dt>
              <dd>{formData.state}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="pt-2">
        <label className="flex items-start space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 h-4 w-4 text-primary rounded"
          />
          <span className="text-sm">
            I confirm that all information provided is accurate and I agree to the 
            <a href="#" className="text-primary hover:underline ml-1">Terms and Conditions</a> and 
            <a href="#" className="text-primary hover:underline ml-1">Privacy Policy</a>.
          </span>
        </label>
      </div>

      <div className="flex justify-between pt-4">
        <button 
          type="button" 
          onClick={goBack}
          className="btn btn-outline py-2 px-4"
          disabled={isLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <button 
          type="submit" 
          className="btn btn-primary py-2 px-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Submit Application
            </>
          )}
        </button>
      </div>
    </form>
  );
};