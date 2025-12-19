/**
 * Search properties based on multiple criteria
 * Handles any combination of 1-5 search criteria
 * @param {Array} properties - Array of property objects
 * @param {Object} criteria - Search criteria object
 * @returns {Array} Filtered properties matching all criteria
 */
export const searchProperties = (properties, criteria) => {
  return properties.filter(property => {
    // Type filter
    if (criteria.type && criteria.type !== 'any') {
      if (property.type !== criteria.type) {
        return false;
      }
    }

    // Min price filter
    if (criteria.minPrice) {
      const minPrice = parseFloat(criteria.minPrice);
      if (!isNaN(minPrice) && property.price < minPrice) {
        return false;
      }
    }

    // Max price filter
    if (criteria.maxPrice) {
      const maxPrice = parseFloat(criteria.maxPrice);
      if (!isNaN(maxPrice) && property.price > maxPrice) {
        return false;
      }
    }

    // Min bedrooms filter
    if (criteria.minBedrooms) {
      const minBeds = parseInt(criteria.minBedrooms);
      if (!isNaN(minBeds) && property.bedrooms < minBeds) {
        return false;
      }
    }

    // Max bedrooms filter
    if (criteria.maxBedrooms) {
      const maxBeds = parseInt(criteria.maxBedrooms);
      if (!isNaN(maxBeds) && property.bedrooms > maxBeds) {
        return false;
      }
    }

    // Date filter - after specified date
    if (criteria.dateAddedAfter) {
      const afterDate = new Date(criteria.dateAddedAfter);
      const propertyDate = new Date(property.dateAdded);
      if (propertyDate < afterDate) {
        return false;
      }
    }

    // Date filter - between two dates
    if (criteria.dateAddedFrom && criteria.dateAddedTo) {
      const fromDate = new Date(criteria.dateAddedFrom);
      const toDate = new Date(criteria.dateAddedTo);
      const propertyDate = new Date(property.dateAdded);
      
      if (propertyDate < fromDate || propertyDate > toDate) {
        return false;
      }
    }

    // Postcode filter (partial match on first part)
    if (criteria.postcode) {
      const searchPostcode = criteria.postcode.toUpperCase().trim();
      const propertyPostcode = property.postcode.toUpperCase();
      
      if (!propertyPostcode.startsWith(searchPostcode)) {
        return false;
      }
    }

    // If all filters passed, include this property
    return true;
  });
};

/**
 * Format price for display
 * @param {number} price - Property price
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return `£${price.toLocaleString('en-GB')}`;
};

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};