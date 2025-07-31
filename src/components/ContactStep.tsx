import React, { useState } from 'react';
import OTPPopup from './OTPPopup';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';

declare global {
  interface Window {
    recaptchaVerifier: any;
    confirmationResult: any;
  }
}

interface ContactStepProps {
  onSubmit: (formData: any) => void;
  onPrevious: () => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ onSubmit, onPrevious }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    whatsappUpdates: true
  });
  const [showOTPPopup, setShowOTPPopup] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    mobile: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile number format
    return phoneRegex.test(phone);
  };

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          console.log('Recaptcha verified');
        },
        'expired-callback': () => {
          console.log('Recaptcha expired');
        }
      });
    }
  };

  const sendOTP = async (mobile: string) => {
    try {
      setLoading(true);
      
      // COMMENTED OUT FOR DEMO - UNCOMMENT WHEN BILLING IS ENABLED
      /*
      setupRecaptcha();
      
      const appVerifier = window.recaptchaVerifier;
      const formattedPhone = `+91${mobile}`;
      
      console.log('Sending OTP to:', formattedPhone);
      
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      window.confirmationResult = confirmation;
      
      console.log('OTP sent successfully');
      */
      
      // FOR DEMO: Just show OTP popup without sending actual OTP
      console.log('Demo mode: Showing OTP popup without sending SMS');
      setShowOTPPopup(true);
      
      // Show demo message
      const successMsg = document.createElement('div');
      successMsg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded z-50';
      successMsg.textContent = 'Demo mode: Use 123456 as OTP';
      document.body.appendChild(successMsg);
      setTimeout(() => {
        if (document.body.contains(successMsg)) {
          document.body.removeChild(successMsg);
        }
      }, 5000);
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/billing-not-enabled') {
        alert('Firebase billing not enabled. Please upgrade your Firebase project to use phone authentication.');
      } else if (error.code === 'auth/invalid-phone-number') {
        alert('Invalid phone number format');
      } else {
        alert(`Failed to send OTP: ${error.message}`);
      }
      
      // For demo purposes, show OTP popup anyway
      setShowOTPPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Clear errors when user starts typing
    if (name === 'mobile' && errors.mobile) {
      setErrors({ ...errors, mobile: '' });
    }
  };

  const handleMobileSubmit = async () => {
    // Validate phone number
    if (!validatePhone(formData.mobile)) {
      setErrors({ ...errors, mobile: 'Please enter a valid 10-digit mobile number starting with 6-9' });
      return;
    }
    
    if (formData.mobile.length >= 10) {
      await sendOTP(formData.mobile);
    }
  };

  const handleOTPVerified = async (enteredOtp: string) => {
    try {
      // COMMENTED OUT FOR DEMO - UNCOMMENT WHEN BILLING IS ENABLED
      /*
      if (window.confirmationResult) {
        const result = await window.confirmationResult.confirm(enteredOtp);
        console.log('Phone number verified successfully:', result.user);
        setIsVerified(true);
        setShowOTPPopup(false);
        
        // Auto-submit after verification
        if (isFormValid) {
          onSubmit(formData);
        }
        return true;
      } else {
      */
        // For demo purposes when Firebase billing is not enabled
        if (enteredOtp === '123456') {
          console.log('Demo OTP verified');
          setIsVerified(true);
          setShowOTPPopup(false);
          
          // Auto-submit after verification
          setTimeout(() => {
            console.log('Auto-submitting after OTP verification...');
            console.log('Form data:', formData);
            console.log('Form valid check:', formData.name && formData.mobile && validatePhone(formData.mobile) && formData.address);
            if (formData.name && formData.mobile && validatePhone(formData.mobile) && formData.address) {
              console.log('Calling onSubmit...');
              onSubmit(formData);
            } else {
              console.log('Form validation failed:', {
                name: formData.name,
                mobile: formData.mobile,
                mobileValid: validatePhone(formData.mobile),
                address: formData.address
              });
            }
          }, 100);
          
          return true;
        }
        return false;
      /*
      }
      */
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  };

  const handleResendOTP = async () => {
    await sendOTP(formData.mobile);
  };

  const handleCloseOTPPopup = () => {
    setShowOTPPopup(false);
  };

  const handleSubmit = async () => {
    // Validate phone number
    if (!validatePhone(formData.mobile)) {
      setErrors({ ...errors, mobile: 'Please enter a valid 10-digit mobile number starting with 6-9' });
      return;
    }

    // If already verified, submit directly
    if (isVerified) {
      if (isFormValid) {
        onSubmit(formData);
      }
      return;
    }

    // Show OTP popup if not verified
    await sendOTP(formData.mobile);
  };

  const isFormValid = formData.name && 
                     formData.mobile && 
                     validatePhone(formData.mobile) &&
                     formData.address;

  return (
    <>
      {showOTPPopup && (
        <OTPPopup
          mobile={formData.mobile}
          onVerified={handleOTPVerified}
          onClose={handleCloseOTPPopup}
          onResend={handleResendOTP}
        />
      )}
    <div className="animate-fade-in p-1 sm:p-2 md:p-4 w-full max-w-full overflow-hidden h-full flex flex-col pt-6 sm:pt-4" data-step="contact">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-center mb-1 sm:mb-2 md:mb-2 text-gray-800 px-1 sm:px-2">
  Your estimate is almost ready
</h2>
<p className="text-center text-gray-600 mb-2 sm:mb-3 md:mb-4 lg:mb-5 px-1 sm:px-2 text-xs sm:text-sm">
  Tailor your space with your ideal configuration
</p>

      
      <div className="flex-1 overflow-y-auto min-h-[400px]">
        <div className="max-w-sm mx-auto space-y-3 px-1 sm:px-2">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-sm sm:text-base"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-sm sm:text-base"
          />
          
          
          <div className="flex gap-1 sm:gap-2">
            <div className="flex items-center bg-orange-100 px-2 py-2 border border-gray-300 rounded-l text-xs sm:text-sm">
              <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAyMCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjE0IiBmaWxsPSIjRkY5OTMzIi8+CjxyZWN0IHk9IjQuNjY2NjciIHdpZHRoPSIyMCIgaGVpZ2h0PSI0LjY2NjY3IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB5PSI5LjMzMzMzIiB3aWR0aD0iMjAiIGhlaWdodD0iNC42NjY2NyIgZmlsbD0iIzEzOEEzNiIvPgo8Y2lyY2xlIGN4PSIxMCIgY3k9IjciIHI9IjIiIGZpbGw9IiMyQTJBNzIiLz4KPC9zdmc+" alt="India" className="w-4 h-3" />
              <span className="ml-1">+91</span>
            </div>
            <div className="flex-1 min-w-0">
              <input
                type="tel"
                name="mobile"
                placeholder="Phone number"
                value={formData.mobile}
                onChange={handleInputChange}
                maxLength={10}
                className={`w-full px-3 sm:px-4 py-3 border ${errors.mobile ? 'border-red-500' : 'border-gray-300'} focus:border-yellow-400 focus:outline-none transition-colors rounded-r text-sm sm:text-base`}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
              )}
            </div>
            {isVerified && (
              <div className="px-2 py-2 bg-green-100 text-green-700 text-xs font-medium rounded flex items-center whitespace-nowrap flex-shrink-0">
                ✓ Verified
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2 p-3 rounded-lg">
            <input
              type="checkbox"
              name="whatsappUpdates"
              id="whatsappUpdates"
              checked={formData.whatsappUpdates}
              onChange={handleInputChange}
              className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
            />
            <label htmlFor="whatsappUpdates" className="text-sm text-gray-700 cursor-pointer">
              ✓ Send me updates on WhatsApp
            </label>
          </div>
          
          <input
            type="text"
            name="address"
            placeholder="Property Name"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-3 sm:px-4 py-3 border border-gray-300 focus:border-yellow-400 focus:outline-none transition-colors rounded text-sm sm:text-base"
          />
          
          <div className="text-center text-xs text-gray-600 mt-3 px-1 sm:px-2">
             <p className="mb-1">
               By submitting this form, you agree to our{' '}
               <span className="text-yellow-600 cursor-pointer underline" onClick={() => {
                 const modal = document.createElement('div');
                 modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
                 modal.innerHTML = `
  <div class="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto text-sm text-gray-700">
    <h3 class="text-xl font-semibold mb-4 text-center">Artizan Studio Privacy Policy & Terms and Conditions</h3>
    
    <p><strong>Effective Date:</strong> [Insert Date]</p>
    <p>Thank you for using Artizan Studio's cost calculator. We value your trust and are committed to protecting your privacy and offering a transparent user experience.</p>

    <h4 class="font-semibold mt-4 text-gray-800">1. Privacy Policy</h4>
    <p><strong>1.1. Information We Collect</strong><br>
    - Full Name<br>
    - Mobile Number<br>
    - Email Address<br>
    - Residential or Project Address<br>
    - Property Details</p>

    <p><strong>1.2. How We Use Your Data</strong><br>
    - To generate an estimate<br>
    - To contact you via call/SMS/WhatsApp<br>
    - For follow-ups and personalization</p>

    <p><strong>1.3. Communication Consent:</strong> By submitting your info, you agree to receive service-related communication.</p>
    <p><strong>1.4. Data Security:</strong> We do not share or sell your data. Stored securely.</p>
    <p><strong>1.5. Opt-Out Option:</strong> Reply STOP or contact us at [Insert Email]</p>
    <p><strong>1.6. Third-Party Tools:</strong> May use tools like WhatsApp API, GTM, etc. for improving services.</p>
    <p><strong>1.7. Cookies:</strong> Cookies help improve site performance. Can be disabled in browser.</p>
    <p><strong>1.8. Children’s Privacy:</strong> Not intended for users under 18.</p>

    <h4 class="font-semibold mt-4 text-gray-800">2. Terms and Conditions</h4>
    <p><strong>2.1. Nature of Estimate:</strong> Non-binding, indicative only.</p>
    <p><strong>2.2. Pricing Disclaimer:</strong> Subject to changes based on site visit, material choice, etc.</p>
    <p><strong>2.3. IP:</strong> All website content is owned by Artizan Studio.</p>
    <p><strong>2.4. Limitation of Liability:</strong> Not liable for online errors or mismatches.</p>
    <p><strong>2.5. Right to Refuse:</strong> May refuse service for undefined projects or unmet terms.</p>
    <p><strong>2.6. Jurisdiction:</strong> Navi Mumbai courts.</p>
    <p><strong>2.7. Project Timeline Disclaimer:</strong> Execution timeline not guaranteed via calculator.</p>
    <p><strong>2.8. Material Brand Variation:</strong> Brands may vary based on availability.</p>
    <p><strong>2.9. Revision Policy:</strong> Estimate may be revised post site visit.</p>
    <p><strong>2.10. No Commitment:</strong> Calculator use does not form a legal agreement.</p>
    <p><strong>2.11. Estimate Expiry:</strong> Valid for 15 days from generation.</p>

    <h4 class="font-semibold mt-4 text-gray-800">3. Consent Reminder</h4>
    <p>By clicking "Get Estimate", you:<br>
    - Confirm accuracy of details<br>
    - Agree that cost is indicative<br>
    - Consent to being contacted<br>
    - Accept this Privacy Policy & Terms</p>

    <p class="mt-6 text-sm text-center text-gray-500">[Insert Year] Artizan Studio Private Limited. All rights reserved.</p>

    <div class="text-center mt-6">
      <button class="bg-yellow-500 text-gray-800 px-4 py-2 rounded hover:bg-yellow-400" onclick="document.body.removeChild(this.closest('.fixed'))">Close</button>
    </div>
  </div>
`;

                 document.body.appendChild(modal);
               }}>Privacy Policy & Terms</span>
             </p>
             <p>
               This site is protected by reCAPTCHA and the Google{' '}
               <span className="text-yellow-600 cursor-pointer underline" onClick={() => window.open('https://policies.google.com/privacy', '_blank')}>Privacy Policy</span>
               {' and '}
               <span className="text-yellow-600 cursor-pointer underline" onClick={() => window.open('https://policies.google.com/terms', '_blank')}>Terms of Service</span>
               {' apply.'}
             </p>
          </div>
        </div>
      </div>

      
      <button 
        type="submit"
        onClick={handleSubmit}
        style={{ display: 'none' }}
        disabled={!isFormValid}
      >
        Hidden Submit
      </button>
      
      <div id="recaptcha-container"></div>
    </div>
    </>
  );
};

export default ContactStep;
