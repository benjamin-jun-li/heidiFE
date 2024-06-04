import { useEffect, useState } from "react";

const useOffline = (): boolean => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOffline = (): void => {
      setIsOffline(true);
    };
    const handleOnline = (): void => {
      setIsOffline(false);
    };
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return isOffline;
}

export default useOffline;
