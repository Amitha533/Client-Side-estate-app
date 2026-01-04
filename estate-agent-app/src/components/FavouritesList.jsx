// FavouritesList: panel showing saved favourites with drag & drop support
import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/searchLogic';
import { FaTrash, FaTimes } from 'react-icons/fa';

/**
 * FavouritesList Component
 * Displays saved favourite properties with drag & drop support
 * @param {Array} favourites - Array of favourite properties
 * @param {Function} onRemoveFavourite - Callback to remove single favourite
 * @param {Function} onClearFavourites - Callback to clear all favourites
 * @param {Boolean} isVisible - Whether favourites panel is visible
 * @param {Function} onToggle - Callback to toggle visibility
 */
const FavouritesList = ({ 
  favourites, 
  onRemoveFavourite, 
  onClearFavourites,
  isVisible,
  onToggle 
}) => {
  
  /**
   * Handle drop event to add property to favourites
   */
  const handleDrop = (e) => {
    e.preventDefault();
    const propertyData = e.dataTransfer.getData('property');
    
    if (propertyData) {
      try {
        const property = JSON.parse(propertyData);
        // Check if already in favourites
        const isAlreadyFavourite = favourites.some(fav => fav.id === property.id);
        
        if (!isAlreadyFavourite) {
          // Add to favourites (this will be handled by parent component)
          // We need to trigger the add function from parent
          const event = new CustomEvent('addToFavourites', { 
            detail: property 
          });
          window.dispatchEvent(event);
        }
      } catch (error) {
        console.error('Error parsing property data:', error);
      }
    }
  };

  /**
   * Handle drag over event (required for drop to work)
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  /**
   * Handle drag leave event
   */
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over');
  };

  /**
   * Handle drag start for removing from favourites
   */
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData('removeFavourite', JSON.stringify(property));
  };

  return (
    <div className={`favourites-panel ${isVisible ? 'visible' : ''}`}>
      <div className="favourites-header">
        <h3>My Favourites ({favourites.length})</h3>
        <button 
          className="toggle-favourites"
          onClick={onToggle}
          aria-label="Toggle favourites panel"
        >
          <FaTimes />
        </button>
      </div>

      {favourites.length > 0 && (
        <button 
          className="clear-favourites-button"
          onClick={onClearFavourites}
        >
          <FaTrash /> Clear All
        </button>
      )}

      <div 
        className="favourites-drop-zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {favourites.length === 0 ? (
          <div className="favourites-empty">
            <p>No favourites yet</p>
            <p className="drag-hint">Drag properties here or click the heart icon</p>
          </div>
        ) : (
          <div className="favourites-list">
            {favourites.map(property => (
              <div
                key={property.id}
                className="favourite-item"
                draggable
                onDragStart={(e) => handleDragStart(e, property)}
              >
                <Link to={`/property/${property.id}`} className="favourite-link">
                  <img 
                    src={property.thumbnail || property.images[0]} 
                    alt={property.description}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x75?text=Property';
                    }}
                  />
                  <div className="favourite-info">
                    <div className="favourite-price">{formatPrice(property.price)}</div>
                    <div className="favourite-location">{property.location}</div>
                  </div>
                </Link>
                <button
                  className="remove-favourite-button"
                  onClick={() => onRemoveFavourite(property.id)}
                  aria-label="Remove from favourites"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Drop zone for removing favourites */}
      <div 
        className="remove-drop-zone"
        onDrop={(e) => {
          e.preventDefault();
          const propertyData = e.dataTransfer.getData('removeFavourite');
          if (propertyData) {
            try {
              const property = JSON.parse(propertyData);
              onRemoveFavourite(property.id);
            } catch (error) {
              console.error('Error removing favourite:', error);
            }
          }
          e.currentTarget.classList.remove('drag-over');
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add('drag-over');
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('drag-over');
        }}
      >
        <FaTrash /> Drag here to remove
      </div>
    </div>
  );
};

export default FavouritesList;