import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getBySlug(slug);
      setArticle(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching article:', err);
      setArticle(null);
      setError('Failed to load article. Please start the backend server.');
    } finally {
      setLoading(false);
    }
  };

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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
          <button
            onClick={() => navigate('/news')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to News
          </button>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-lg mb-4">Article not found.</p>
          <button
            onClick={() => navigate('/news')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Back to News
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/news')}
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 flex items-center"
        >
          ← Back to News
        </button>

        {/* Article Card */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Badge */}
          {article.is_featured && (
            <div className="bg-blue-600 text-white text-sm font-bold px-4 py-2 text-center">
              FEATURED ARTICLE
            </div>
          )}

          {/* Featured Image */}
          {article.featured_image && (
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          )}

          {/* Content */}
          <div className="p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center text-gray-600 mb-6 pb-6 border-b">
              <span className="font-semibold text-blue-600 mr-4">
                By {article.author}
              </span>
              <span>•</span>
              <span className="ml-4">
                {formatDate(article.published_date)}
              </span>
            </div>

            {/* Excerpt */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <p className="text-lg text-gray-700 italic">
                {article.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-700 leading-relaxed whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </div>
        </article>

        {/* Share Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Facebook
            </button>
            <button className="flex-1 bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
              Twitter
            </button>
            <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
