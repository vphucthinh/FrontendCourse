// src/services/sortService.js

/**
 * Sorts items based on the selected sorting option.
 * @param {Array} items - The dataset to sort.
 * @param {string} sortBy - The sorting criteria.
 * @returns {Array} Sorted dataset.
 */
export const sortItems = (items, sortBy) => {
  if (!items.length) return [];

  const sortedData = [...items];

  switch (sortBy) {
    case "Rating (asc)":
      return sortedData.sort((a, b) => a.rating - b.rating);
    case "Rating (dsc)":
      return sortedData.sort((a, b) => b.rating - a.rating);
    case "Price (asc)":
      return sortedData.sort((a, b) => a.discountedPrice - b.discountedPrice);
    case "Price (dsc)":
      return sortedData.sort((a, b) => b.discountedPrice - a.discountedPrice);
    case "Duration (asc)":
      return sortedData.sort((a, b) => a.duration - b.duration);
    case "Duration (dsc)":
      return sortedData.sort((a, b) => b.duration - a.duration);
    default:
      return items; // Default order (no sorting)
  }
};
