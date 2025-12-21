import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import FavouritesList from './components/FavouritesList';
import { searchProperties } from './utils/searchLogic';
import propertiesData from './data/properties.json';
import './App.css';
import { FaHeart } from 'react-icons/fa';

/**
 * Main App Component
 * Manages application state and routing
 */
function App() {
  // State management
  const [properties] = useState(propertiesData);
  const [searchResults, setSearchResults] = useState(propertiesData);
  const [favourites, setFavourites] = useState([]);
  const [isFavouritesPanelVisible, setIsFavouritesPanelVisible] = useState(true);

  /**
   * Load favourites from localStorage on mount
   */
  useEffect(() => {
    const savedFavourites = localStorage.getItem('favourites');
    if (savedFavourites) {
      try {
        setFavourites(JSON.parse(savedFavourites));
      } catch (error) {
        console.error('Error loading favourites:', error);
      }
    }
  }, []);

  /**
   * Save favourites to localStorage whenever they change
   */
  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  /**
   * Listen for custom addToFavourites event (for drag & drop)
   */
  useEffect(() => {
    const handleAddToFavourites = (event) => {
      if (event.detail) {
        addToFavourites(event.detail);
      }
    };

    window.addEventListener('addToFavourites', handleAddToFavourites);
    
    return () => {
      window.removeEventListener('addToFavourites', handleAddToFavourites);
    };
  }, [favourites]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Handle search form submission
   * @param {Object} criteria - Search criteria from form
   */
  const handleSearch = (criteria) => {
    const results = searchProperties(properties, criteria);
    setSearchResults(results);
  };

  /**
   * Add property to favourites (prevents duplicates)
   * @param {Object} property - Property to add
   */
  const addToFavourites = (property) => {
    setFavourites(prevFavourites => {
      // Check if already in favourites
      const isAlreadyFavourite = prevFavourites.some(fav => fav.id === property.id);
      
      if (isAlreadyFavourite) {
        // Remove from favourites (toggle behaviour)
        return prevFavourites.filter(fav => fav.id !== property.id);
      } else {
        // Add to favourites
        return [...prevFavourites, property];
      }
    });
  };

  /**
   * Remove property from favourites
   * @param {Number} propertyId - ID of property to remove
   */
  const removeFavourite = (propertyId) => {
    setFavourites(prevFavourites => 
      prevFavourites.filter(fav => fav.id !== propertyId)
    );
  };

  /**
   * Clear all favourites
   */
  const clearFavourites = () => {
    if (window.confirm('Are you sure you want to clear all favourites?')) {
      setFavourites([]);
    }
  };

  /**
   * Toggle favourites panel visibility
   */
  const toggleFavouritesPanel = () => {
    setIsFavouritesPanelVisible(prev => !prev);
  };

  return (
    <Router>
      <div className="App">
        {/* Header */}
        <header className="app-header">
          <img src="/images/logo.png" alt="App Logo" className="app-logo" />


          <div className="header-content">
            <h1>NESTNOVA</h1>
            <p className="tagline">Find Your Dream Property</p>
          </div>
          <button
            className="show-favourites-button"
            onClick={toggleFavouritesPanel}
            aria-label="Toggle favourites panel"
          >
            <FaHeart /> Favourites ({favourites.length})
          </button>
        </header>

        {/* Main Content */}
        <div className="app-content">
          <Routes>
            {/* Search Page */}
            <Route
              path="/"
              element={
                <div className="search-page">
                  <div className="main-content">
                    <SearchForm onSearch={handleSearch} />
                    <PropertyList
                      properties={searchResults}
                      onAddToFavourites={addToFavourites}
                      favourites={favourites}
                    />
                  </div>
                  
                  <FavouritesList
                    favourites={favourites}
                    onRemoveFavourite={removeFavourite}
                    onClearFavourites={clearFavourites}
                    isVisible={isFavouritesPanelVisible}
                    onToggle={toggleFavouritesPanel}
                  />
                </div>
              }
            />

            {/* Property Details Page */}
            <Route
              path="/property/:id"
              element={
                <PropertyDetails
                  properties={properties}
                  onAddToFavourites={addToFavourites}
                  favourites={favourites}
                />
              }
            />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; 2025 Estate NESTNOVA. Find Your Dream Nest.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;