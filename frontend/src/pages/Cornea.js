import React from 'react';
import { motion } from 'framer-motion';

const Cornea = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Cornea Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Expert care for corneal diseases, injuries, and conditions affecting the front surface of the eye with cutting-edge treatments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cornea Treatment</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Our cornea specialists provide comprehensive care for various corneal conditions including 
                keratoconus, corneal infections, and corneal dystrophies.
              </p>
              <p className="text-gray-600 mb-4">
                We offer advanced treatments including corneal transplants, cross-linking procedures, 
                and innovative therapies to preserve and restore corneal health.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cornea;
