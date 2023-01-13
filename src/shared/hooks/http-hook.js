import { useCallback, useEffect, useRef, useState } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // in case request doesn't complete
  const activeHttpRequest = useRef([]);
  // to avoid infinte loops we wrap it with useCallback  , so this function never get
  // created when the component use that use this hook renders
  const sendRequest = useCallback(
    async (url, method = 'GET', headers = {}, body = null) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrl);
      try {
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: httpAbortCtrl.signal, //link httpAbortCtrl with req
        });
        const responseData = await response.json();
        console.log(responseData ,"responseData");
        // remove abortCtrl in case request complete.
        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        if (!response.ok) {
          setIsLoading(false);
          throw new Error(responseData.message);

        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        if (!err.message === 'The user aborted a request.') {
          setError(err.message);
          setIsLoading(false);
          throw err;
        }
      }
    },
    []
  );
  const clearError = () => {
    setError(null);
  };

  //  for clean up logic when comp unmounts
  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};

