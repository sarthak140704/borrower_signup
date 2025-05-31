import React from 'react';
import { BorrowSignUp } from './components/BorrowSignUp';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-muted to-background">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-primary">Loan Application</h1>
            <p className="text-muted-foreground mt-2">Complete the form below to apply for a loan</p>
          </header>
          <BorrowSignUp />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;