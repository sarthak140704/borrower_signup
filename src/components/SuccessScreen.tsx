import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export const SuccessScreen: React.FC = () => {
  const { resetForm } = useAppContext();

  return (
    <motion.div 
      className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg overflow-hidden p-8 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="h-20 w-20 text-success mx-auto" />
      </motion.div>
      
      <h2 className="text-3xl font-bold mt-6 mb-4">Application Submitted!</h2>
      
      <p className="text-lg text-muted-foreground mb-6">
        Thank you for submitting your loan application. Our team will review your information and get back to you shortly.
      </p>
      
      <div className="bg-muted p-6 rounded-md mb-8">
        <h3 className="font-medium mb-4">What happens next?</h3>
        <ol className="text-left space-y-2">
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full h-6 w-6 text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
            <span>Our team will review your application within 1-2 business days</span>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full h-6 w-6 text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
            <span>You'll receive an email confirmation with your application ID</span>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full h-6 w-6 text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
            <span>A loan officer may contact you for additional information if needed</span>
          </li>
          <li className="flex items-start">
            <span className="flex items-center justify-center bg-primary text-primary-foreground rounded-full h-6 w-6 text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
            <span>You'll receive the final decision via email</span>
          </li>
        </ol>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="#" 
          className="btn btn-outline py-2 px-6"
        >
          Contact Support
        </a>
        <button 
          onClick={resetForm}
          className="btn btn-primary py-2 px-6"
        >
          Apply for Another Loan
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};