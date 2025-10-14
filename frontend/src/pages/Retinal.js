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

          {/* Retina Treatment Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Advanced Retina Treatment</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Retina treatment addresses various conditions affecting the retina, the light-sensitive layer at the back of the eye. This treatment employs advanced techniques, including laser therapy and vitrectomy, to restore vision and prevent further damage.
              </p>
              <p className="text-gray-600 mb-6">
                The success rate for retina treatments is high, often exceeding 90% for conditions like retinal detachment and diabetic retinopathy. Depending on the procedure, the average time for retina treatment can range from 30 minutes to a few hours, ensuring quick and effective care for patients at Gopala Nethralaya.
              </p>
            </div>
          </motion.div>

          {/* Symptoms of Retina Problems */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Symptoms of Retina Problems</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Retina conditions can cause significant vision impairment if left untreated. Some common symptoms include:
              </p>
              
              <ul className="list-disc list-inside text-gray-600 space-y-3 mb-6">
                <li><strong>Blurred or distorted vision</strong></li>
                <li><strong>Sudden loss of vision</strong></li>
                <li><strong>Flashes of light</strong></li>
                <li><strong>Dark spots or floaters</strong></li>
                <li><strong>Difficulty seeing at night</strong></li>
                <li><strong>Shadows or curtain-like vision loss</strong></li>
              </ul>
              
              <div className="bg-red-50 border-l-4 border-red-400 p-6 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      <strong>Important:</strong> If you experience any of these symptoms, seek immediate consultation with a retina specialist.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Treatment Techniques */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Advanced Treatment Techniques</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                The treatment involves advanced techniques like laser therapy or surgical procedures performed by the best retina doctors. These methods work by repairing or rejuvenating the retina, improving visual clarity, and preventing further deterioration.
              </p>
              <p className="text-gray-600 mb-6">
                At Gopala Nethralaya, we utilize state-of-the-art equipment to ensure effective retina treatment, allowing patients to regain and maintain their vision efficiently.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Treatment Success</h3>
                  <div className="text-blue-700">
                    <div className="text-3xl font-bold mb-2">90%+</div>
                    <div className="text-sm">Success rate for retinal detachment and diabetic retinopathy</div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Treatment Duration</h3>
                  <div className="text-green-700">
                    <div className="text-3xl font-bold mb-2">30min - 3hrs</div>
                    <div className="text-sm">Quick and effective procedures</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Retinal Care</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Our retinal specialists provide comprehensive care for complex retinal conditions including macular degeneration, diabetic retinopathy, and retinal detachments.
              </p>
              <p className="text-gray-600 mb-4">
                We use advanced diagnostic imaging and minimally invasive surgical techniques to preserve and restore retinal function.
              </p>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Treatment Options Include:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Laser Therapy:</strong> Precise laser treatments for various retinal conditions</li>
                  <li><strong>Vitrectomy:</strong> Advanced surgical procedures for complex cases</li>
                  <li><strong>Anti-VEGF Injections:</strong> For macular degeneration and diabetic retinopathy</li>
                  <li><strong>Retinal Detachment Repair:</strong> Emergency and elective surgical interventions</li>
                  <li><strong>Diabetic Retinopathy Management:</strong> Comprehensive care for diabetes-related eye complications</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Retinal;