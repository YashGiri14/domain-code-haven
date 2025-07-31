
import React from 'react';

interface ResultsPageProps {
  configuration: string;
  rooms: Array<{ name: string; count: number }>;
  packageType: string;
  contactInfo: any;
}

const ResultsPage: React.FC<ResultsPageProps> = ({
  configuration,
  rooms,
  packageType,
  contactInfo
}) => {
  const totalRooms = rooms.reduce((sum, room) => sum + room.count, 0);
  const basePrice = 48000;
  const estimate = (basePrice * totalRooms * (packageType === 'Luxury Lux' ? 2.5 : 1)).toFixed(0);

  const roomsList = rooms
    .filter(room => room.count > 0)
    .map(room => `${room.count} ${room.name}${room.count > 1 ? 's' : ''}`)
    .join(', ');

  // Get the appropriate image based on package type
  const getPackageImage = () => {
    if (packageType === 'Luxury Lux') {
      return '/lovable-uploads/cec37b96-b2fa-466c-bce0-12e56097efb2.png';
    } else {
      return '/lovable-uploads/34d3ec1f-5d16-40e4-a4cd-b54eed4a3dab.png';
    }
  };

  const handleBackToStart = () => {
    window.location.reload(); // This will refresh the page and go back to the first step
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6">
            <div className="inline-block mb-2">
              <img
                src="/lovable-uploads/0e7764bc-df65-4205-841f-740f7b35349b.png"
                alt="Artisan Studio"
                className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto mx-auto"
              />
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-1 text-gray-800">
              Your estimate is ready now
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-2">
              We ensure that your new home is going to be amazing.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8">
            <div className="lg:w-1/2">
              <img
                src={getPackageImage()}
                alt={`${packageType} Interior Design`}
                className="w-full rounded-lg shadow-md object-cover h-48 sm:h-64 md:h-80 lg:h-auto"
              />
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-lg">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{packageType} (₹)</h3>
                  <span className="text-xl sm:text-2xl font-bold text-green-600">₹ {estimate} L*</span>
                </div>
                
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                  A variety of standard home interior solutions tailored to meet all your needs.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <span className="font-medium text-gray-800 text-sm sm:text-base">Configuration:</span>
                    <span className="ml-2 text-gray-600 text-sm sm:text-base">{configuration}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-800 text-sm sm:text-base">Rooms:</span>
                    <span className="ml-2 text-gray-600 text-sm sm:text-base">{roomsList}</span>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-800 text-sm sm:text-base">Furniture:</span>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                      1 Sofa (3+2 Seater, Standard Fabric Material), 1 TV Unit (Maximum 6x4 feet Panel and 4x1 Box with 3 drawers, BWP Material, Laminate finish, Basic Accessories), 1 Queen Size Bed (Maximum 6x5 feet, BWP Material, Laminate finish), 1 Modular Wardrobe (Maximum 7X4 feet, 2-Door Swing, BWP Material, Laminate finish, Basic Accessories), Basic Vanity Unit, Modular Kitchen (BWP Material, Matt Finish, Basic Accessories), 1 Dining Table (4x3 laminate table, 4 basic chairs)
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-gray-800 text-sm sm:text-base">Services:</span>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1">
                      False Ceiling (only living room, maximum 120 square feet), painting (maximum 830 square feet)
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-xs text-gray-600 leading-relaxed">
                    *This is just an estimated price based on what our clients usually spend. The final cost may be higher or lower depending on things like the materials you choose, the amount of furniture, any necessary construction work (painting, flooring, plumbing, etc.), design features, and the type of wood used. Don't worry, our designers will help you understand everything.
                  </p>
                </div>
                
                <button className="w-full mt-4 sm:mt-6 bg-black text-white py-2 sm:py-3 font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base">
                  Visit our website
                </button>
                
                <button
                  onClick={handleBackToStart}
                  className="w-full mt-3 px-4 py-2 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-sm flex items-center justify-center gap-2"
                >
                  ← Back to Start
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-gray-600 px-2">
              Thank you for choosing Artisan Studio, {contactInfo.name}! We'll contact you at {contactInfo.mobile} to discuss your project further.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
