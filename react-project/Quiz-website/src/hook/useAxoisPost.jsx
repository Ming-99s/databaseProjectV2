import { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8800';

function useAxiosPost() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const postData = async (url, data) => {
    setLoading(true);
    setError("");  // Reset error before making the request
    try {
      const res = await axios.post(url, data);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
}

export default useAxiosPost;
