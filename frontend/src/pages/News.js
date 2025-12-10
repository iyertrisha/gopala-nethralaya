import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getAll();
      // Handle paginated response (results array) or direct array
      const newsData = response.data?.results || response.data || [];
      setNews(newsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching news:', err);
      setNews([]);
      setError('Failed to load news articles. Please start the backend server.');
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">News & Updates</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest developments, events, and achievements at our hospital
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* News Grid */}
        {filteredNews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchTerm ? 'No news articles found matching your search.' : 'No news articles available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.slug}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Featured Badge */}
                {article.is_featured && (
                  <div className="bg-blue-600 text-white text-xs font-bold px-3 py-1 absolute mt-4 ml-4 rounded">
                    FEATURED
                  </div>
                )}

                {/* Image */}
                {article.featured_image ? (
                  <img
                    src={article.featured_image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-6xl">📰</span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span className="font-medium">{article.author}</span>
                    <span>{formatDate(article.published_date)}</span>
                  </div>

                  <div className="mt-4">
                    <span className="text-blue-600 font-semibold hover:text-blue-700">
                      Read More →
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

export default News;
