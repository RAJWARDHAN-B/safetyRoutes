import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    otp: ''
  });

  // UI state
  const [errors, setErrors] = useState({});
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLightMode, setIsLightMode] = useState(true);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (showOtpField && !formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    if (!showOtpField) {
      // First submission - show OTP modal
      setShowOtpModal(true);
      setIsSubmitting(false);
    } else {
      // OTP verification submission
      try {
        // Here you would typically make an API call to verify OTP
        console.log('Form submitted with OTP:', formData);
        
        // Simulate API verification (replace with actual API call)
        if (formData.otp.trim()) {
          // Reset form after successful submission
          setFormData({
            fullName: '',
            email: '',
            password: '',
            otp: ''
          });
          setShowOtpField(false);
          
          // Navigate to LandingPage2
          navigate('/landingpage2');
        }
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-black p-6 rounded-lg shadow-lg mx-auto">
        <div
          className={`fixed top-5 left-7 text-3xl font-extrabold transition-all z-30
          ${ "text-[#EAEAEA] drop-shadow-[0_0_2px_rgba(255,255,255,0.09)]"}`}
        >
          WaySecure
        </div>

        <h1 className="text-2xl font-bold text-white text-center">Create an account</h1>
        <p className="text-gray-400 text-center mb-6">Join us by signing up</p>

        {/* Name Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name"
            value={formData.fullName}
            onChange={handleChange}
            className="p-2 w-93 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1">Email address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">{errors.email}</span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col mb-3">
          <label className="text-white mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
          />
          {errors.password && (
            <span className="text-red-500 text-sm mt-1">{errors.password}</span>
          )}
        </div>

        {/* OTP Field - Only shown after first submission */}
        {showOtpField && (
          <div className="flex flex-col mb-3">
            <label className="text-white mb-1">Enter OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP sent to your email"
              value={formData.otp}
              onChange={handleChange}
              className="p-2 rounded-md bg-black text-white border border-gray-600 outline-none"
            />
            {errors.otp && (
              <span className="text-red-500 text-sm mt-1">{errors.otp}</span>
            )}
          </div>
        )}

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Processing...' : 'Sign Up'}
        </button>

        {/* Already have an account? */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Already have an account? <a href="/login" className="text-blue-400">Log In</a>
        </p>
      </form>

      {/* Custom Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black border border-gray-600 p-6 rounded-lg w-96 relative">
            <button
              onClick={() => {
                setShowOtpModal(false);
                setShowOtpField(true);
              }}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              ✕
            </button>
            <div className="bg-green-600 text-white p-4 rounded">
              A code has been sent to your email. Kindly check your email.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;