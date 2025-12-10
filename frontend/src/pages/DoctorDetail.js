import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDoctor = async () => {
    try {
      setLoading(true);
      const response = await doctorsAPI.getById(id);
      setDoctor(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching doctor:', err);
      setDoctor(null);
      setError('Failed to load doctor information. Please start the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const getDayName = (dayNum) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[dayNum] || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
          <button
            onClick={() => navigate('/doctors')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-lg mb-4">Doctor not found.</p>
          <button
            onClick={() => navigate('/doctors')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/doctors')}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center"
        >
          ← Back to Doctors
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Photo and Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-6">
              {/* Photo */}
              {doctor.photo ? (
                <img
                  src={doctor.photo}
                  alt={doctor.full_name}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-8xl">👨‍⚕️</span>
                </div>
              )}

              {/* Quick Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {doctor.full_name}
                </h2>
                <p className="text-blue-600 font-semibold mb-4">
                  {doctor.specialization}
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-32">Department:</span>
                    <span className="text-gray-600">{doctor.department_name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-32">Experience:</span>
                    <span className="text-gray-600">{doctor.years_of_experience} years</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-32">License:</span>
                    <span className="text-gray-600">{doctor.medical_license}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-32">Email:</span>
                    <span className="text-gray-600 text-xs">{doctor.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700 w-32">Phone:</span>
                    <span className="text-gray-600">{doctor.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-semibold">Consultation Fee:</span>
                    <span className="text-2xl font-bold text-blue-600">₹{doctor.consultation_fee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Duration:</span>
                    <span className="text-gray-600">{doctor.consultation_duration} mins</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/appointments')}
                  className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book Appointment
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {doctor.bio}
              </p>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Qualifications</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {doctor.qualifications}
              </p>
            </div>

            {/* Schedule */}
            {doctor.schedules && doctor.schedules.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule</h3>
                <div className="space-y-3">
                  {doctor.schedules
                    .filter(schedule => schedule.is_active)
                    .sort((a, b) => a.day_of_week - b.day_of_week)
                    .map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <span className="font-semibold text-gray-700">
                          {schedule.day_name}
                        </span>
                        <span className="text-gray-600">
                          {schedule.start_time} - {schedule.end_time}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Availability Status */}
            <div className={`rounded-lg shadow-lg p-6 ${
              doctor.is_available ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <h3 className="text-xl font-bold mb-2">
                {doctor.is_available ? '✓ Currently Available' : '✗ Currently Unavailable'}
              </h3>
              <p className={doctor.is_available ? 'text-green-700' : 'text-red-700'}>
                {doctor.is_available 
                  ? 'This doctor is currently accepting new appointments.' 
                  : 'This doctor is not currently accepting new appointments.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;

