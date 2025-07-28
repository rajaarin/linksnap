import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import TrustIndicators from './components/TrustIndicators';
import DemoAccess from './components/DemoAccess';
import FeatureSidebar from './components/FeatureSidebar';
import Icon from '../../components/AppIcon';

const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Mock credentials for demonstration
  const mockCredentials = {
    email: 'demo@linksnap.com',
    password: 'demo123'
  };

  useEffect(() => {
    // Auto-focus on page load handled by LoginForm component
    document.title = 'Sign In - LinkSnap';
  }, []);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication logic
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Simulate successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        // Show success message briefly before redirect
        navigate('/link-management-dashboard', { 
          state: { 
            message: 'Welcome back! You have successfully signed in.',
            type: 'success'
          }
        });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Simulate social login delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock social login success
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      
      navigate('/link-management-dashboard', {
        state: {
          message: `Successfully signed in with ${provider}!`,
          type: 'success'
        }
      });
    } catch (err) {
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = () => {
    localStorage.setItem('isDemoUser', 'true');
    navigate('/url-shortening-home', {
      state: {
        message: 'Welcome to LinkSnap Demo! Explore our features.',
        type: 'info'
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16 lg:pt-18 min-h-screen flex">
        {/* Main Login Section */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="Link" size={24} color="white" strokeWidth={2.5} />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
              <p className="mt-2 text-muted-foreground">
                Sign in to your account to continue managing your links
              </p>
            </div>

            {/* Social Login */}
            <SocialLoginButtons 
              onSocialLogin={handleSocialLogin}
              loading={loading}
            />

            {/* Login Form */}
            <LoginForm
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />

            {/* Demo Access */}
            <DemoAccess onDemoAccess={handleDemoAccess} />

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link
                  to="/user-registration"
                  className="font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Sign up for free
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <TrustIndicators />
          </div>
        </div>

        {/* Feature Sidebar - Desktop Only */}
        <FeatureSidebar />
      </div>

      {/* Mock Credentials Notice - Development Only */}
      <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-sm shadow-lg lg:block hidden">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-yellow-800">Demo Credentials</p>
            <p className="text-xs text-yellow-700 mt-1">
              Email: {mockCredentials.email}<br />
              Password: {mockCredentials.password}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;