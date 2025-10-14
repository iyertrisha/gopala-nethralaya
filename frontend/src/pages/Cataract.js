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

          {/* Understanding Cataracts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Cataracts</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Cataracts develop slowly and may not impact your vision when they first form. However, as the cataract gets bigger, it distorts the light that hits your lens, leading to more noticeable symptoms.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Common Cataract Symptoms</h3>
              <p className="text-gray-600 mb-4">
                Following are the most common cataract symptoms, which are consistent with what we've seen in our practice:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Blurry vision</li>
                <li>Double vision</li>
                <li>Colors appearing faded or yellowish</li>
                <li>Increased light sensitivity</li>
                <li>Need for more lighting while reading</li>
                <li>Problems with night driving, such as glare from headlights</li>
              </ul>
            </div>
          </motion.div>

          {/* Do You Have Cataract */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Do You Have Cataract?</h2>
            <div className="flex justify-center mb-6">
              <img 
                src="/images/symptoms.jpg" 
                alt="Cataract Symptoms Visual Guide"
                className="max-w-full h-auto rounded-lg shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg p-12 text-center">
                <div className="text-4xl mb-4">👁️</div>
                <p className="text-gray-600">Cataract Symptoms Visual Guide</p>
                <p className="text-sm text-gray-500 mt-2">Image: symptoms.jpg</p>
              </div>
            </div>
          </motion.div>

          {/* Prevention Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Prevention & Healthy Vision Tips</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                You can't really control whether you get cataracts. However, here are some preventive measures to help you maintain healthy vision and possibly slow the progression of cataracts:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-3">
                <li><strong>Stop smoking</strong> - Smoking increases your risk of developing cataracts</li>
                <li><strong>Eat foods with vision-boosting vitamins and nutrients</strong> including kale, broccoli, walnuts, salmon and citrus fruit</li>
                <li><strong>Keep diabetes and weight gain under control</strong> as these conditions may hasten the development of cataracts</li>
                <li><strong>Wear sunglasses that block 100% of UV rays</strong> to protect your eyes from harmful sun exposure</li>
                <li><strong>Visit Gopala Nethralaya for a consultation</strong> - Regular eye exams can detect cataracts early</li>
              </ul>
            </div>
          </motion.div>

          {/* Surgery Videos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Advanced Cataract Surgery by Dr. Naveen Gopal</h2>
            <p className="text-gray-600 text-center mb-8">
              Watch our advanced, non-invasive cataract surgery procedures featuring no bandage, quick recovery time, and no injection techniques.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Video Placeholder 1 */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">▶️</div>
                    <p className="font-semibold">Non-Invasive Cataract Surgery</p>
                    <p className="text-sm opacity-90 mt-2">YouTube Video Placeholder</p>
                    <p className="text-xs opacity-75 mt-1">Dr. Naveen Gopal</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Micro-Incision Technique</h3>
                  <p className="text-sm text-gray-600">Advanced surgical technique with minimal invasion and rapid healing</p>
                </div>
              </div>

              {/* Video Placeholder 2 */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">▶️</div>
                    <p className="font-semibold">No Bandage Surgery</p>
                    <p className="text-sm opacity-90 mt-2">YouTube Video Placeholder</p>
                    <p className="text-xs opacity-75 mt-1">Dr. Naveen Gopal</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Quick Recovery Process</h3>
                  <p className="text-sm text-gray-600">Immediate vision improvement with no post-surgery bandaging required</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Surgery Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-blue-700">
                    <div className="font-semibold">Non-Invasive</div>
                    <div>Minimal tissue damage</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-semibold">No Bandage</div>
                    <div>Immediate comfort</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-semibold">Quick Recovery</div>
                    <div>Resume activities soon</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-semibold">No Injection</div>
                    <div>Painless procedure</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cataract;
