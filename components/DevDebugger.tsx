"use client";

import { useEffect, useState } from "react";

export function DevDebugger() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const handleError = (event: ErrorEvent) => {
      setErrors((prev) => [...prev.slice(-4), event.message]);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setErrors((prev) => [
        ...prev.slice(-4),
        `Promise rejection: ${event.reason}`,
      ]);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection,
      );
    };
  }, []);

  if (process.env.NODE_ENV !== "development" || errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-md">
      {errors.map((error, index) => (
        <div
          key={index}
          className="mb-2 p-3 bg-red-100 border border-red-300 text-red-800 text-xs rounded shadow-lg animate-pulse"
        >
          <button
            onClick={() =>
              setErrors((prev) => prev.filter((_, i) => i !== index))
            }
            className="float-right ml-2 text-red-600 hover:text-red-800"
          >
            ×
          </button>
          {error}
        </div>
      ))}
    </div>
  );
}
