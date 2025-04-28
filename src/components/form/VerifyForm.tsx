import React from 'react';
import { verifyToken } from '@/api/auth';

interface VerifyFormProps {
  email: string;
  onVerificationSuccess: () => void;
  onClose: () => void;
}

const VerifyForm: React.FC<VerifyFormProps> = ({ email, onVerificationSuccess, onClose }) => {
  const [otp, setOtp] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (otp.length !== 6) {
      setError('OTP must be 6 digits.');
      setIsLoading(false);
      return;
    }
    try {
      const response = await verifyToken(otp, email);
      if (response.status === 200) {
        console.log('Verification successful');
        onVerificationSuccess();
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-4 py-8 lg:px-8 w-auto relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        X
      </button>
      <div className="w-full items-center justify-center">
        <h2 className="text-2xl font-semibold mb-4">Verify Your Email</h2>
        <p className="mb-4">
          We have sent an OTP to <strong>{email}</strong>. Please enter it below to verify your email address.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="appearance-none border-none rounded-lg w-full py-[16px] px-[16px] text-[#858585] font-medium text-sm leading-tight focus:outline-none focus:ring-2 focus:ring-[#1F3E97] bg-[#F1F1F1] placeholder-[#858585]"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="bg-[#1F3E97] hover:bg-blue-800 text-white text-xl font-semibold py-[16px] px-[64px] rounded-lg focus:outline-none focus:shadow-outline w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyForm;
