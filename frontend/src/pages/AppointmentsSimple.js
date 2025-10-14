import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, CalendarDaysIcon, ClockIcon, UserIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { appointmentsAPI } from '../services/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Appointments = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    patient_email: '',
    patient_phone: '',
    patient_age: '',
    patient_gender: '',
    appointment_date: '',
    appointment_time: '',
    reason: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['patient_name', 'patient_email', 'patient_phone', 'patient_age', 'patient_gender', 'appointment_date', 'appointment_time', 'reason'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Submit to backend API
      const response = await appointmentsAPI.create(formData);
      
      toast.success('Appointment booked successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        patient_name: '',
        patient_email: '',
        patient_phone: '',
        patient_age: '',
        patient_gender: '',
        appointment_date: '',
        appointment_time: '',
        reason: ''
      });
      
    } catch (error) {
      console.error('Appointment booking error:', error);
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else if (error.response?.data) {
        // Handle validation errors
        const errors = Object.values(error.response.data).flat();
        toast.error(errors.join(', '));
      } else {
        toast.error('Failed to book appointment. Please try again or call us directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Book an Appointment</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Schedule your consultation with our expert eye care specialists at Gopala Nethralaya. 
              Call us directly or request a consultation below.
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Book Appointment Now */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment Now</h2>
                <p className="text-gray-600">Call us directly to schedule your appointment immediately</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-2">Primary Contact</p>
                  <a 
                    href="tel:+916362727509" 
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                  >
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    +91 6362727509
                  </a>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-2">Alternative Contact</p>
                  <a 
                    href="tel:+918023488880" 
                    className="inline-flex items-center justify-center w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                  >
                    <PhoneIcon className="w-5 h-5 mr-2" />
                    +91 80 2348 8880
                  </a>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Why Call Directly?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Immediate appointment confirmation</li>
                  <li>• Real-time availability check</li>
                  <li>• Discuss urgent concerns</li>
                  <li>• Get instant answers to your questions</li>
                </ul>
              </div>
            </motion.div>

            {/* Request Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDaysIcon className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Consultation</h2>
                <p className="text-gray-600">Schedule a detailed consultation for comprehensive eye care</p>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-2">Consultation Booking</p>
                  <a 
                    href="tel:+916362727509" 
                    className="inline-flex items-center justify-center w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
                  >
                    <CalendarDaysIcon className="w-5 h-5 mr-2" />
                    +91 6362727509
                  </a>
                </div>
                
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500 mb-2">Specialist Consultation</p>
                  <a 
                    href="tel:+918023488880" 
                    className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                  >
                    <CalendarDaysIcon className="w-5 h-5 mr-2" />
                    +91 80 2348 8880
                  </a>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Consultation Benefits</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Comprehensive eye examination</li>
                  <li>• Personalized treatment plan</li>
                  <li>• Expert medical advice</li>
                  <li>• Advanced diagnostic tests</li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Online Appointment Booking Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8 mb-12"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Online Appointment Booking</h2>
              <p className="text-gray-600">Fill out the form below to book your appointment online</p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Patient Name */}
                <div>
                  <label htmlFor="patient_name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="patient_name"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Patient Email */}
                <div>
                  <label htmlFor="patient_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="patient_email"
                    name="patient_email"
                    value={formData.patient_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Patient Phone */}
                <div>
                  <label htmlFor="patient_phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="patient_phone"
                    name="patient_phone"
                    value={formData.patient_phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                </div>

                {/* Patient Age */}
                <div>
                  <label htmlFor="patient_age" className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    id="patient_age"
                    name="patient_age"
                    value={formData.patient_age}
                    onChange={handleInputChange}
                    required
                    min="1"
                    max="120"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Patient Gender */}
                <div>
                  <label htmlFor="patient_gender" className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    id="patient_gender"
                    name="patient_gender"
                    value={formData.patient_gender}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>

                {/* Appointment Date */}
                <div>
                  <label htmlFor="appointment_date" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="appointment_date"
                    name="appointment_date"
                    value={formData.appointment_date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Appointment Time */}
                <div>
                  <label htmlFor="appointment_time" className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time *
                  </label>
                  <select
                    id="appointment_time"
                    name="appointment_time"
                    value={formData.appointment_time}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Time</option>
                    <option value="09:00:00">9:00 AM</option>
                    <option value="09:30:00">9:30 AM</option>
                    <option value="10:00:00">10:00 AM</option>
                    <option value="10:30:00">10:30 AM</option>
                    <option value="11:00:00">11:00 AM</option>
                    <option value="11:30:00">11:30 AM</option>
                    <option value="12:00:00">12:00 PM</option>
                    <option value="14:00:00">2:00 PM</option>
                    <option value="14:30:00">2:30 PM</option>
                    <option value="15:00:00">3:00 PM</option>
                    <option value="15:30:00">3:30 PM</option>
                    <option value="16:00:00">4:00 PM</option>
                    <option value="16:30:00">4:30 PM</option>
                    <option value="17:00:00">5:00 PM</option>
                  </select>
                </div>

                {/* Reason for Visit */}
                <div className="md:col-span-2">
                  <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit *
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please describe your symptoms or reason for the appointment..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg transition-colors ${
                    isSubmitting
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Booking Appointment...
                    </>
                  ) : (
                    <>
                      <CalendarDaysIcon className="w-5 h-5 mr-2" />
                      Book Appointment
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 text-center text-sm text-gray-600">
                <p>* Required fields. We will contact you to confirm your appointment.</p>
              </div>
            </form>
          </motion.div>

          {/* Office Hours & Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ClockIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Hours</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
                  <p><strong>Saturday:</strong> 9:00 AM - 4:00 PM</p>
                  <p><strong>Sunday:</strong> Closed</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDaysIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Services</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Cataract Surgery</p>
                  <p>• LASIK & Refractive Surgery</p>
                  <p>• ICL Surgery</p>
                  <p>• Retinal & Corneal Care</p>
                </div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PhoneIcon className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Emergency Contact</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>For urgent eye care needs:</p>
                  <a href="tel:+916362727509" className="text-purple-600 font-semibold hover:text-purple-800">
                    +91 6362727509
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 text-center"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Visit Our Clinic</h3>
            <p className="text-gray-600 mb-4">
              Gopala Nethralaya, 227, 1st Main Rd, near 88 bus stop, Sharada Colony, KHB Colony, Basaveshwar Nagar, Bengaluru, Karnataka 560079
            </p>
            <a 
              href="https://maps.app.goo.gl/C47kMWJYPAAxE9c58" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              📍 View on Google Maps
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Appointments;