
import React, { useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';

interface OTPVerificationProps {
  mobile: string;
  onVerified: (otp: string) => Promise<boolean>;
  onBack: () => void;
  onResend: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  mobile,
  onVerified,
  onBack,
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
    <div className="animate-fade-in p-1 sm:p-2 md:p-4 w-full max-w-full overflow-hidden">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center mb-1 sm:mb-2 md:mb-2 text-gray-800 px-1 sm:px-2">
  Verify your mobile number
</h2>
<p className="text-center text-gray-600 mb-2 sm:mb-3 md:mb-4 px-1 sm:px-2 text-xs sm:text-sm break-all">
  We've sent a 6-digit code to <span className="font-medium">+91{mobile}</span>
</p>     
      <div className="max-w-sm mx-auto space-y-3 sm:space-y-4 md:space-y-6 mb-4 sm:mb-6 md:mb-8 px-1 sm:px-2">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setError('');
            }}
          >
            <InputOTPGroup className="gap-1 sm:gap-2">
              <InputOTPSlot index={0} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-xs sm:text-sm" />
              <InputOTPSlot index={1} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-xs sm:text-sm" />
              <InputOTPSlot index={2} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-xs sm:text-sm" />
              <InputOTPSlot index={3} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-xs sm:text-sm" />
              <InputOTPSlot index={4} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-xs sm:text-sm" />
              <InputOTPSlot index={5} className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-xs sm:text-sm" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        
        {error && (
          <p className="text-center text-red-600 text-xs sm:text-sm">{error}</p>
        )}
        
        <div className="text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-blue-600 text-xs sm:text-sm underline hover:text-blue-800 disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>
      </div>

      <div className="flex justify-between px-1 sm:px-2 gap-2">
        <button
          onClick={onBack}
          className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 bg-black text-white font-medium hover:bg-gray-800 transition-colors rounded text-xs sm:text-sm flex-shrink-0"
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={otp.length !== 6 || isVerifying}
          className={`px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 font-medium transition-all duration-200 rounded text-xs sm:text-sm flex-shrink-0 ${
            otp.length === 6 && !isVerifying
              ? 'bg-yellow-400 text-black hover:bg-yellow-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
