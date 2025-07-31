
import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import InfoModal from './InfoModal';

interface Room {
  name: string;
  count: number;
}

interface RoomsStepProps {
  rooms: Room[];
  onRoomCountChange: (roomName: string, count: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  getRoomLimits: (roomName: string) => { min: number; max: number };
}

const RoomsStep: React.FC<RoomsStepProps> = ({
  rooms,
  onRoomCountChange,
  onNext,
  onPrevious,
  getRoomLimits
}) => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  return (
    <>
      <InfoModal
        title="Room Design Information"
        content="Our expert designers will create personalized solutions for each room based on your lifestyle, preferences, and space requirements. We handle everything from space planning to furniture selection and color coordination. Each room is designed with attention to functionality, aesthetics, and your specific needs."
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    <div className="animate-fade-in p-1 sm:p-2 md:p-4 w-full max-w-full overflow-hidden h-full flex flex-col pt-6 sm:pt-4">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center mb-1 sm:mb-2 md:mb-2 text-gray-800 px-1 sm:px-2">
        Select the rooms you'd like us to design
      </h2>
      <p className="text-center text-gray-600 mb-2 sm:mb-3 md:mb-4 lg:mb-5 px-1 sm:px-2 text-xs sm:text-sm">
        To know more about this, <span className="text-yellow-600 cursor-pointer underline" onClick={() => setShowInfoModal(true)}>click here</span>
      </p>
      
      <div className="flex-1 overflow-y-auto min-h-[400px]">
        <div className="max-w-sm mx-auto space-y-3 px-1 sm:px-2">
          {rooms.map((room) => {
            const limits = getRoomLimits(room.name);
            return (
              <div key={room.name} className="flex items-center justify-between px-3 sm:px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-sm sm:text-base font-medium text-gray-800">{room.name}</span>
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <button
                    onClick={() => onRoomCountChange(room.name, room.count - 1)}
                    disabled={room.count <= limits.min}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                      room.count <= limits.min
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-500 text-gray-800 hover:bg-yellow-400 shadow-md'
                    }`}
                  >
                    <Minus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                  <span className="text-lg sm:text-xl font-medium w-6 sm:w-8 text-center">{room.count}</span>
                  <button
                    onClick={() => onRoomCountChange(room.name, room.count + 1)}
                    disabled={room.count >= limits.max}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${
                      room.count >= limits.max
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-500 text-gray-800 hover:bg-yellow-400 shadow-md'
                    }`}
                  >
                    <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default RoomsStep;
