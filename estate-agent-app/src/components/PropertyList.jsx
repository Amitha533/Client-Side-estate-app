import React from 'react';
import PropertyCard from './PropertyCard';

/**
 * PropertyList Component
 * Displays a list of properties in a grid layout
 * @param {Array} properties - Array of property objects to display
 * @param {Function} onAddToFavourites - Callback to add property to favourites
 * @param {Array} favourites - Array of favourite property IDs
 */
const PropertyList = ({ properties, onAddToFavourites, favourites }) => {
  if (!properties || properties.length === 0) {
    return (
      <div className="no-results">
        <h3>No properties found</h3>
        <p>Try adjusting your search criteria to see more results.</p>
      </div>
    );
  }

  return (
    <div className="property-list">
      <h2>Search Results ({properties.length} {properties.length === 1 ? 'property' : 'properties'})</h2>
      
      <div className="property-grid">
        {properties.map(property => (
          <PropertyCard
            key={property.id}
            property={property}
            onAddToFavourites={onAddToFavourites}
            isFavourite={favourites.some(fav => fav.id === property.id)}
            hideBadge={false}   // ★ BADGE SHOWN HERE ★
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
