"use client";

import { useState } from "react";

const useAsync = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (asyncFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      return result;
    } catch (err) {
      setError(err);
      console.error("Async operation failed:", err);
      return { success: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    execute,
  };
};

export default useAsync;
