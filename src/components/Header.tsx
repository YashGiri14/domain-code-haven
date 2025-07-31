
import React from 'react';

interface HeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

const Header: React.FC<HeaderProps> = ({ currentStep = 0, totalSteps = 4 }) => {
  const steps = [
    { label: 'BHK TYPE', step: 0 },
    { label: 'ROOMS TO DESIGN', step: 1 },
    { label: 'PACKAGE', step: 2 },
    { label: 'GET QUOTE', step: 3 }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-primary/20 fixed top-0 left-0 right-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:flex flex-col items-center py-3 min-h-[6rem]">
          {/* Logo */}
          <div className="flex justify-center items-center pb-3">
            <img
              src="/lovable-uploads/0e7764bc-df65-4205-841f-740f7b35349b.png"
              alt="Artisan Studio"
              className="h-16 w-auto max-w-[250px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
          
          {/* Navigation and progress */}
          <div className="flex justify-between items-center w-full max-w-4xl px-4">
            {/* Progress stepper */}
            <div className="flex items-center space-x-6 flex-1 justify-center">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        index < currentStep 
                          ? 'bg-primary text-primary-foreground shadow-lg scale-110' 
                          : index === currentStep 
                          ? 'bg-primary text-primary-foreground shadow-xl scale-115 ring-4 ring-primary/30' 
                          : 'bg-muted text-muted-foreground shadow-sm'
                      }`}
                    >
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <span className={`text-xs font-medium transition-colors duration-300 hidden lg:block ${
                      index === currentStep ? 'text-primary' : index < currentStep ? 'text-primary/80' : 'text-muted-foreground'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div 
                      className={`w-12 h-1 rounded-full transition-all duration-500 ${
                        index < currentStep ? 'bg-primary shadow-sm' : 'bg-muted'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Step counter */}
            <div className="text-sm font-bold text-primary-foreground bg-primary px-4 py-2 rounded-full shadow-lg ml-4">
              {currentStep + 1}/{totalSteps}
            </div>
          </div>
        </div>

        {/* Mobile & Small Tablet Layout */}
        <div className="md:hidden">
          {/* Logo */}
          <div className="flex justify-center items-center pt-3 pb-4">
            <img
              src="/lovable-uploads/0e7764bc-df65-4205-841f-740f7b35349b.png"
              alt="Artisan Studio"
              className="h-16 sm:h-18 w-auto object-contain"
            />
          </div>
          
          {/* Compact progress stepper */}
          <div className="flex items-center justify-between pb-4 px-2 w-full">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center space-y-1 flex-1">
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      index < currentStep 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-110' 
                        : index === currentStep 
                        ? 'bg-primary text-primary-foreground shadow-xl scale-115 ring-3 ring-primary/30' 
                        : 'bg-muted text-muted-foreground shadow-sm'
                    }`}
                  >
                    {index < currentStep ? '✓' : index + 1}
                  </div>
                  <span className={`text-[8px] sm:text-[9px] font-medium transition-colors duration-300 text-center whitespace-nowrap ${
                    index === currentStep ? 'text-primary' : index < currentStep ? 'text-primary/80' : 'text-muted-foreground'
                  }`}>
                    {step.label === 'ROOMS TO DESIGN' ? 'ROOMS' : step.label === 'BHK TYPE' ? 'BHK' : step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div 
                    className={`w-4 sm:w-6 h-0.5 rounded-full transition-all duration-500 mx-1 ${
                      index < currentStep ? 'bg-primary shadow-sm' : 'bg-muted'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
