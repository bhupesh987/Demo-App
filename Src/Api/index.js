export const GET_API = async route => {
  const timeoutValue = 10000; // Timeout in milliseconds (adjust as needed)
  try {
    const response = await fetchDataWithTimeout(route, timeoutValue);
    return response;
  } catch (error) {
    console.error('Error:', error.message);
    return {
      status: 'error',
      data: {},
    };
  }
};

const fetchDataWithTimeout = async (url, timeout) => {
  const controller = new AbortController();
  const signal = controller.signal;

  // Set up a timeout using setTimeout
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {signal});
    // Check if the request was aborted due to a timeout
    if (signal.aborted) {
      throw new Error('Request timed out');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors, including timeout errors
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};
