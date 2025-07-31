import React, { useState } from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  title: string;
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ title, content, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        <div className="text-gray-600 text-sm leading-relaxed">
          {content}
        </div>
        <button 
          onClick={onClose}
          className="mt-4 bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InfoModal;