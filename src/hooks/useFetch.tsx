import { useState, useEffect, useCallback } from 'react';

interface FetchResponse {
  loading: boolean;
  error: string | null;
  data: any | Array<any> | null;
}

export const useFetch = (url: string): FetchResponse => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Unexpected error');
      const data = await response.json();
      setData(data);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url]);

  return { loading, error, data };
};
