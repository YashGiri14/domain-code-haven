import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 fixed bottom-0 left-0 right-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-12">
          <p className="text-sm text-gray-500">
            © 2024 Artisan Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;