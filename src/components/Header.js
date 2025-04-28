import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../redux/slices/cartSlice';

const Header = () => {
  const cartQuantity = useSelector(selectCartTotalQuantity);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 bg-secondary ${isScrolled ? 'shadow-md' : ''} transition-all duration-300`}>
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-white no-underline">
            <span className="material-icons-round text-primary text-3xl">shopping_bag</span>
            <h1 className="text-2xl font-bold m-0">ShoppyGlobe</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  to="/" 
                  className={`text-white no-underline font-medium hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className={`text-white no-underline font-medium hover:text-primary transition-colors ${location.pathname === '/cart' ? 'text-primary' : ''}`}
                >
                  Cart
                </Link>
              </li>
            </ul>
          </nav>

          {/* Cart & Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-white no-underline relative">
              <span className="material-icons-round text-2xl">shopping_cart</span>
              {cartQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-secondary rounded-full w-5 h-5 flex justify-center items-center text-xs font-bold animate-pulse">
                  {cartQuantity}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span className="material-icons-round">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-700 animate-fade-in">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className={`block text-white no-underline font-medium hover:text-primary transition-colors ${location.pathname === '/' ? 'text-primary' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/cart" 
                  className={`block text-white no-underline font-medium hover:text-primary transition-colors ${location.pathname === '/cart' ? 'text-primary' : ''}`}
                >
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 