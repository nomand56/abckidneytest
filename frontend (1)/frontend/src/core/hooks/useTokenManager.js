// tokenManager.js
import { useEffect, useState } from 'react';

const useTokenManager = () => {
  const [accessToken, setAccessToken] = useState(sessionStorage.getItem('user'));
  const inactivityTimeout = 5 * 60 * 1000;
  const [timeoutId, setTimeoutId] = useState(null);

  const removeAccessToken = () => {
    sessionStorage.removeItem('user');
    setAccessToken(null);
    console.log('Access token removed due to inactivity.');
  };

  const resetTimer = () => {
    clearTimeout(timeoutId);
    const newTimeoutId = setTimeout(removeAccessToken, inactivityTimeout);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    const newTimeoutId = setTimeout(removeAccessToken, inactivityTimeout);
    setTimeoutId(newTimeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return { accessToken, resetTimer };
};

export default useTokenManager;
