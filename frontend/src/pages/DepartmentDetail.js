import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { departmentsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);
      const response = await departmentsAPI.getById(id);
      setDepartment(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching department:', err);
      setDepartment(null);
      setError('Failed to load department information. Please start the backend server.');
    } finally {
      setLoading(false);
    }
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
          <button
            onClick={() => navigate('/services')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-lg mb-4">Department not found.</p>
          <button
            onClick={() => navigate('/services')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/services')}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center"
        >
          ← Back to Services
        </button>

        {/* Department Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {department.image && (
            <img
              src={department.image}
              alt={department.name}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{department.name}</h1>
            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
              {department.description}
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {department.services_count || 0}
            </div>
            <div className="text-gray-700 font-semibold">Services Offered</div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {department.doctors_count || 0}
            </div>
            <div className="text-gray-700 font-semibold">Medical Professionals</div>
          </div>
        </div>

        {/* Services Section */}
        {department.services && department.services.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {department.services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-5xl">🏥</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {service.description}
                    </p>
                    {service.price_range && (
                      <p className="text-blue-600 font-semibold">
                        Price: {service.price_range}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Doctors Section */}
        {department.doctors && department.doctors.length > 0 && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Doctors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {department.doctors.map((doctor) => (
                <Link
                  key={doctor.id}
                  to={`/doctors/${doctor.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {doctor.photo ? (
                    <img
                      src={doctor.photo}
                      alt={doctor.full_name}
                      className="w-full h-56 object-cover"
                    />
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-6xl">👨‍⚕️</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {doctor.full_name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-3">
                      {doctor.specialization}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>Exp: {doctor.years_of_experience} years</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        doctor.is_available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {doctor.is_available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Need to Schedule an Appointment?</h3>
          <p className="text-lg mb-6">
            Book an appointment with our specialized doctors today
          </p>
          <button
            onClick={() => navigate('/appointments')}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;

