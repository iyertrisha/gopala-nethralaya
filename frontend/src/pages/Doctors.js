import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorsAPI, departmentsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [doctorsRes, departmentsRes] = await Promise.all([
        doctorsAPI.getAll().catch(() => ({ data: { results: [] } })),
        departmentsAPI.getAll().catch(() => ({ data: { results: [] } }))
      ]);
      // Handle paginated response (results array) or direct array
      const doctorsData = doctorsRes.data?.results || doctorsRes.data || [];
      const departmentsData = departmentsRes.data?.results || departmentsRes.data || [];
      setDoctors(doctorsData);
      setDepartments(departmentsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setDoctors([]);
      setDepartments([]);
      setError('Failed to load doctors. Please start the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    if (!doctor) return false;
    
    const matchesSearch = 
      (doctor.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor.specialization || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || doctor.department === parseInt(selectedDepartment);
    const matchesSpecialization = !selectedSpecialization || (doctor.specialization || '').toLowerCase().includes(selectedSpecialization.toLowerCase());

    return matchesSearch && matchesDepartment && matchesSpecialization;
  });

  // Get unique specializations
  const specializations = [...new Set(doctors.filter(d => d && d.specialization).map(d => d.specialization))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Doctors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our team of highly qualified and experienced medical professionals
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* Department Filter */}
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>

            {/* Specialization Filter */}
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No doctors found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                to={`/doctors/${doctor.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Photo */}
                {doctor.photo ? (
                  <img
                    src={doctor.photo}
                    alt={doctor.full_name}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-6xl">👨‍⚕️</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {doctor.full_name}
                  </h3>
                  
                  <p className="text-blue-600 font-semibold mb-2">
                    {doctor.specialization}
                  </p>

                  <p className="text-gray-600 mb-3">
                    {doctor.department_name}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>Experience: {doctor.years_of_experience} years</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{doctor.consultation_fee}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      doctor.is_available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.is_available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-blue-600 font-semibold hover:text-blue-700">
                      View Profile →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;

