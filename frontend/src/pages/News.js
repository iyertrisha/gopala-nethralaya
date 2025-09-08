import React from 'react';

const News = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Latest News</h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">New Cardiology Wing Opening</h2>
            <p className="text-gray-600 mb-4">
              We are excited to announce the opening of our new state-of-the-art cardiology wing, 
              featuring advanced diagnostic equipment and expanded patient care facilities.
            </p>
            <div className="text-sm text-gray-500">Published: December 15, 2024</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">Community Health Fair</h2>
            <p className="text-gray-600 mb-4">
              Join us for our annual community health fair featuring free health screenings, 
              educational seminars, and wellness activities for the whole family.
            </p>
            <div className="text-sm text-gray-500">Published: December 10, 2024</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">New Pediatric Specialist Joins Team</h2>
            <p className="text-gray-600 mb-4">
              We welcome Dr. Sarah Johnson, a renowned pediatric specialist, to our team. 
              Dr. Johnson brings over 15 years of experience in pediatric care.
            </p>
            <div className="text-sm text-gray-500">Published: December 5, 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
