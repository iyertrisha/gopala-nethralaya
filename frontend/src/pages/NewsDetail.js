import React from 'react';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">News Article</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {slug ? `Article: ${slug.replace(/-/g, ' ')}` : 'News Article'}
          </h2>
          
          <div className="text-sm text-gray-500 mb-6">Published: December 15, 2024</div>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              This is a detailed news article about our hospital's latest developments, 
              achievements, and community initiatives. The content would be dynamically 
              loaded from our database based on the article slug.
            </p>
            
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <p className="text-gray-600">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
