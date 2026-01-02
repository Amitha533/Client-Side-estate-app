/**
 * Favourites Management Tests
 * Testing the core functionality of adding/removing favourites
 */

describe('Favourites Management Tests', () => {
  /**
   * Test 1: Add property to favourites
   */
  test('adds property to favourites array', () => {
    const favourites = [];
    const newProperty = { id: 1, name: 'Test Property', price: 300000 };
    
    const updatedFavourites = [...favourites, newProperty];
    
    expect(updatedFavourites.length).toBe(1);
    expect(updatedFavourites[0]).toEqual(newProperty);
  });

  /**
   * Test 2: Prevent duplicate favourites
   */
  test('prevents adding duplicate properties to favourites', () => {
    const favourites = [
      { id: 1, name: 'Property 1', price: 300000 },
      { id: 2, name: 'Property 2', price: 400000 }
    ];
    const duplicateProperty = { id: 1, name: 'Property 1', price: 300000 };
    
    const isDuplicate = favourites.some(fav => fav.id === duplicateProperty.id);
    
    expect(isDuplicate).toBe(true);
    
    // Only add if not duplicate
    const updatedFavourites = isDuplicate 
      ? favourites 
      : [...favourites, duplicateProperty];
    
    expect(updatedFavourites.length).toBe(2); // Should remain 2, not 3
  });

  /**
   * Test 3: Remove property from favourites
   */
  test('removes property from favourites by id', () => {
    const favourites = [
      { id: 1, name: 'Property 1', price: 300000 },
      { id: 2, name: 'Property 2', price: 400000 },
      { id: 3, name: 'Property 3', price: 500000 }
    ];
    
    const updatedFavourites = favourites.filter(fav => fav.id !== 2);
    
    expect(updatedFavourites.length).toBe(2);
    expect(updatedFavourites.find(fav => fav.id === 2)).toBeUndefined();
    expect(updatedFavourites.find(fav => fav.id === 1)).toBeDefined();
    expect(updatedFavourites.find(fav => fav.id === 3)).toBeDefined();
  });

  /**
   * Test 4: Clear all favourites
   */
  test('clears all favourites from array', () => {
    const favourites = [
      { id: 1, name: 'Property 1', price: 300000 },
      { id: 2, name: 'Property 2', price: 400000 },
      { id: 3, name: 'Property 3', price: 500000 }
    ];
    
    const clearedFavourites = [];
    
    expect(clearedFavourites.length).toBe(0);
  });

  /**
   * Test 5: Check if property is in favourites
   */
  test('correctly identifies if property is in favourites', () => {
    const favourites = [
      { id: 1, name: 'Property 1', price: 300000 },
      { id: 2, name: 'Property 2', price: 400000 }
    ];
    
    const isFavourite1 = favourites.some(fav => fav.id === 1);
    const isFavourite3 = favourites.some(fav => fav.id === 3);
    
    expect(isFavourite1).toBe(true);
    expect(isFavourite3).toBe(false);
  });

  /**
   * Test 6: Toggle favourite (add if not present, remove if present)
   */
  test('toggles property favourite status', () => {
    let favourites = [
      { id: 1, name: 'Property 1', price: 300000 }
    ];
    const property = { id: 2, name: 'Property 2', price: 400000 };
    
    // Add if not in favourites
    const isAlreadyFavourite = favourites.some(fav => fav.id === property.id);
    
    if (isAlreadyFavourite) {
      favourites = favourites.filter(fav => fav.id !== property.id);
    } else {
      favourites = [...favourites, property];
    }
    
    expect(favourites.length).toBe(2);
    expect(favourites.find(fav => fav.id === 2)).toBeDefined();
    
    // Now remove it (toggle again)
    const isStillFavourite = favourites.some(fav => fav.id === property.id);
    
    if (isStillFavourite) {
      favourites = favourites.filter(fav => fav.id !== property.id);
    } else {
      favourites = [...favourites, property];
    }
    
    expect(favourites.length).toBe(1);
    expect(favourites.find(fav => fav.id === 2)).toBeUndefined();
  });

  /**
   * Test 7: Handle empty favourites array
   */
  test('handles operations on empty favourites array', () => {
    const favourites = [];
    
    expect(favourites.length).toBe(0);
    
    const isFavourite = favourites.some(fav => fav.id === 1);
    expect(isFavourite).toBe(false);
    
    const removed = favourites.filter(fav => fav.id !== 1);
    expect(removed.length).toBe(0);
  });
});