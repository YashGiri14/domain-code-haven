import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import InfoModal from './InfoModal';

interface ConfigurationStepProps {
  selectedConfig: string;
  onConfigSelect: (config: string) => void;
  onNext: () => void;
}

const ConfigurationStep: React.FC<ConfigurationStepProps> = ({
  selectedConfig,
  onConfigSelect,
  onNext
}) => {
  const [showSubOptions, setShowSubOptions] = useState(false);
  const [selectedSubOption, setSelectedSubOption] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const configurations = [
    { id: '1-bhk', label: '1 BHK', value: '1 BHK' },
    { id: '2-bhk', label: '2 BHK', value: '2 BHK' },
    { id: '3-bhk', label: '3 BHK', value: '3 BHK' },
    { id: '4-bhk', label: '4 BHK', value: '4 BHK' },
    { id: '5-bhk', label: '5 BHK+', value: '5 BHK+' }
  ];

  const handleConfigSelect = (value: string) => {
    onConfigSelect(value);
    if (value !== '5 BHK+' && value !== '1 BHK') {
      setShowSubOptions(true);
      setSelectedSubOption('');
    } else {
      setShowSubOptions(false);
      setSelectedSubOption('');
    }
  };

  const handleSubOptionSelect = (subOption: string, bhkType: string) => {
    setSelectedSubOption(subOption);
    onConfigSelect(`${bhkType} - ${subOption}`);
  };

  // Return isNextEnabled for parent component to use
  React.useEffect(() => {
    // This will trigger re-render in parent to update button state
  }, [selectedConfig, selectedSubOption]);

  return (
    <>
      <InfoModal
        title="BHK Configuration Information"
        content="Select your apartment type based on the number of bedrooms, hall, and kitchen. We offer customized interior design solutions for each configuration. Small apartments are typically compact spaces with efficient layouts, while large apartments offer more spacious living areas with enhanced design possibilities."
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    <div className="h-full flex flex-col pt-6 sm:pt-4">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Select your BHK type
          </h2>
        <p className="text-gray-600 text-sm">
          To know more about this, <span className="text-yellow-600 cursor-pointer underline" onClick={() => setShowInfoModal(true)}>click here</span>
        </p>
        </div>
        
        {/* BHK Options */}
        <div className="space-y-4">
          {configurations.map((config) => (
            <div key={config.id} className="space-y-0">
              <div 
                onClick={() => handleConfigSelect(config.value)}
                className="flex items-center justify-between py-4 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedConfig.split(' - ')[0] === config.value
                      ? 'border-yellow-500 bg-yellow-500'
                      : 'border-gray-300'
                  }`}></div>
                  <label 
                    className="text-base font-medium cursor-pointer text-gray-700"
                  >
                    {config.label}
                  </label>
                </div>
                {config.value !== '5 BHK+' && config.value !== '1 BHK' && (
                  <svg 
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      showSubOptions && selectedConfig.split(' - ')[0] === config.value ? 'rotate-180' : ''
                    }`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
                
                {config.value !== '5 BHK+' && config.value !== '1 BHK' && showSubOptions && selectedConfig.split(' - ')[0] === config.value && (
                  <div className="pb-4 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <button
                        onClick={() => handleSubOptionSelect('Small', config.value)}
                        className={`p-4 border-2 rounded-lg text-sm transition-all ${
                          selectedSubOption === 'Small'
                            ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedSubOption === 'Small'
                              ? 'border-yellow-400 bg-yellow-400'
                              : 'border-gray-300'
                          }`}></div>
                          <div className="text-left">
                            <div className="font-medium">Small</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {config.value === '1 BHK' ? 'Below 600 sq ft' : 
                               config.value === '2 BHK' ? 'Below 800 sq ft' :
                               config.value === '3 BHK' ? 'Below 1200 sq ft' :
                               'Below 1500 sq ft'}
                            </div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => handleSubOptionSelect('Large', config.value)}
                        className={`p-4 border-2 rounded-lg text-sm transition-all ${
                          selectedSubOption === 'Large'
                            ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full border-2 ${
                            selectedSubOption === 'Large'
                              ? 'border-yellow-400 bg-yellow-400'
                              : 'border-gray-300'
                          }`}></div>
                          <div className="text-left">
                            <div className="font-medium">Large</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {config.value === '1 BHK' ? 'Above 600 sq ft' : 
                               config.value === '2 BHK' ? 'Above 800 sq ft' :
                               config.value === '3 BHK' ? 'Above 1200 sq ft' :
                               'Above 1500 sq ft'}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default ConfigurationStep;