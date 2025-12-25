import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';


/**
 * ImageGallery Component
 * Displays property images with thumbnail navigation
 * @param {Array} images - Array of image URLs
 * @param {String} altText - Alt text for images
 */
const ImageGallery = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  /**
   * Navigate to previous image
   */
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  /**
   * Navigate to next image
   */
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  /**
   * Go to specific image by index
   */
  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  /**
   * Open lightbox view
   */
  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  /**
   * Close lightbox view
   */
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery">
        <img 
          src="https://via.placeholder.com/800x600?text=No+Images+Available" 
          alt="No images available"
        />
      </div>
    );
  }

  return (
    <div className="image-gallery">
      {/* Main Image Display */}
      <div className="gallery-main">
        <img
          src={images[currentIndex]}
          alt={`${altText} - Image ${currentIndex + 1}`}
          onClick={openLightbox}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
          }}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className="gallery-nav gallery-nav-prev"
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <FaChevronLeft />
            </button>
            <button
              className="gallery-nav gallery-nav-next"
              onClick={goToNext}
              aria-label="Next image"
            >
              <FaChevronRight />
            </button>
          </>
        )}
        
        {/* Image Counter */}
        <div className="gallery-counter">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
      

      {/* Thumbnail Strip */}
      <div className="gallery-thumbnails">
        {images.map((image, index) => (
          <div
            key={index}
            className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToImage(index)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/100x75?text=Thumb';
              }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="lightbox" onClick={closeLightbox}>
          <button
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <FaTimes />
          </button>
          
          <img
            src={images[currentIndex]}
            alt={`${altText} - Image ${currentIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          
          {images.length > 1 && (
            <>
              <button
                className="lightbox-nav lightbox-nav-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous image"
              >
                <FaChevronLeft />
              </button>
              <button
                className="lightbox-nav lightbox-nav-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
              >
                <FaChevronRight />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;