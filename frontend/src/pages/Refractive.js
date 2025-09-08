import React from 'react';
import { motion } from 'framer-motion';

const Refractive = () => {
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
              Refractive Surgery
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Modern laser and surgical solutions to correct vision problems such as myopia, hyperopia, and astigmatism with precision and safety.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Vision Correction Options</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                We offer a comprehensive range of refractive surgery options including LASIK, PRK, 
                and ICL (Implantable Collamer Lens) procedures.
              </p>
              <p className="text-gray-600 mb-4">
                Our experienced surgeons use the latest technology to provide safe, effective 
                vision correction tailored to your individual needs and lifestyle.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Refractive;
