import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [idItem, setIdItem] = useState(null);

  const httpConfig = (data, method) => {
    if (method === 'POST') {
      setConfig({
        method,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      setMethod(method);
    } else if (method === 'DELETE') {
      setConfig({
        method,
        headers: {
          'Content-type': 'application/json',
        },
      });
      setMethod(method);
      setIdItem(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const dataJson = await res.json();
        setData(dataJson);
      } catch (error) {
        setError('Erro ao carregar os dados');
      }
      setLoading(false);
    };
    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    let dataJson;
    const httpRequest = async () => {
      if (method === 'POST') {
        let fetchOptions = [url, config];
        const res = await fetch(...fetchOptions);
        dataJson = await res.json();
      } else if (method === 'DELETE') {
        const urlRemove = `${url}/${idItem}`;
        const res = await fetch(urlRemove, config);
        dataJson = await res.json();
      }
      setCallFetch(dataJson);
    };
    httpRequest();
  }, [config, method, url, idItem]);

  return { data, httpConfig, loading, error };
};
