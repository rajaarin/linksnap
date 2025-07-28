import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SocialRegistration from './components/SocialRegistration';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import EmailVerificationNotice from './components/EmailVerificationNotice';
import PremiumFeaturesSidebar from './components/PremiumFeaturesSidebar';

const UserRegistration = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form' | 'verification'
  const [registeredEmail, setRegisteredEmail] = useState('');

  // Mock credentials for testing
  const mockCredentials = {
    email: 'test@linksnap.com',
    password: 'LinkSnap123!',
    name: 'John Doe',
    company: 'Tech Solutions Inc.'
  };

  const handleSocialRegister = async (provider) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Registering with ${provider}`);
      setIsLoading(false);
      navigate('/link-management-dashboard');
    }, 2000);
  };

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    
    // Simulate registration API call
    setTimeout(() => {
      console.log('Registration data:', formData);
      setRegisteredEmail(formData.email);
      setRegistrationStep('verification');
      setIsLoading(false);
    }, 2000);
  };

  const handleResendEmail = () => {
    console.log('Resending verification email to:', registeredEmail);
  };

  const handleLoginRedirect = () => {
    navigate('/user-login');
  };

  if (registrationStep === 'verification') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <EmailVerificationNotice 
              email={registeredEmail}
              onResendEmail={handleResendEmail}
            />
            
            <div className="mt-8 text-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/user-login')}
                className="text-sm"
              >
                Already verified? Sign in
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Main Registration Form */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <Icon name="UserPlus" size={32} color="white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Join thousands of users who trust LinkSnap for their link management needs
                </p>
              </div>

              {/* Social Registration */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <SocialRegistration onSocialRegister={handleSocialRegister} />
                
                {/* Registration Form */}
                <RegistrationForm 
                  onSubmit={handleFormSubmit}
                  isLoading={isLoading}
                />

                {/* Login Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Button
                      variant="link"
                      onClick={handleLoginRedirect}
                      className="p-0 h-auto font-medium text-primary hover:underline"
                    >
                      Sign in
                    </Button>
                  </p>
                </div>
              </div>

              {/* Trust Signals */}
              <TrustSignals />

              {/* Mock Credentials Notice */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} color="#2563EB" className="flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900 mb-1">
                      Demo Credentials
                    </h4>
                    <div className="text-xs text-blue-800 space-y-1">
                      <p><strong>Email:</strong> {mockCredentials.email}</p>
                      <p><strong>Password:</strong> {mockCredentials.password}</p>
                      <p><strong>Name:</strong> {mockCredentials.name}</p>
                      <p><strong>Company:</strong> {mockCredentials.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Features Sidebar - Desktop Only */}
            <div className="hidden lg:block">
              <PremiumFeaturesSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Premium Features */}
      <div className="lg:hidden px-4 sm:px-6 pb-12">
        <div className="max-w-md mx-auto">
          <PremiumFeaturesSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;