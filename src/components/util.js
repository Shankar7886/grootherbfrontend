const apiFetch = async (endpoint, payload = null, customHeaders = {}) => {
  
  const BASE_URL = 'https://grootherbbackend.onrender.com/api'; // Using a public test API

  const url = `${BASE_URL}${endpoint}`;

  // 1. Determine the method and set up headers and body
  const method = payload ? 'POST' : 'GET';
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const options = {
    method: method,
    headers: { ...defaultHeaders, ...customHeaders },
  };

  // If a payload exists, stringify it and add it to the request body.
  if (payload) {
    options.body = JSON.stringify(payload);
  }

  // 2. Perform the fetch request inside a try...catch block
  try {
    const response = await fetch(url, options);

    // 3. Check if the response was successful
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(`HTTP Error: ${response.status} - ${errorBody.message || 'Unknown error'}`);
    }

    // 4. Handle responses with no content (e.g., HTTP 204)
    if (response.status === 204) {
      return null;
    }

    // 5. Parse and return the JSON data
    return await response.json();

  } catch (error) {
    console.error('API Fetch Error:', error);
    // Re-throw the error so the calling function can handle it
    throw error;
  }
};

export default apiFetch