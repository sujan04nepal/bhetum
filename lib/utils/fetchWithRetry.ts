/**
 * Fetch with retry logic for better network reliability
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3,
  delay: number = 1000,
): Promise<Response> {
  let lastError: Error;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Cache-Control": "no-cache",
          ...options.headers,
        },
      });

      if (response.ok || response.status < 500) {
        return response;
      }

      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (i === maxRetries) {
        break;
      }

      // Wait before retrying, with exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, delay * Math.pow(2, i)),
      );
    }
  }

  throw lastError!;
}

/**
 * Enhanced fetch for development mode with better error handling
 */
export async function devFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  if (process.env.NODE_ENV === "development") {
    try {
      return await fetchWithRetry(url, options, 2, 500);
    } catch (error) {
      console.warn("Dev fetch failed, falling back to regular fetch:", error);
      return fetch(url, options);
    }
  }

  return fetch(url, options);
}
