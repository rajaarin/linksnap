import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw, CreditCard, MessageCircle, ArrowLeft, Copy, Check } from 'lucide-react';
import Button from '../../components/ui/Button';

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  
  // Get error details from URL params or default values
  const urlParams = new URLSearchParams(window.location.search);
  const errorReason = urlParams.get('error') || 'Payment could not be processed';
  const transactionId = urlParams.get('transaction_id') || 'TXN-' + Date.now();
  
  const handleRetryPayment = () => {
    window.open('https://payments.cashfree.com/forms?code=linksnappremium', '_blank');
  };

  const handleChangePaymentMethod = () => {
    window.open('https://payments.cashfree.com/forms?code=linksnappremium', '_blank');
  };

  const handleContinueAsFree = () => {
    navigate('/link-management-dashboard');
  };

  const handleContactSupport = () => {
    window.open('mailto:support@linksnap.co?subject=Payment Failed - Transaction ID: ' + transactionId, '_blank');
  };

  const copyTransactionId = async () => {
    try {
      await navigator.clipboard.writeText(transactionId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = transactionId;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-lg font-semibold text-foreground">Payment Failed</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          {/* Failure Icon */}
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
          
          {/* Main Message */}
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Payment Could Not Be Processed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            We encountered an issue while processing your premium subscription payment. 
            Don't worry - no charges have been made to your account.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <h3 className="text-lg font-semibold text-red-900 mb-2">Error Details</h3>
            <p className="text-red-800 mb-4">{errorReason}</p>
            
            {/* Transaction ID */}
            <div className="flex items-center justify-center space-x-2 text-sm text-red-700">
              <span>Transaction ID:</span>
              <code className="bg-red-100 px-2 py-1 rounded">{transactionId}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyTransactionId}
                className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg border shadow-sm p-6 max-w-2xl mx-auto mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Attempted Purchase</h3>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-muted-foreground">Premium Subscription</span>
            <span className="font-medium">₹199</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium">3 months</span>
          </div>
          <div className="flex justify-between items-center py-3 font-semibold text-lg">
            <span>Total</span>
            <span>₹199</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          <Button
            onClick={handleRetryPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button
            onClick={handleChangePaymentMethod}
            variant="outline"
            className="w-full"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Change Payment Method
          </Button>
          
          <Button
            onClick={handleContactSupport}
            variant="outline"
            className="w-full"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
          
          <Button
            onClick={handleContinueAsFree}
            variant="ghost"
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Continue as Free User
          </Button>
        </div>

        {/* Troubleshooting Tips */}
        <div className="bg-white rounded-lg border shadow-sm p-6 max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-4">Common Solutions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Payment Issues</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check if your card has sufficient balance</li>
                <li>• Verify your card details are correct</li>
                <li>• Ensure your card supports online payments</li>
                <li>• Try using a different payment method</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Technical Issues</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Check your internet connection</li>
                <li>• Clear browser cache and cookies</li>
                <li>• Disable ad blockers temporarily</li>
                <li>• Try using a different browser</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span>Bank Grade Security</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span>24/7 Support</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Questions? Email us at support@linksnap.co or call +91-8000-XXX-XXX
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;