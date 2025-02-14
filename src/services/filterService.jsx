// src/services/filterService.js

/**
 * Filters items based on multiple criteria.
 * @param {Array} items - The original dataset.
 * @param {Object} filters - The filters to apply.
 * @returns {Array} Filtered dataset.
 */
export const filterItems = (items, filters) => {
  let filteredData = [...items];

  // Filter by price
  if (filters.price !== "All") {
    filteredData = filteredData.filter((item) =>
      filters.price === "Free" ? !item.paid : item.paid
    );
  }

  // Apply each filter if it's not empty
  if (filters.instructors?.length > 0) {
    filteredData = filteredData.filter((item) =>
      filters.instructors.includes(item.authorName)
    );
  }

  if (filters.categories?.length > 0) {
    filteredData = filteredData.filter((item) =>
      filters.categories.includes(item.category)
    );
  }

  if (filters.levels?.length > 0) {
    filteredData = filteredData.filter((item) =>
      filters.levels.includes(item.level)
    );
  }

  if (filters.languages?.length > 0) {
    filteredData = filteredData.filter((item) =>
      filters.languages.includes(item.languange)
    );
  }

  if (filters.ratingRange?.length === 2) {
    filteredData = filteredData.filter(
      (item) =>
        item.rating >= filters.ratingRange[0] &&
        item.rating <= filters.ratingRange[1]
    );
  }

  if (filters.duration?.length === 2) {
    filteredData = filteredData.filter(
      (item) =>
        item.duration >= filters.duration[0] &&
        item.duration <= filters.duration[1]
    );
  }

  return filteredData;
};
