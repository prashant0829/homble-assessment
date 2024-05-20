import { useState, useMemo, useCallback } from "react";
import { getRequest, postRequest } from "../axios"; // Adjust the path as necessary

// Custom hook
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [addProductLoading, setAddproductLoaing] = useState(false);
  const [error, setError] = useState(null);

  const get = useCallback(async (url, params = {}, responseType = "json") => {
    setLoading(true);
    setError(null);
    try {
      const response = await getRequest(url, params, responseType);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }, []);

  const post = useCallback(async (url, data, options) => {
    setAddproductLoaing(true);
    setError(null);
    try {
      const response = await postRequest(url, data, options);
      setAddproductLoaing(false);
      return response.data;
    } catch (err) {
      setAddproductLoaing(false);
      setError(err);
      throw err;
    }
  }, []);

  return useMemo(
    () => ({ get, post, loading, error, addProductLoading }),
    [get, post, loading, error, addProductLoading]
  );
};

export default useApi;
