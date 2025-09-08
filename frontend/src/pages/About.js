import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About Gopala Nethralaya</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            To provide comprehensive, compassionate, and cutting-edge eye care services to our patients, 
            utilizing advanced technology and evidence-based treatments. We are committed to preserving 
            and improving vision while delivering personalized care that exceeds expectations.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-6">
            To be the premier super specialty eye hospital, recognized for clinical excellence, 
            innovative treatments, and compassionate patient care. We strive to be the trusted 
            choice for comprehensive ophthalmologic services in the region.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Patient-centered care with personalized attention</li>
            <li>Clinical excellence and surgical precision</li>
            <li>Advanced technology and innovative treatments</li>
            <li>Compassionate and ethical medical practice</li>
            <li>Continuous learning and professional development</li>
            <li>Community eye health awareness and education</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Founder</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                <img 
                  src="/photos/dr-naveen.png" 
                  alt="Dr. Naveen Gopal"
                  className="w-full h-full object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex-col items-center justify-center text-white">
                  <div className="text-4xl font-bold mb-2">DN</div>
                  <div className="text-sm">Dr. Naveen Gopal</div>
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Dr. Naveen Gopal</h3>
              <p className="text-gray-600 mb-4">
                Dr. Naveen Gopal, the visionary founder of Gopala Nethralaya, established this 
                super specialty eye hospital with a commitment to bringing world-class ophthalmic 
                care to the community. With extensive experience in advanced eye care and a passion 
                for patient welfare, Dr. Gopal has built Gopala Nethralaya into a center of 
                excellence for comprehensive eye treatments.
              </p>
              <p className="text-gray-600">
                Under his leadership, the hospital has become synonymous with quality eye care, 
                combining state-of-the-art technology with compassionate patient service to deliver 
                optimal outcomes for every patient.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Surgical Services</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Cataract Surgery (Phacoemulsification)</li>
                <li>LASIK and Refractive Surgery</li>
                <li>Retinal Surgery</li>
                <li>Corneal Transplant</li>
                <li>Glaucoma Surgery</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">Medical Services</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Comprehensive Eye Consultation</li>
                <li>Glaucoma Management</li>
                <li>Contact Lens Fitting</li>
                <li>Low Vision Services</li>
                <li>Eye Disease Treatment</li>
                <li>Eye Injury Treatment</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h2>
          <p className="text-gray-600 mb-4">
            At Gopala Nethralaya, we understand that vision is precious. Our super specialty 
            eye hospital is equipped with the latest diagnostic and surgical equipment, 
            ensuring that our patients receive the most advanced care available.
          </p>
          <p className="text-gray-600 mb-4">
            Our team of experienced ophthalmologists, optometrists, and support staff work 
            collaboratively to provide comprehensive eye care services, from routine eye 
            examinations to complex surgical procedures.
          </p>
          <p className="text-gray-600">
            We believe in building lasting relationships with our patients, providing not 
            just medical treatment but also education and support throughout their eye 
            care journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;