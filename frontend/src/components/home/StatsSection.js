import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  BuildingOffice2Icon, 
  HeartIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const StatsSection = ({ stats }) => {
  const defaultStats = [
    { label: 'Departments', value: stats?.total_departments || '15+', icon: BuildingOffice2Icon },
    { label: 'Medical Services', value: stats?.total_services || '100+', icon: HeartIcon },
    { label: 'Available 24/7', value: 'Emergency', icon: ClockIcon },
    { label: 'Years of Service', value: '10+', icon: UserGroupIcon },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-max section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Healthcare Excellence in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality healthcare is reflected in our achievements and the trust placed in us by thousands of patients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {defaultStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full opacity-20 scale-110 group-hover:scale-125 transition-transform duration-300"></div>
              </div>
              
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-primary-600 mb-2"
              >
                {stat.value}
              </motion.div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
              
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full mx-auto"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 inline-block">
            <p className="text-lg text-primary-800 font-medium">
              Trusted by thousands of patients for over a decade
            </p>
            <div className="flex items-center justify-center mt-4 space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-primary-700 font-medium">4.9/5 Patient Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
