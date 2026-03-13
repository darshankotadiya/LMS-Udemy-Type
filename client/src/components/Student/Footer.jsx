import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiSend } from 'react-icons/fi';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { subscribeNewsletter } from '../../Api/userApi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      const response = await subscribeNewsletter(email);
      if (response.success) {
        toast.success('Successfully joined the community!');
        setEmail('');
      } else {
        throw new Error(response.message || 'Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error(error.message || 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#001f3f] to-black text-white pt-4 pb-3 relative overflow-hidden text-sm flex-shrink-0 border-t border-[#0a1128]">
      {/* Starry background */}
      <div className="absolute inset-0 starry-bg opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Two column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
          {/* Logo and slogan */}
          <div className="flex flex-col items-center sm:items-start">
            <div className="font-bold text-lg mb-1">Course<span className="text-[#0074D9]">Connect</span></div>
            <p className="text-[#94a3b8] text-xs mb-2">Empowering learners worldwide with quality education</p>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center sm:items-end">
            <h4 className="font-medium text-sm mb-1">Join our community</h4>
            <p className="text-[#94a3b8] text-xs mb-2 text-center sm:text-right">Get updates on new courses and exclusive offers</p>
            <form onSubmit={handleSubscribe} className="flex w-full max-w-xs">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-[#001f3f] border-y border-l border-[#334155] text-white px-3 py-1.5 text-xs rounded-l-md w-full focus:outline-none focus:border-[#0074D9] transition-colors disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center px-3 py-1.5 bg-[#0074D9] hover:bg-[#005bb5] transition rounded-r-md disabled:bg-gray-600"
              >
                {isLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <FiSend size={14} />
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-[#94a3b8] text-xs pt-1">
          <p>© {new Date().getFullYear()} CourseConnect Education Platform</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;