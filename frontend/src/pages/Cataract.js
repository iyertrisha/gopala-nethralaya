import React from 'react';
import { motion } from 'framer-motion';

const Cataract = () => {
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
              Cataract Surgery
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced cataract surgery and treatment using the latest minimally invasive surgical techniques and premium lens technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Cataract Surgery</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Cataract surgery is one of the most common and successful procedures performed worldwide. 
                Our advanced techniques ensure minimal discomfort and rapid recovery.
              </p>
              <p className="text-gray-600 mb-4">
                We use state-of-the-art equipment and premium intraocular lenses to restore clear vision 
                and improve your quality of life.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cataract;
