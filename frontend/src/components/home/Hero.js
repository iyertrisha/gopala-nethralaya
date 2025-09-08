import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CalendarDaysIcon, 
  PhoneIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import HeartIcon from '../assets/heart-icon.svg';


gsap.registerPlugin(ScrollTrigger);

const Hero = ({ hospitalInfo }) => {
  const heartRef = useRef(null);

  useEffect(() => {
    if (heartRef.current) {
      // Scroll-based floating
      gsap.to(heartRef.current, {
        y: 400,
        x: 200,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: heartRef.current,
          start: 'top top',
          end: 'bottom+=1000 top',
          scrub: true,
        },
      });

      // Pulse animation (independent loop)
      gsap.to(heartRef.current, {
        scale: 1.3,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    }
  }, []);

  return (
    <section className="relative hero-gradient min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      {/* ❤️ Animated Heart */}
      <div
        ref={heartRef}
        className="absolute top-10 left-10 w-16 h-16 z-0 opacity-70"
      >
        <div className="w-full h-full text-red-500 text-4xl">❤️</div>
      </div>
      
      {/* Content */}
      <div className="container-max section-padding relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              Your Health,{' '}
              <span className="text-gradient">Our Priority</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              {hospitalInfo?.description || 
                'Experience world-class healthcare with our state-of-the-art facilities and compassionate care. Your journey to better health starts here.'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link
                to="/appointments"
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <CalendarDaysIcon className="mr-2 h-5 w-5" />
                Book Appointment
              </Link>
              
              <a
                href={`tel:${hospitalInfo?.emergency_phone || '911'}`}
                className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg border border-primary-200"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                Emergency: {hospitalInfo?.emergency_phone || '911'}
              </a>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">24/7 Care</h3>
                  <p className="text-sm text-gray-600">Emergency services</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Expert Care</h3>
                  <p className="text-sm text-gray-600">Qualified specialists</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Modern Tech</h3>
                  <p className="text-sm text-gray-600">Advanced equipment</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {hospitalInfo?.hero_image ? (
                <img
                  src={hospitalInfo.hero_image}
                  alt={hospitalInfo.name}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl shadow-2xl flex items-center justify-center">
                  <svg className="w-32 h-32 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              )}
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 hidden lg:block"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">24/7</div>
                  <div className="text-sm text-gray-600">Emergency Care</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-6 hidden lg:block"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600">10+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
