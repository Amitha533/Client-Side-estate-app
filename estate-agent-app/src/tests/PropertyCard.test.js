import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';

const mockProperty = {
  id: 1,
  type: 'house',
  price: 450000,
  bedrooms: 3,
  location: 'Bromley, London',
  description: 'Beautiful 3 bedroom family house',
  thumbnail: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
  images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg']
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PropertyCard Component Tests', () => {
  /**
   * Test 1: PropertyCard renders correctly
   */
  test('renders property card with correct information', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyCard
        property={mockProperty}
        onAddToFavourites={mockAddToFavourites}
        isFavourite={false}
      />
    );

    expect(screen.getByText('Beautiful 3 bedroom family house')).toBeInTheDocument();
    expect(screen.getByText('£450,000')).toBeInTheDocument();
    expect(screen.getByText(/3 beds/i)).toBeInTheDocument();
    expect(screen.getByText(/Bromley, London/i)).toBeInTheDocument();
  });

  /**
   * Test 2: Favourite button click triggers callback
   */
  test('favourite button click calls onAddToFavourites', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyCard
        property={mockProperty}
        onAddToFavourites={mockAddToFavourites}
        isFavourite={false}
      />
    );

    const favouriteButton = screen.getByLabelText(/add to favourites/i);
    fireEvent.click(favouriteButton);

    expect(mockAddToFavourites).toHaveBeenCalledTimes(1);
    expect(mockAddToFavourites).toHaveBeenCalledWith(mockProperty);
  });

  /**
   * Test 3: Favourite status display changes
   */
  test('displays correct favourite icon based on status', () => {
    const mockAddToFavourites = jest.fn();
    
    const { rerender } = renderWithRouter(
      <PropertyCard
        property={mockProperty}
        onAddToFavourites={mockAddToFavourites}
        isFavourite={false}
      />
    );

    let favouriteButton = screen.getByLabelText(/add to favourites/i);
    expect(favouriteButton).not.toHaveClass('is-favourite');

    rerender(
      <BrowserRouter>
        <PropertyCard
          property={mockProperty}
          onAddToFavourites={mockAddToFavourites}
          isFavourite={true}
        />
      </BrowserRouter>
    );

    favouriteButton = screen.getByLabelText(/remove from favourites/i);
    expect(favouriteButton).toHaveClass('is-favourite');
  });

  /**
   * Test 4: Property type badge displays correctly
   */
  test('displays property type badge', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyCard
        property={mockProperty}
        onAddToFavourites={mockAddToFavourites}
        isFavourite={false}
      />
    );

    expect(screen.getByText('house')).toBeInTheDocument();
  });

  /**
   * Test 5: Property card is draggable
   */
  test('property card has draggable attribute', () => {
    const mockAddToFavourites = jest.fn();
    
    const { container } = renderWithRouter(
      <PropertyCard
        property={mockProperty}
        onAddToFavourites={mockAddToFavourites}
        isFavourite={false}
      />
    );

    const propertyCard = container.querySelector('.property-card');
    expect(propertyCard).toHaveAttribute('draggable', 'true');
  });
});