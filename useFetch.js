import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch data from a given URL using the native fetch API.
 * 
 * @param {string} url - The endpoint URL to fetch data from.
 * @returns {{ data: any, loading: boolean, error: string | null }}
 */
function useFetch(url) {
  // 1. Initialize state variables with default values
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no URL is provided, do nothing
    if (!url) {
      setLoading(false);
      return;
    }

    // 2. Create an AbortController instance for request cancellation
    const controller = new AbortController();
    const { signal } = controller;

    // Reset loading and error states when the URL changes
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal });

        // Handle HTTP error statuses (like 404 or 500)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} (${response.statusText})`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        // Ignore AbortError when the component unmounts or URL changes
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unexpected error occurred.');
        }
      } finally {
        // Only update loading state if the request was not aborted
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // 3. Cleanup function: abort ongoing fetch if component unmounts or url changes
    return () => {
      controller.abort();
    };
  }, [url]);

  // 4. Return an object with exactly data, loading, and error
  return { data, loading, error };
}

export default useFetch;
