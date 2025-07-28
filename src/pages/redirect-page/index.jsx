import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import linkService from '../../utils/linkService';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinkAndRedirect = async () => {
      if (!shortCode) {
        setError('Short code not provided.');
        setLoading(false);
        return;
      }

      try {
        const { success, data, error } = await linkService.getLinkByShortCode(shortCode);

        if (success && data) {
          window.location.replace(data.original_url);
        } else {
          setError(error || 'Link not found or invalid.');
        }
      } catch (err) {
        console.error('Error fetching link:', err);
        setError('Failed to redirect. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLinkAndRedirect();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Redirecting...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-red-700">
        <p className="text-lg font-semibold">Error:</p>
        <p className="text-md">{error}</p>
        <p className="text-sm mt-4">If you believe this is an error, please contact support.</p>
      </div>
    );
  }

  return null; // Should not render anything if redirection is successful
};

export default RedirectPage;
