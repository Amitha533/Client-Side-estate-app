// Small security helpers for input sanitization and validation
/**
 * Security utility functions
 * React automatically escapes JSX, but these functions provide additional safety
 */

/**
 * Sanitize user input by removing potentially dangerous characters
 * @param {string} input - User input string
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  // Remove any HTML tags
  return input.replace(/<[^>]*>/g, '');
};

/**
 * Validate postcode format (UK postcodes)
 * @param {string} postcode - Postcode string
 * @returns {boolean} Whether postcode format is valid
 */
export const validatePostcode = (postcode) => {
  if (!postcode) return true; // Empty is valid (optional field)
  
  // Basic UK postcode validation (first part only for our search)
  const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}$/i;
  return postcodeRegex.test(postcode.trim());
};

/**
 * Validate price input
 * @param {string} price - Price string
 * @returns {boolean} Whether price is valid
 */
export const validatePrice = (price) => {
  if (!price) return true; // Empty is valid (optional field)
  
  const priceNum = parseFloat(price);
  return !isNaN(priceNum) && priceNum >= 0;
};

/**
 * Validate bedroom count
 * @param {string} bedrooms - Bedroom count string
 * @returns {boolean} Whether bedroom count is valid
 */
export const validateBedrooms = (bedrooms) => {
  if (!bedrooms) return true; // Empty is valid (optional field)
  
  const bedroomsNum = parseInt(bedrooms);
  return !isNaN(bedroomsNum) && bedroomsNum >= 0 && bedroomsNum <= 20;
};