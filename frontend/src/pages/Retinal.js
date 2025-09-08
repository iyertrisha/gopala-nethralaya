import React from 'react';
import { motion } from 'framer-motion';

const Retinal = () => {
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
              Retinal Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced treatment for retinal disorders, macular degeneration, and diabetic retinopathy using state-of-the-art technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Retinal Care</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Our retinal specialists provide comprehensive care for complex retinal conditions 
                including macular degeneration, diabetic retinopathy, and retinal detachments.
              </p>
              <p className="text-gray-600 mb-4">
                We use advanced diagnostic imaging and minimally invasive surgical techniques 
                to preserve and restore retinal function.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Retinal;