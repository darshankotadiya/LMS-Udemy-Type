import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { purchaseCourse } from '../../Api/paymentApi';

const PurchaseButton = ({ 
  course, 
  className = '',
  buttonText = 'Enroll Now',
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!course || disabled) return;

    setIsLoading(true);
    
    try {
      const response = await purchaseCourse(course._id || course.id);

      if (response.success) {
        window.location.reload();
      } else {
        throw new Error(response.message || 'Failed to enroll');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePurchase}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center px-6 py-3 
        border border-transparent text-base font-medium rounded-lg
        text-white bg-blue-600 hover:bg-blue-700
        disabled:bg-gray-300 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        transition-colors duration-200
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        <div className="flex items-center">
          <CreditCard className="h-4 w-4 mr-2" />
          {buttonText}
          {course?.price ? (
            <span className="ml-2">- ₹{course.price}</span>
          ) : (
            <span className="ml-2">- Free</span>
          )}
        </div>
      )}
    </button>
  );
};

export default PurchaseButton;
