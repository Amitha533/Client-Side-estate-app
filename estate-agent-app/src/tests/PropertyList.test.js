import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PropertyList from '../components/PropertyList';

const mockProperties = [
  {
    id: 1,
    type: 'house',
    price: 450000,
    bedrooms: 3,
    location: 'Bromley, London',
    description: 'Beautiful house',
    thumbnail: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg']
  },
  {
    id: 2,
    type: 'flat',
    price: 280000,
    bedrooms: 2,
    location: 'Camden, London',
    description: 'Modern flat',
    thumbnail: 'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg',
    images: ['https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg']
  }
];

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PropertyList Component Tests', () => {
  /**
   * Test 1: PropertyList renders with properties
   */
  test('renders correct number of property cards', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyList
        properties={mockProperties}
        onAddToFavourites={mockAddToFavourites}
        favourites={[]}
      />
    );

    expect(screen.getByText(/2 properties/i)).toBeInTheDocument();
    expect(screen.getByText('Beautiful house')).toBeInTheDocument();
    expect(screen.getByText('Modern flat')).toBeInTheDocument();
  });

  /**
   * Test 2: PropertyList shows no results message
   */
  test('displays no results message when properties array is empty', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyList
        properties={[]}
        onAddToFavourites={mockAddToFavourites}
        favourites={[]}
      />
    );

    expect(screen.getByText('No properties found')).toBeInTheDocument();
    expect(screen.getByText(/Try adjusting your search criteria/i)).toBeInTheDocument();
  });

  /**
   * Test 3: PropertyList singular/plural property text
   */
  test('displays singular "property" when only one result', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyList
        properties={[mockProperties[0]]}
        onAddToFavourites={mockAddToFavourites}
        favourites={[]}
      />
    );

    expect(screen.getByText(/1 property/i)).toBeInTheDocument();
  });

  /**
   * Test 4: PropertyList displays all property information
   */
  test('displays property prices correctly', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyList
        properties={mockProperties}
        onAddToFavourites={mockAddToFavourites}
        favourites={[]}
      />
    );

    expect(screen.getByText('£450,000')).toBeInTheDocument();
    expect(screen.getByText('£280,000')).toBeInTheDocument();
  });

  /**
   * Test 5: PropertyList handles null/undefined properties
   */
  test('handles null properties gracefully', () => {
    const mockAddToFavourites = jest.fn();
    
    renderWithRouter(
      <PropertyList
        properties={null}
        onAddToFavourites={mockAddToFavourites}
        favourites={[]}
      />
    );

    expect(screen.getByText('No properties found')).toBeInTheDocument();
  });
});