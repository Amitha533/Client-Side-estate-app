import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import PropertyTabs from './PropertyTabs';
import { formatPrice, formatDate } from '../utils/searchLogic';
import { FaBed, FaMapMarkerAlt, FaCalendar, FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';

/**
 * PropertyDetails Component
 * Displays full details of a single property
 * @param {Array} properties - All properties data
 * @param {Function} onAddToFavourites - Callback to add to favourites
 * @param {Array} favourites - Array of favourite properties
 */
const PropertyDetails = ({ properties, onAddToFavourites, favourites }) => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id));

  // Check if property is in favourites
  const isFavourite = favourites.some(fav => fav.id === property?.id);

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <p>The property you're looking for doesn't exist.</p>
        <Link to="/" className="back-button">
          <FaArrowLeft /> Back to Search
        </Link>
      </div>
    );
  }

  const handleFavouriteClick = () => {
    onAddToFavourites(property);
  };

  return (
    <div className="property-details-page">
      {/* Back Button */}
      <Link to="/" className="back-button">
        <FaArrowLeft /> Back to Search
      </Link>

      {/* Property Header */}
      <div className="property-header">
        <div className="property-title-section">
          <h1>{property.description}</h1>

          <div className="property-meta">
            {/* REMOVED THE BADGE */}
            <span className="property-location">
              <FaMapMarkerAlt /> {property.location}
            </span>
          </div>
        </div>
        
        <div className="property-price-section">
          <div className="property-price-large">{formatPrice(property.price)}</div>
          <button
            className={`favourite-button-large ${isFavourite ? 'is-favourite' : ''}`}
            onClick={handleFavouriteClick}
            aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          >
            {isFavourite ? <FaHeart /> : <FaRegHeart />}
            {isFavourite ? ' Remove from Favourites' : ' Add to Favourites'}
          </button>
        </div>
      </div>

      {/* Property Key Details */}
      <div className="property-key-details">
        <div className="key-detail">
          <FaBed />
          <span>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</span>
        </div>
        <div className="key-detail">
          <FaCalendar />
          <span>Added: {formatDate(property.dateAdded)}</span>
        </div>
        <div className="key-detail">
          <FaMapMarkerAlt />
          <span>Postcode: {property.postcode}</span>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery 
        images={property.images} 
        altText={property.description}
      />

      {/* Property Tabs (Description, Floor Plan, Map) */}
      <PropertyTabs
        longDescription={property.longDescription}
        floorPlan={property.floorPlan}
        location={property.location}
      />
    </div>
  );
};

export default PropertyDetails;
