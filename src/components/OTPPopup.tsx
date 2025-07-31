import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface OTPPopupProps {
  mobile: string;
  onVerified: (otp: string) => Promise<boolean>;
  onClose: () => void;
  onResend: () => void;
}

const OTPPopup: React.FC<OTPPopupProps> = ({
  mobile,
  onVerified,
  onClose,
  onResend
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [isResending, setIsResending] = useState(false);

  const handleVerify = async () => {
    if (otp.length === 6) {
      setIsVerifying(true);
      setError('');
      
      try {
        const isValid = await onVerified(otp);
        
        if (!isValid) {
          setError('Invalid OTP. Please try again.');
          setOtp('');
        } else {
          onClose(); // Close popup on successful verification
        }
      } catch (error) {
        setError('Error verifying OTP. Please try again.');
        setOtp('');
        console.error('OTP verification error:', error);
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setOtp('');
    setError('');
    
    try {
      await onResend();
      
      // Show success message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded z-50';
      successMsg.textContent = 'OTP sent successfully!';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 3000);
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
      console.error('Resend OTP error:', error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 animate-fade-in">
      <div className="bg-white w-full max-w-md mx-4 mb-4 rounded-t-2xl p-6 animate-slide-in-right shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Verify OTP</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <p className="text-center text-gray-600 mb-6 text-sm">
          We've sent a 6-digit code to <span className="font-medium">+91{mobile}</span>
        </p>
        
        <div className="flex justify-center mb-6">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError('');
              if (value.length === 6) {
                setTimeout(() => handleVerify(), 100);
              }
            }}
          >
            <InputOTPGroup className="gap-2">
              <InputOTPSlot index={0} className="w-10 h-12 text-lg" />
              <InputOTPSlot index={1} className="w-10 h-12 text-lg" />
              <InputOTPSlot index={2} className="w-10 h-12 text-lg" />
              <InputOTPSlot index={3} className="w-10 h-12 text-lg" />
              <InputOTPSlot index={4} className="w-10 h-12 text-lg" />
              <InputOTPSlot index={5} className="w-10 h-12 text-lg" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        {error && (
          <p className="text-center text-red-600 text-sm mb-4">{error}</p>
        )}
        
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-600 text-sm underline hover:text-blue-800 disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            disabled={otp.length !== 6 || isVerifying}
            className={`flex-1 px-4 py-3 font-medium rounded-lg transition-all ${
              otp.length === 6 && !isVerifying
                ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isVerifying ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPPopup;