
import React from 'react';

interface Package {
  name: string;
  price: string;
  description: string;
  image: string;
}

interface PackageStepProps {
  selectedPackage: string;
  onPackageSelect: (packageName: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const PackageStep: React.FC<PackageStepProps> = ({
  selectedPackage,
  onPackageSelect,
  onNext,
  onPrevious
}) => {
  const packages: Package[] = [
    {
      name: 'Basic Blends',
      price: '₹',
      description: 'A range of essential home interior solutions that\'s perfect for all your needs.',
      image: '/lovable-uploads/34d3ec1f-5d16-40e4-a4cd-b54eed4a3dab.png'
    },
    {
      name: 'Luxury Lux',
      price: '₹₹₹',
      description: 'Premium quality interior design with luxury finishes and bespoke solutions.',
      image: '/lovable-uploads/cec37b96-b2fa-466c-bce0-12e56097efb2.png'
    }
  ];

  // Auto-select first package if none selected
  React.useEffect(() => {
    if (!selectedPackage && packages.length > 0) {
      onPackageSelect(packages[0].name);
    }
  }, [selectedPackage, onPackageSelect]);

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="text-center mb-8 pt-6 sm:pt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Pick your package
        </h2>
      </div>
      
      <div className="flex-1 max-w-xs sm:max-w-sm lg:max-w-md mx-auto w-full">
        <div className="space-y-3 mb-4">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              onClick={() => onPackageSelect(pkg.name)}
              className={`border-2 p-2 sm:p-3 cursor-pointer transition-all duration-200 rounded-lg ${
                selectedPackage === pkg.name
                  ? 'border-yellow-500 bg-yellow-50'
                  : 'border-gray-300 bg-white hover:border-gray-400'
              }`}
            >
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 mt-1 flex-shrink-0 ${
                  selectedPackage === pkg.name
                    ? 'border-yellow-500 bg-yellow-500'
                    : 'border-gray-300'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">
                    {pkg.name} ({pkg.price})
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{pkg.description}</p>
                   <img
                     src={pkg.image}
                     alt={pkg.name}
                     className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-lg"
                   />
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center space-x-2 text-green-600">
                      <span className="text-xs">✓</span>
                      <span className="text-xs">Affordable pricing</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <span className="text-xs">✓</span>
                      <span className="text-xs">Convenient designs</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <span className="text-xs">✓</span>
                      <span className="text-xs">Basic accessories</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default PackageStep;
