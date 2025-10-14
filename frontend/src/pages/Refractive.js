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
              LASIK Surgery
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Modern laser eye surgery solutions to correct vision problems such as myopia, hyperopia, and astigmatism with precision and safety.
            </p>
          </motion.div>

          {/* What is LASIK */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is LASIK and Who Could Benefit?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                LASIK (Laser-Assisted In Situ Keratomileusis) is a popular laser eye surgery that corrects vision problems by reshaping the cornea. This safe and effective procedure can help people reduce or eliminate their dependence on glasses and contact lenses.
              </p>
              <p className="text-gray-600 mb-4">
                LASIK can effectively treat three main vision conditions:
              </p>
            </div>
          </motion.div>

          {/* Vision Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            {/* Farsightedness */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Farsightedness (Hyperopia)</h3>
              <p className="text-gray-600 mb-4">
                The clinical name for farsightedness is hyperopia. People with this condition can see objects in the distance clearly, but other things can appear blurry at close distance. Farsightedness is due to the curvature of the cornea being too flat. Laser eye surgery can correct this by reshaping the cornea to have a steeper curve.
              </p>
            </div>

            {/* Nearsightedness */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nearsightedness (Myopia)</h3>
              <p className="text-gray-600 mb-4">
                Nearsightedness, known as myopia or short-sightedness, is where a person can see objects close to them clearly. However, distant objects can appear blurred. This is due to the curvature of the cornea being too steep. Healthcare professionals can correct this through laser eye surgery by reshaping the cornea.
              </p>
            </div>

            {/* Astigmatism */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Astigmatism</h3>
              <p className="text-gray-600 mb-4">
                People with astigmatism have a differently-shaped eye that characterizes this condition. The eye of someone without the condition is round, like a soccer ball, while with astigmatism, the eye may have more of a football-like shape. It is possible to correct this irregular curvature of the cornea with laser eye surgery in some cases.
              </p>
            </div>
          </motion.div>

          {/* Ask Your Eye Doctor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask Your Eye Doctor About LASIK</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Only a professional eye doctor like those at Gopala Nethralaya can recommend the right treatment for your vision problem. Depending on your eye condition, you may need LASIK, clear lens extraction, intrastromal corneal ring segments, or even new contact lenses.
              </p>
              <p className="text-gray-600 mb-6">
                Gopala Nethralaya can help you treat different vision problems using the latest technology. We'll talk with you about the procedure, risks, and potential outcomes of LASIK or other types of procedures right for you.
              </p>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready to Learn More About LASIK?</h3>
                <p className="text-blue-700 mb-4">Contact us today to schedule your consultation</p>
                <a href="tel:+918023488880" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  📞 Call us at +91 80 2348 8880
                </a>
              </div>
            </div>
          </motion.div>

          {/* Surgery Videos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">LASIK Surgery Procedures by Dr. Naveen Gopal</h2>
            <p className="text-gray-600 text-center mb-8">
              Watch our advanced LASIK surgery procedures showcasing precision, safety, and excellent patient outcomes.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Video Placeholder 1 */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">▶️</div>
                    <p className="font-semibold">LASIK Surgery Procedure</p>
                    <p className="text-sm opacity-90 mt-2">YouTube Video Placeholder</p>
                    <p className="text-xs opacity-75 mt-1">Dr. Naveen Gopal</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Complete LASIK Procedure</h3>
                  <p className="text-sm text-gray-600">Step-by-step LASIK surgery demonstration with patient consultation</p>
                </div>
              </div>

              {/* Video Placeholder 2 */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">▶️</div>
                    <p className="font-semibold">Advanced Laser Techniques</p>
                    <p className="text-sm opacity-90 mt-2">YouTube Video Placeholder</p>
                    <p className="text-xs opacity-75 mt-1">Dr. Naveen Gopal</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Precision Laser Technology</h3>
                  <p className="text-sm text-gray-600">Advanced laser techniques for optimal vision correction results</p>
                </div>
              </div>

              {/* Video Placeholder 3 */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">▶️</div>
                    <p className="font-semibold">Patient Success Stories</p>
                    <p className="text-sm opacity-90 mt-2">YouTube Video Placeholder</p>
                    <p className="text-xs opacity-75 mt-1">Dr. Naveen Gopal</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Real Patient Outcomes</h3>
                  <p className="text-sm text-gray-600">Testimonials and before/after results from LASIK patients</p>
                </div>
              </div>

              {/* Video Placeholder 4 */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-teal-500 to-green-500 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">▶️</div>
                    <p className="font-semibold">LASIK Recovery Process</p>
                    <p className="text-sm opacity-90 mt-2">YouTube Video Placeholder</p>
                    <p className="text-xs opacity-75 mt-1">Dr. Naveen Gopal</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Post-Surgery Care</h3>
                  <p className="text-sm text-gray-600">Recovery timeline and post-operative care instructions</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Why Choose LASIK at Gopala Nethralaya?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-green-700">
                    <div className="font-semibold">Experienced Surgeon</div>
                    <div>11,000+ surgeries</div>
                  </div>
                  <div className="text-green-700">
                    <div className="font-semibold">Advanced Technology</div>
                    <div>Latest laser equipment</div>
                  </div>
                  <div className="text-green-700">
                    <div className="font-semibold">Quick Recovery</div>
                    <div>Minimal downtime</div>
                  </div>
                  <div className="text-green-700">
                    <div className="font-semibold">Proven Results</div>
                    <div>High success rate</div>
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

export default Refractive;
