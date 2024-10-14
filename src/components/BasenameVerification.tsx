// src/components/BasenameVerification.tsx
import React, { useState } from 'react';

interface Props {
  formData: {
    name: string;
    mobile: string;
    language: string;
  };
  prevStep: () => void;
}

const BasenameVerification: React.FC<Props> = ({ formData, prevStep }) => {
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  const handleVerification = () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <div className="max-w-md mx-auto">
      {!isVerified ? (
        <>
          <div className="mb-4">
            <h3 className="text-2xl font-semibold">Basename Verification</h3>
            <p className="text-gray-600">Register your onchain identity using Basename.</p>
          </div>
          <div className="mb-4">
            {/* Placeholder for Basename integration */}
            <button
              onClick={handleVerification}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
              disabled={isVerifying}
            >
              {isVerifying ? 'Verifying...' : 'Verify with Basename'}
            </button>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-green-600">Verification Successful!</h3>
          <p className="mt-4">You are now verified. Access community services below.</p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
          >
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default BasenameVerification;
