// SearchForm: user-facing form for building search criteria using widgets
import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Slider, Button, Box, Typography } from '@mui/material';
import { validatePostcode, validatePrice, validateBedrooms } from '../utils/security';

/**
 * SearchForm Component
 * Provides search form with React widgets for all form elements
 * Handles user input and passes search criteria to parent component
 */
const SearchForm = ({ onSearch }) => {
  // Form state
  const [propertyType, setPropertyType] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedroomRange, setBedroomRange] = useState([1, 5]);
  const [dateMode, setDateMode] = useState('after'); // 'after' or 'between'
  const [dateAfter, setDateAfter] = useState(null);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [postcode, setPostcode] = useState('');
  const [errors, setErrors] = useState({});

  // Property type options for react-select
  const propertyTypeOptions = [
    { value: 'any', label: 'Any' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' }
  ];

  // Date mode options
  const dateModeOptions = [
    { value: 'after', label: 'After Date' },
    { value: 'between', label: 'Between Dates' }
  ];

  /**
   * Validate form inputs
   * @returns {boolean} Whether form is valid
   */
  const validateForm = () => {
    const newErrors = {};

    if (postcode && !validatePostcode(postcode)) {
      newErrors.postcode = 'Invalid postcode format (e.g., BR1, NW1)';
    }

    if (!validatePrice(priceRange[0]) || !validatePrice(priceRange[1])) {
      newErrors.price = 'Invalid price range';
    }

    if (!validateBedrooms(bedroomRange[0]) || !validateBedrooms(bedroomRange[1])) {
      newErrors.bedrooms = 'Invalid bedroom range';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Build search criteria object
    const criteria = {
      type: propertyType?.value,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minBedrooms: bedroomRange[0],
      maxBedrooms: bedroomRange[1],
      postcode: postcode.trim()
    };

    // Add date criteria based on mode
    if (dateMode === 'after' && dateAfter) {
      criteria.dateAddedAfter = dateAfter.toISOString().split('T')[0];
    } else if (dateMode === 'between' && dateFrom && dateTo) {
      criteria.dateAddedFrom = dateFrom.toISOString().split('T')[0];
      criteria.dateAddedTo = dateTo.toISOString().split('T')[0];
    }

    // Pass criteria to parent component
    onSearch(criteria);
  };

  /**
   * Handle form reset
   */
  const handleReset = () => {
    setPropertyType(null);
    setPriceRange([0, 1000000]);
    setBedroomRange([1, 5]);
    setDateMode('after');
    setDateAfter(null);
    setDateFrom(null);
    setDateTo(null);
    setPostcode('');
    setErrors({});
    onSearch({});
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2>Search Properties</h2>

      {/* Property Type - React Select Widget */}
      <div className="form-group">
        <label htmlFor="property-type">Property Type</label>
        <Select
          inputId="property-type"
          options={propertyTypeOptions}
          value={propertyType}
          onChange={setPropertyType}
          placeholder="Select property type..."
          isClearable
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Price Range - Material UI Slider */}
      <div className="form-group">
        <Typography gutterBottom>
          Price Range: £{priceRange[0].toLocaleString()} - £{priceRange[1].toLocaleString()}
        </Typography>
        <Slider
          value={priceRange}
          onChange={(e, newValue) => setPriceRange(newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={1000000}
          step={10000}
          valueLabelFormat={(value) => `£${value.toLocaleString()}`}
        />
        {errors.price && <span className="error-message">{errors.price}</span>}
      </div>

      {/* Bedroom Range - Material UI Slider */}
      <div className="form-group">
        <Typography gutterBottom>
          Bedrooms: {bedroomRange[0]} - {bedroomRange[1]}
        </Typography>
        <Slider
          value={bedroomRange}
          onChange={(e, newValue) => setBedroomRange(newValue)}
          valueLabelDisplay="auto"
          min={1}
          max={10}
          step={1}
          marks
        />
        {errors.bedrooms && <span className="error-message">{errors.bedrooms}</span>}
      </div>

      {/* Date Mode Selection */}
      <div className="form-group">
        <label htmlFor="date-mode">Date Filter Mode</label>
        <Select
          inputId="date-mode"
          options={dateModeOptions}
          value={dateModeOptions.find(opt => opt.value === dateMode)}
          onChange={(option) => setDateMode(option.value)}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      {/* Date Picker - React DatePicker Widget */}
      {dateMode === 'after' ? (
        <div className="form-group">
          <label>Date Added After</label>
          <DatePicker
            selected={dateAfter}
            onChange={setDateAfter}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select date..."
            isClearable
            className="date-picker-input"
          />
        </div>
      ) : (
        <div className="form-group date-range">
          <div className="date-input">
            <label>From Date</label>
            <DatePicker
              selected={dateFrom}
              onChange={setDateFrom}
              dateFormat="dd/MM/yyyy"
              placeholderText="From date..."
              isClearable
              selectsStart
              startDate={dateFrom}
              endDate={dateTo}
              className="date-picker-input"
            />
          </div>
          <div className="date-input">
            <label>To Date</label>
            <DatePicker
              selected={dateTo}
              onChange={setDateTo}
              dateFormat="dd/MM/yyyy"
              placeholderText="To date..."
              isClearable
              selectsEnd
              startDate={dateFrom}
              endDate={dateTo}
              minDate={dateFrom}
              className="date-picker-input"
            />
          </div>
        </div>
      )}

      {/* Postcode - Material UI TextField */}
      <div className="form-group">
        <TextField
          label="Postcode Area"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          placeholder="e.g., BR1, NW1"
          fullWidth
          variant="outlined"
          error={!!errors.postcode}
          helperText={errors.postcode || 'Enter first part of postcode'}
        />
      </div>

      {/* Form Buttons - Material UI Buttons */}
      <Box className="form-buttons">
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          size="large"
        >
          Search Properties
        </Button>
        <Button 
          type="button" 
          variant="outlined" 
          color="secondary"
          size="large"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Box>
    </form>
  );
};

export default SearchForm;