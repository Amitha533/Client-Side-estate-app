// PropertyCard: compact card displaying key property details and favourite button
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/searchLogic';
import { FaHeart, FaRegHeart, FaBed, FaMapMarkerAlt } from 'react-icons/fa';

/**
 * PropertyCard Component
 * Displays a single property in card format
 * @param {Object} property - Property object
 * @param {Function} onAddToFavourites - Callback to add to favourites
 * @param {Boolean} isFavourite - Whether property is in favourites
 * @param {Boolean} hideBadge - Whether to hide the property-type badge
 */
const PropertyCard = ({ property, onAddToFavourites, isFavourite, hideBadge }) => {
  
  const handleFavouriteClick = (e) => {
    e.preventDefault(); // Prevent link navigation
    onAddToFavourites(property);
  };

  return (
    <div 
      className="property-card"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('property', JSON.stringify(property));
      }}
    >
      <Link to={`/property/${property.id}`} className="property-card-link">
        <div className="property-card-image">
          <img 
            src={property.thumbnail || property.images[0]} 
            alt={property.description}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=Property+Image';
            }}
          />

          {/* ★ Hide badge based on prop ★ */}
          {!hideBadge && (
            <span className="property-type-badge">{property.type}</span>
          )}
        </div>
        
        <div className="property-card-content">
          <div className="property-price">{formatPrice(property.price)}</div>
          
          <div className="property-details">
            <span className="property-bedrooms">
              <FaBed /> {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
            </span>
            <span className="property-location">
              <FaMapMarkerAlt /> {property.location}
            </span>
          </div>
          
          <p className="property-description">{property.description}</p>
        </div>
      </Link>
      
      <button
        className={`favourite-button ${isFavourite ? 'is-favourite' : ''}`}
        onClick={handleFavouriteClick}
        aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
      >
        {isFavourite ? <FaHeart /> : <FaRegHeart />}
      </button>
    </div>
  );
};

export default PropertyCard;
