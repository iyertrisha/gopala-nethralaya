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

          {/* Corneal Eye Diseases Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Corneal Eye Diseases</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Corneal eye disease is one of the leading cause for avoidable blindness and it effects more than 10 Million people worldwide after Cataract, Glaucoma and Age related macular degeneration.
              </p>
              <p className="text-gray-600 mb-6">
                For a quality vision a healthy, clear cornea is most important, any injury, infection, or damage on the cornea can leave the cornea swollen, scarred or misshapen and with a distorted vision.
              </p>
            </div>
          </motion.div>

          {/* Causes of Corneal Disease */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Causes of Corneal Disease</h2>
            <div className="prose prose-lg max-w-none">
              <ul className="list-disc list-inside text-gray-600 space-y-3">
                <li><strong>Infection:</strong> Bacterial, fungal and viral infections are common causes of corneal damage.</li>
                <li><strong>Keratoconus:</strong> The cause of Keratoconus in most patients is unknown.</li>
                <li><strong>Age:</strong> Aging can affect the quality and health of the cornea.</li>
                <li><strong>Cataract & Intraocular lens implant surgery:</strong> Bullous Keratopathy although seen in very small percentage of patients after these surgical procedures.</li>
                <li><strong>Heredity:</strong> Genetic factors can contribute to corneal diseases.</li>
                <li><strong>Contact lenses:</strong> Improper use or care can lead to corneal complications.</li>
                <li><strong>Eye trauma:</strong> Physical injury to the eye can damage the cornea.</li>
                <li><strong>Certain systemic diseases:</strong> Various health conditions can affect corneal health.</li>
              </ul>
            </div>
          </motion.div>

          {/* Corneal Blindness */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Corneal Blindness</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                There are almost 1.5 to 2 million new reported cases every year due to Ocular trauma and ulcerations. Traditional and non-scientific diagnosis and medicines have also been a major risk factor in corneal blindness in developing countries.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Leading Causes of Corneal Blindness</h3>
              
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Infections</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>The after-effects of bacterial, fungal, or viral infections</li>
                  <li>Bacterial, fungal, or viral Keratitis, as well as parasitic diseases</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Trauma</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Eye trauma</li>
                  <li>Abrasions or exposure to toxic chemicals</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Congenital and Genetic Factors</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Congenital disease</li>
                  <li>Dystrophies and degenerative corneal disorders</li>
                  <li>Fuchs' dystrophy, map-dot-fingerprint dystrophy, or lattice corneal dystrophy</li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Other Causes</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Traditional medicine or home remedies, which often harm the eye rather than relieve pain or improve eyesight</li>
                  <li>Autoimmune disorders, Wegener's disease, Rheumatoid Arthritis, or Lupus</li>
                  <li>Nutritional deficiencies</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Treatment Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Cornea Treatment Services</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Our cornea specialists provide comprehensive care for various corneal conditions including keratoconus, corneal infections, and corneal dystrophies.
              </p>
              <p className="text-gray-600 mb-4">
                We offer advanced treatments including corneal transplants, cross-linking procedures, and innovative therapies to preserve and restore corneal health.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cornea;
