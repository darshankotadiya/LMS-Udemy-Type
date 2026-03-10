import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('success'); 
  const [message, setMessage] = useState('Enrollment completed successfully! You now have access to the course.');
  
  const courseId = searchParams.get('course_id');

  useEffect(() => {
    // Direct enrollment redirects immediately, but just in case users land here
    const timer = setTimeout(() => {
      if (courseId) {
        navigate(`/course/${courseId}/learn`);
      } else {
        navigate('/dashboard'); 
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [courseId, navigate]);

  const handleReturnHome = () => {
    navigate('/');
  };

  const handleGoToCourse = () => {
    if (courseId) {
      navigate(`/course/${courseId}/learn`);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 pt-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 text-center">
            {status === 'loading' && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-6">
                  <Loader className="h-8 w-8 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Verifying Payment
                </h3>
                <p className="text-sm text-slate-400">
                  Please wait while we confirm your payment...
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Payment Successful!
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  {message}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Redirecting to course in a few seconds...
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleGoToCourse}
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Go to Course
                  </button>
                  <button
                    onClick={handleReturnHome}
                    className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                  >
                    Return Home
                  </button>
                </div>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                  <XCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  Payment Error
                </h3>
                <p className="text-sm text-slate-400 mb-6">
                  {message}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => navigate(`/course/${courseId}`)}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleReturnHome}
                    className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                  >
                    Return Home
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
