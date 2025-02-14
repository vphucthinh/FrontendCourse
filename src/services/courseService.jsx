import {Constants} from "@/constants/constants.jsx";
import api from "@/api/api.jsx";
import {getPaginatedData} from "@/services/paginationService.jsx";

const API_BASE = Constants.API_URL;
const COURSES_ENDPOINTS = Constants.API_ENDPOINTS.COURSES;

/**
 * Fetch all courses from the backend.
 * @returns {Promise<Array>} List of courses.
 */
export const getAllCourses = async () => {
  try {
    const response = await api.get(`${API_BASE}/${COURSES_ENDPOINTS.GET_ALL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

/**
 * Fetch paginated courses using the generic pagination services.
 * @param {number} page - Page number.
 * @param {number} size - Number of courses per page.
 * @returns {Promise<Object>} { courses: [], totalPages: number, totalItems: number }
 */
export const getPaginatedCourses = async (page = 0, size = 10) => {
  return getPaginatedData(`${COURSES_ENDPOINTS.GET_ALL}`, page, size);
};


/**
 * Fetch course details by ID.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<Object>} Course details.
 */
export const getCourseDetail = async (courseId) => {
  try {
    const response = await api.get(`${API_BASE}/${COURSES_ENDPOINTS.DETAIL}/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course detail:", error);
    return null;
  }
};

/**
 * Create a new course.
 * @param {Object} courseData - The course data to create.
 * @returns {Promise<Object>} Created course data.
 */
export const createCourse = async (courseData) => {
  try {
    const response = await api.post(
      `${API_BASE}/${COURSES_ENDPOINTS.CREATE}`,
      courseData,
      {headers:{ "Content-Type": "application/json"}}
    );
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    return null;
  }
};

/**
 * Update a course by ID.
 * @param {string} courseId - The ID of the course.
 * @param {Object} updateData - The updated course data.
 * @returns {Promise<Object>} Updated course data.
 */
export const updateCourse = async (courseId, updateData) => {
  try {
    const response = await api.put(
      `${API_BASE}/${COURSES_ENDPOINTS.UPDATE}/${courseId}`,
      updateData,
      {headers:{ "Content-Type": "application/json"}}
    );
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    return null;
  }
};

/**
 * Delete a course by ID.
 * @param {string} courseId - The ID of the course.
 * @returns {Promise<boolean>} Success status.
 */
export const deleteCourse = async (courseId) => {
  try {
    await api.delete(`${API_BASE}/${COURSES_ENDPOINTS.DELETE}/${courseId}`);
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    return false;
  }
};
