import React, { useEffect, useState } from 'react'
import axios from 'axios';

axios.defaults.baseURL= 'http://localhost:8800';
function useAxois({url}) {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() =>{
    const fetchdata = async () =>{
        axios
            .get(url)
            .then(res => setResponse(res.data))
            .catch(err => setError(err))
            .finally(() =>setLoading(false))
    }
    fetchdata();
  },[url])



  return {response,loading,error}



}

export default useAxois