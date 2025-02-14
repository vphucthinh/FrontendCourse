import api from "@/api/api.jsx";


/**
 * Fetch paginated data from any endpoint.
 * @param {string} endpoint - The API endpoint to fetch data from.
 * @param {number} page - The current page number (default = 1).
 * @param {number} size - Number of items per page (default = 10).
 * @param {Object} params - Additional query parameters (optional).
 * @returns {Promise<Object>} { data: [], totalPages: number, totalItems: number }
 */
export const getPaginatedData = async (endpoint, page = 0, size = 10, params = {}) => {
  try {
    const response = await api.get(`/${endpoint}`, {
      params: { page, size, ...params },
      timeout: 10000, // Timeout set to 10 seconds
    });

    return {
      data: response.data ? response.data : [],
      totalPages: response.pagination?.totalPages || 1,
      totalItems: response.pagination?.totalElements || 0,
    };
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.error(`Request timeout: Unable to fetch data from ${endpoint}`);
    } else {
      console.error(`Error fetching paginated data from ${endpoint}:`, error);
    }
    return { data: [], totalPages: 1, totalItems: 0 };
  }
};
