import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.jpg';

const Footer = () => {
  // Temporary hardcoded hospital info for testing
  const hospitalInfo = {
    data: {
      name: 'Gopala Nethralaya',
      tagline: 'Caring for Your Health',
      phone_primary: '06362727509',
      address: 'https://maps.app.goo.gl/C47kMWJYPAAxE9c58',
      operating_hours: 'Mon - Fri: 8:00 AM - 8:00 PM',
      
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

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
   
    { name: 'Services', href: '/services' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' },
  ];

  

  return (
    <footer className="bg-medical-800 text-white">
      <div className="container-max section-padding">
        {/* Main Footer */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Hospital Info */}
            
        <div className="lg:col-span-1">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <div className="flex items-center space-x-3 mb-4">
          <img
        src={logo}
        alt={hospitalInfo?.data?.name || 'Gopala Nethralaya'}
        className="h-12 w-auto"
        />
      <div>
        <h3 className="text-xl font-bold text-gray-900">
          {hospitalInfo?.data?.name || 'Hospital Name'}
        </h3>
        {hospitalInfo?.data?.tagline && (
          <p className="text-sm text-gray-600">
            {hospitalInfo.data.tagline}
          </p>
        )}
      </div>
    </div>
    <p className="text-gray-700 leading-relaxed">
      {hospitalInfo?.data?.description || 
      'Providing excellent eye care services with compassion and expertise.'}
    </p>
  </div>
</div>


            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Our Services</h3>
              <ul className="space-y-3">
                {services.slice(0, 6).map((service) => (
                  <li key={service}>
                    <span className="text-gray-300">{service}</span>
                  </li>
                ))}
                <li>
                  <Link
                    to="/services"
                    className="text-primary-400 hover:text-primary-300 transition-colors duration-200 text-sm"
                  >
                    View All Services →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img src="/svg/location-pin-icon.svg" alt="Location" className="w-5 h-5 mt-0.5 filter brightness-0 invert opacity-70" />
                  <a
                    href={hospitalInfo?.data?.address}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white transition-colors duration-200 leading-relaxed"
                  >
                    View our location on map
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <img src="/svg/phone-footer-icon.svg" alt="Phone" className="w-5 h-5 filter brightness-0 invert opacity-70" />
                  <div>
                    <a
                      href={`tel:${hospitalInfo?.data?.phone_primary}`}
                      className="text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {hospitalInfo?.data?.phone_primary || '06362727509'}
                    </a>
                    {hospitalInfo?.data?.phone_secondary && (
                      <div>
                        <a
                          href={`tel:${hospitalInfo.data.phone_secondary}`}
                          className="text-gray-300 hover:text-white transition-colors duration-200"
                        >
                          {hospitalInfo.data.phone_secondary}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <img src="/svg/clock-footer-icon.svg" alt="Hours" className="w-5 h-5 mt-0.5 filter brightness-0 invert opacity-70" />
                  <div className="text-gray-300">
                    <div className="font-medium">Operating Hours:</div>
                    <div className="text-sm">
                      {hospitalInfo?.data?.operating_hours || 'Mon - Sat: 8:00 AM - 8:00 PM '}
                    </div>
                    <div className="text-sm mt-1">
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 {hospitalInfo?.data?.name || 'Hospital Name'}. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-300 hover:text-white transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;