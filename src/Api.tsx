import { useState, useEffect } from "react";
import axios from 'axios';

export function useApi<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T>();
  const [error, setError] = useState();

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(url).catch((e) => {
      setError(e);
      setLoading(false);
      return e;
    });
    setData(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, retry: fetchData };
}