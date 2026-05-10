import React, { useState } from 'react';

interface EmailSignupFormProps {
  placeholder?: string;
  buttonText?: string;
  variant?: 'default' | 'inline';
  className?: string;
  onSubmit?: (email: string) => void;
}

export default function EmailSignupForm({ 
  placeholder = "Enter your email address",
  buttonText = "Get Early Access + Lifetime Deal",
  variant = 'default',
  className = '',
  onSubmit
}: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      // TODO: Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      if (onSubmit) {
        onSubmit(email);
      } else {
        // Default behavior - redirect to thank you page
        window.location.href = '/thank-you';
      }
      
      setSuccess(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 bg-success-green-light text-success-green rounded-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Successfully signed up! Check your email.
        </div>
      </div>
    );
  }

  const formClasses = variant === 'inline' 
    ? 'flex flex-col sm:flex-row gap-3 max-w-lg w-full'
    : 'space-y-4 max-w-md mx-auto';

  const inputClasses = `w-full px-4 py-3 text-base bg-gray-900 border border-gray-700 rounded
    focus:outline-none focus:border-gray-500
    placeholder-gray-400 text-white transition-colors
    hover:border-gray-600`;

  const buttonClasses = `btn-base bg-white text-black hover:bg-gray-100 px-6 py-3 text-base font-medium 
    whitespace-nowrap transition-colors rounded disabled:opacity-50 disabled:cursor-not-allowed
    ${variant === 'inline' ? 'sm:w-auto' : 'w-full'}`;

  return (
    <form onSubmit={handleSubmit} className={`${formClasses} ${className}`}>
      <div className="flex-1">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          disabled={isSubmitting}
          required
          aria-describedby={error ? "email-error" : undefined}
        />
        {error && (
          <p id="email-error" className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isSubmitting}
        className={buttonClasses}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Signing up...
          </>
        ) : (
          buttonText
        )}
      </button>
    </form>
  );
}