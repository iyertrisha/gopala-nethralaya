import React from 'react';
import { motion } from 'framer-motion';

const ICL = () => {
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
              Implantable Contact Lens (ICL)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Advanced vision correction solution for high refractive errors and patients unsuitable for laser surgery.
            </p>
          </motion.div>

          {/* ICL Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What is ICL Surgery?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                ICL, also known as Implantable Contact Lens, is used to correct vision for eyes with high refractive errors (near or farsightedness, with or without astigmatism), and especially if the cornea is unsuitable for laser refractive surgery. At Gopala Nethralaya, the Visian Implantable Contact Lens (Visian ICL) is available.
              </p>
            </div>
          </motion.div>

          {/* High Myopia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">High Myopia (Nearsightedness) of -10 or Higher</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                If you have a very high negative power (e.g., -10, -12, -15, or even -20), LASIK or PRK may not be suitable due to thin cornea or high refractive error.
              </p>
              <p className="text-gray-600 mb-6">
                <strong>ICL Surgery can correct up to -20 Diopters without having to remove any corneal tissue.</strong>
              </p>
            </div>
          </motion.div>

          {/* High Hyperopia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">High Hyperopia (Farsightedness) of +10 or Higher</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                Patients with a positive power (+10 to +20) who are not suitable for LASIK or other refractive surgeries can be treated with ICL Surgery.
              </p>
              <p className="text-gray-600 mb-6">
                <strong>The implantable lens provides natural and clear vision without altering the cornea.</strong>
              </p>
            </div>
          </motion.div>

          {/* Thin Corneas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Thin Corneas (Not Suitable for LASIK)</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-4">
                LASIK and PRK procedures require a minimum corneal thickness to shape the cornea.
              </p>
              <p className="text-gray-600 mb-4">
                In case you have thin corneas, LASIK becomes risky.
              </p>
              <p className="text-gray-600 mb-6">
                <strong>ICL Surgery does not entail any corneal reshaping, hence it is safe for thin corneas.</strong>
              </p>
            </div>
          </motion.div>

          {/* LASIK vs ICL Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">LASIK vs ICL Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Aspect</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-blue-600">LASIK</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-green-600">ICL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Corneal Tissue</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Removes corneal tissue permanently</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">No corneal tissue removal - preserves natural cornea</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Refractive Error Range</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Limited to moderate refractive errors</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Can correct up to -20 and +20 diopters</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Reversibility</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Permanent - cannot be reversed</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Reversible - lens can be removed if needed</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium text-gray-700">Corneal Thickness</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Requires adequate corneal thickness</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Suitable for thin corneas</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Why Choose ICL at Gopala Nethralaya?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="text-blue-700">
                    <div className="font-semibold">Visian ICL Available</div>
                    <div>Latest technology</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-semibold">Expert Surgeons</div>
                    <div>Experienced specialists</div>
                  </div>
                  <div className="text-blue-700">
                    <div className="font-semibold">Safe & Reversible</div>
                    <div>Preserves natural cornea</div>
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

export default ICL;
