import axiosInstance from "../lib/config/axiosConfig";

/**
 * A universal fetcher for CRUD operations
 * @param {string} url - The endpoint (e.g., '/users')
 * @param {string} method - GET, POST, PUT, DELETE, etc.
 * @param {object} body - The data to send (for POST/PUT)
 * @param {object} params - Query parameters (for GET/DELETE)
 */
export const apiRequest = async (
  url,
  method = "GET",
  body = null,
  params = {},
) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data: body,
      params,
    });
    return response.data;
  } catch (error) {
    // Centralized error handling
    const message = error.response?.data?.message || "Something went wrong";
    console.error(`API Error [${method}] ${url}:`, message);
    throw error;
  }
};
