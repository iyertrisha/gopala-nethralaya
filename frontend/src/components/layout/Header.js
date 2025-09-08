import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from './logo.jpg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Temporary hardcoded hospital info for testing
  const hospitalInfo = {
    data: {
      name: 'Gopala Nethralaya',
      tagline: 'Caring for Your Health',
      phone_primary: '+91 6362727509',
      address: 'https://maps.app.goo.gl/C47kMWJYPAAxE9c58'
    }
  };

  const services = [
    'Consultation',
    'Cataract Surgery',
    'LASIK',
    'Glaucoma Management',
    'Contact Lens Fitting',
    'Retinal Surgery',
    'Corneal Transplant',
    'Low Vision Services',
    'Eye Disease Treatment',
    'Eye Injury Treatment',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
   
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2">
        <div className="container-max section-padding">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center space-x-1">
                <img src="/svg/phone-icon.svg" alt="Phone" className="w-4 h-4" />
                <span>{hospitalInfo?.data?.phone_primary || '06362727509'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <img src="/svg/location-icon.svg" alt="Location" className="w-4 h-4" />
              <a 
                href={hospitalInfo?.data?.address}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                View Location
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg' 
            : 'bg-white shadow-sm'
        }`}
      >
        <div className="container-max section-padding">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt={hospitalInfo?.data?.name || 'Gopala Nethralaya'}
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {hospitalInfo?.data?.name || 'Hospital Name'}
                </h1>
                {hospitalInfo?.data?.tagline && (
                  <p className="text-sm text-gray-600">{hospitalInfo.data.tagline}</p>
                )}
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 relative ${
                    isActivePath(item.href)
                      ? 'text-primary-600'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                  {isActivePath(item.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/appointments"
                className="btn-primary"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <span className="text-2xl">✕</span>
              ) : (
                <span className="text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
              <div className="section-padding py-4">
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-base font-medium transition-colors duration-200 ${
                        isActivePath(item.href)
                          ? 'text-primary-600'
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to="/appointments"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn-primary mt-4 text-center"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;