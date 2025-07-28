import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmailVerificationNotice = ({ email, onResendEmail }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    onResendEmail();
    setCountdown(60);
    setCanResend(false);
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Icon name="Mail" size={32} color="#2563EB" />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Check Your Email
      </h3>

      <p className="text-gray-600 mb-4">
        We've sent a verification link to{' '}
        <span className="font-medium text-gray-900">{email}</span>
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
          <Icon name="Clock" size={16} />
          <span>Didn't receive the email? Check your spam folder</span>
        </div>

        <Button
          variant={canResend ? "outline" : "ghost"}
          onClick={handleResend}
          disabled={!canResend}
          className="mx-auto"
        >
          {canResend ? (
            'Resend Verification Email'
          ) : (
            `Resend in ${countdown}s`
          )}
        </Button>

        <div className="text-xs text-gray-500">
          <p>Having trouble? Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationNotice;