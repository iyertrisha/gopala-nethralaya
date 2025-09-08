import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

const AnnouncementBanner = ({ announcements = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  // Filter active announcements
  const activeAnnouncements = announcements.filter(announcement => 
    announcement.is_active && 
    new Date(announcement.start_date) <= new Date() &&
    (!announcement.end_date || new Date(announcement.end_date) >= new Date())
  );

  // Auto-rotate announcements
  useEffect(() => {
    if (activeAnnouncements.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          (prevIndex + 1) % activeAnnouncements.length
        );
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [activeAnnouncements.length]);

  if (!isVisible || activeAnnouncements.length === 0) {
    return null;
  }

  const currentAnnouncement = activeAnnouncements[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative overflow-hidden ${
          currentAnnouncement?.is_urgent
            ? 'bg-gradient-to-r from-red-500 to-red-600'
            : 'bg-gradient-to-r from-primary-500 to-primary-600'
        }`}
      >
        <div className="container-max section-padding">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3 flex-1">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <SpeakerWaveIcon className="h-5 w-5 text-white flex-shrink-0" />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-white"
                  >
                    <span className="font-medium text-sm sm:text-base">
                      {currentAnnouncement?.title}
                    </span>
                    {currentAnnouncement?.content && (
                      <span className="hidden sm:inline ml-2 text-sm opacity-90">
                        - {currentAnnouncement.content}
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Pagination dots */}
              {activeAnnouncements.length > 1 && (
                <div className="hidden sm:flex space-x-1">
                  {activeAnnouncements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentIndex
                          ? 'bg-white'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 text-white/80 hover:text-white transition-colors duration-200"
                aria-label="Dismiss announcement"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress bar for auto-rotation */}
        {activeAnnouncements.length > 1 && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-white/30"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 5, ease: 'linear' }}
            key={currentIndex}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;
