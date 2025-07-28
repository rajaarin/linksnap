import React from 'react';
import Icon from '../../../components/AppIcon';

const PasswordStrengthIndicator = ({ password }) => {
  const requirements = [
    { id: 'length', text: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { id: 'uppercase', text: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { id: 'lowercase', text: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { id: 'number', text: 'One number', test: (pwd) => /\d/.test(pwd) },
    { id: 'special', text: 'One special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const getStrengthLevel = () => {
    const passedCount = requirements.filter(req => req.test(password)).length;
    if (passedCount === 0) return { level: 0, text: '', color: '' };
    if (passedCount <= 2) return { level: 1, text: 'Weak', color: 'text-red-600' };
    if (passedCount <= 3) return { level: 2, text: 'Fair', color: 'text-yellow-600' };
    if (passedCount <= 4) return { level: 3, text: 'Good', color: 'text-blue-600' };
    return { level: 4, text: 'Strong', color: 'text-green-600' };
  };

  const strength = getStrengthLevel();

  if (!password) return null;

  return (
    <div className="mt-3 space-y-3">
      {/* Strength Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Password strength</span>
          <span className={`text-sm font-medium ${strength.color}`}>
            {strength.text}
          </span>
        </div>
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                level <= strength.level
                  ? level === 1
                    ? 'bg-red-500'
                    : level === 2
                    ? 'bg-yellow-500'
                    : level === 3
                    ? 'bg-blue-500' :'bg-green-500' :'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-2">
        <span className="text-sm text-gray-600">Password must contain:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {requirements.map((req) => {
            const isPassed = req.test(password);
            return (
              <div key={req.id} className="flex items-center space-x-2">
                <Icon
                  name={isPassed ? "CheckCircle" : "Circle"}
                  size={16}
                  color={isPassed ? "#10B981" : "#9CA3AF"}
                />
                <span className={`text-sm ${isPassed ? 'text-green-600' : 'text-gray-500'}`}>
                  {req.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;