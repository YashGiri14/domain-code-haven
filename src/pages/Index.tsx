import React, { useState } from 'react';
import Header from '../components/Header';
import ProgressIndicator from '../components/ProgressIndicator';
import ConfigurationStep from '../components/ConfigurationStep';
import RoomsStep from '../components/RoomsStep';
import PackageStep from '../components/PackageStep';
import ContactStep from '../components/ContactStep';
import ResultsPage from '../components/ResultsPage';


const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  // State for form data
  const [selectedConfig, setSelectedConfig] = useState('');
  const [rooms, setRooms] = useState([
    { name: 'Living Room', count: 1 },
    { name: 'Bedroom', count: 1 },
    { name: 'Kitchen', count: 1 },
    { name: 'Dining', count: 1 },
    { name: 'Bathroom', count: 1 }
  ]);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [contactInfo, setContactInfo] = useState({});

  const totalSteps = 4;

  const handleConfigSelect = (config: string) => {
    setSelectedConfig(config);
    
    const bhkType = config.split(' - ')[0];
    let bedroomCount = 1;
    let bathroomCount = 1;
    
    // Set bedroom and bathroom to max for each BHK type
    if (bhkType === '1 BHK') {
      bedroomCount = 1;
      bathroomCount = 1;
    } else if (bhkType === '2 BHK') {
      bedroomCount = 2;
      bathroomCount = 2;
    } else if (bhkType === '3 BHK') {
      bedroomCount = 3;
      bathroomCount = 3;
    } else if (bhkType === '4 BHK') {
      bedroomCount = 4;
      bathroomCount = 4;
    } else if (bhkType === '5 BHK+') {
      bedroomCount = 5;
      bathroomCount = 5;
    }
    
    // Update rooms with new defaults
    const newRooms = [
      { name: 'Living Room', count: 1 },
      { name: 'Bedroom', count: bedroomCount },
      { name: 'Kitchen', count: 1 },
      { name: 'Dining', count: 1 },
      { name: 'Bathroom', count: bathroomCount }
    ];
    
    setRooms(newRooms);
  };

  const getRoomLimits = (roomName: string) => {
    if (!selectedConfig) return { min: 0, max: 3 };
    
    const bhkType = selectedConfig.split(' - ')[0];
    
    // All rooms have same limits based on BHK type
    if (bhkType === '1 BHK') return { min: 0, max: 1 };
    if (bhkType === '2 BHK') return { min: 0, max: 2 };
    if (bhkType === '3 BHK') return { min: 0, max: 3 };
    if (bhkType === '4 BHK') return { min: 0, max: 4 };
    if (bhkType === '5 BHK+') return { min: 0, max: 10 };
    
    return { min: 0, max: 3 };
  };

  const handleRoomCountChange = (roomName: string, count: number) => {
    const limits = getRoomLimits(roomName);
    const validCount = Math.max(limits.min, Math.min(limits.max, count));
    
    setRooms(rooms.map(room => 
      room.name === roomName ? { ...room, count: validCount } : room
    ));
  };

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleContactSubmit = async (formData: any) => {
    setContactInfo(formData);
    setShowResults(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (showResults) {
    return (
      <ResultsPage
        configuration={selectedConfig}
        rooms={rooms}
        packageType={selectedPackage}
        contactInfo={contactInfo}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-100 flex flex-col relative">
      {/* Fixed Header */}
      <Header currentStep={currentStep} totalSteps={totalSteps} />
      
      {/* Main Content - positioned at bottom */}
      <div className="flex-1 flex items-end pt-[157px] sm:pt-[147px] pb-0 px-2 sm:px-4">
        <div className="max-w-2xl sm:max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-t-lg shadow-lg max-h-[calc(100vh-140px)] sm:max-h-[calc(100vh-80px)] flex flex-col">
            {/* Scrollable content area with hidden scrollbar */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 scrollbar-hide">
              {currentStep === 0 && (
                <ConfigurationStep
                  selectedConfig={selectedConfig}
                  onConfigSelect={handleConfigSelect}
                  onNext={nextStep}
                />
              )}
              
              {currentStep === 1 && (
                <RoomsStep
                  rooms={rooms}
                  onRoomCountChange={handleRoomCountChange}
                  onNext={nextStep}
                  onPrevious={previousStep}
                  getRoomLimits={getRoomLimits}
                />
              )}
              
              {currentStep === 2 && (
                <PackageStep
                  selectedPackage={selectedPackage}
                  onPackageSelect={handlePackageSelect}
                  onNext={nextStep}
                  onPrevious={previousStep}
                />
              )}
              
              {currentStep === 3 && (
                <ContactStep
                  onSubmit={handleContactSubmit}
                  onPrevious={previousStep}
                />
              )}
            </div>
            
            {/* Navigation Container integrated with main box - Fixed to bottom */}
            <div className="bg-white border-t border-gray-100 p-3 sm:p-4 rounded-b-lg sticky bottom-0">
              <div className="flex justify-between items-center">
                {currentStep > 0 ? (
                  <button
                    onClick={previousStep}
                    className="px-4 sm:px-6 py-2 text-gray-800 font-medium text-xs sm:text-sm uppercase tracking-wide hover:text-yellow-600 transition-colors"
                  >
                    BACK
                  </button>
                ) : <div></div>}
                
                {currentStep < totalSteps - 1 && (
                  <button
                    onClick={nextStep}
                    disabled={currentStep === 0 && !(selectedConfig && (selectedConfig === '5 BHK+' || selectedConfig === '1 BHK' || selectedConfig.includes(' - ')))}
                    className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm uppercase tracking-wide transition-all shadow-md ${
                      (currentStep === 0 && !(selectedConfig && (selectedConfig === '5 BHK+' || selectedConfig === '1 BHK' || selectedConfig.includes(' - '))))
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-yellow-500 text-gray-800 hover:bg-yellow-400'
                    }`}
                  >
                    NEXT
                  </button>
                )}
                
                {currentStep === totalSteps - 1 && (
                  <button
                    onClick={() => {
                      // Check if form is valid before submitting
                      const ContactStepElement = document.querySelector('[data-step="contact"]');
                      if (ContactStepElement) {
                        const submitBtn = ContactStepElement.querySelector('button[type="submit"]') as HTMLButtonElement;
                        if (submitBtn) submitBtn.click();
                      }
                    }}
                    className="px-6 sm:px-8 py-2 sm:py-3 bg-yellow-500 text-gray-800 font-medium hover:bg-yellow-400 transition-colors rounded-full text-xs sm:text-sm uppercase tracking-wide shadow-md"
                  >
                    SUBMIT
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
