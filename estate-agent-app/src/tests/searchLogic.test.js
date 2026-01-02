import { searchProperties, formatPrice, formatDate } from '../utils/searchLogic';

// Sample test data
const testProperties = [
  {
    id: 1,
    type: 'house',
    price: 450000,
    bedrooms: 3,
    dateAdded: '2024-10-15',
    postcode: 'BR1',
    location: 'Bromley, London'
  },
  {
    id: 2,
    type: 'flat',
    price: 280000,
    bedrooms: 2,
    dateAdded: '2024-11-01',
    postcode: 'NW1',
    location: 'Camden, London'
  },
  {
    id: 3,
    type: 'house',
    price: 675000,
    bedrooms: 4,
    dateAdded: '2024-09-20',
    postcode: 'SE1',
    location: 'Southwark, London'
  },
  {
    id: 4,
    type: 'flat',
    price: 195000,
    bedrooms: 1,
    dateAdded: '2024-11-10',
    postcode: 'E1',
    location: 'Whitechapel, London'
  }
];

describe('Search Logic Tests', () => {
  /**
   * Test 1: Search by property type
   */
  test('filters properties by type correctly', () => {
    const criteria = { type: 'house' };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(2);
    expect(results.every(p => p.type === 'house')).toBe(true);
  });

  /**
   * Test 2: Search by price range
   */
  test('filters properties by price range', () => {
    const criteria = { 
      minPrice: 250000, 
      maxPrice: 500000 
    };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(2);
    expect(results.every(p => p.price >= 250000 && p.price <= 500000)).toBe(true);
  });

  /**
   * Test 3: Search by minimum bedrooms
   */
  test('filters properties by minimum bedrooms', () => {
    const criteria = { 
      minBedrooms: 3
    };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(2);
    expect(results.every(p => p.bedrooms >= 3)).toBe(true);
  });

  /**
   * Test 4: Search by bedroom range
   */
  test('filters properties by bedroom range', () => {
    const criteria = { 
      minBedrooms: 2, 
      maxBedrooms: 3 
    };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(2);
    expect(results.every(p => p.bedrooms >= 2 && p.bedrooms <= 3)).toBe(true);
  });

  /**
   * Test 5: Search by postcode
   */
  test('filters properties by postcode prefix', () => {
    const criteria = { postcode: 'NW' };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(1);
    expect(results[0].postcode).toBe('NW1');
  });

  /**
   * Test 6: Search with multiple criteria simultaneously
   */
  test('filters properties with multiple criteria', () => {
    const criteria = {
      type: 'house',
      minPrice: 400000,
      maxPrice: 500000,
      minBedrooms: 3,
      maxBedrooms: 3
    };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(1);
    expect(results[0].id).toBe(1);
    expect(results[0].type).toBe('house');
    expect(results[0].price).toBe(450000);
    expect(results[0].bedrooms).toBe(3);
  });

  /**
   * Test 7: Search with date filter (after date)
   */
  test('filters properties by date added after', () => {
    const criteria = { 
      dateAddedAfter: '2024-10-01' 
    };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(3);
    expect(results.every(p => new Date(p.dateAdded) >= new Date('2024-10-01'))).toBe(true);
  });

  /**
   * Test 8: Search returns all properties with empty criteria
   */
  test('returns all properties when no criteria provided', () => {
    const criteria = {};
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(4);
  });

  /**
   * Test 9: Search with "any" type returns all types
   */
  test('returns all property types when type is "any"', () => {
    const criteria = { type: 'any' };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(4);
  });

  /**
   * Test 10: Search returns empty array when no matches
   */
  test('returns empty array when no properties match criteria', () => {
    const criteria = { 
      minPrice: 1000000,
      maxPrice: 2000000
    };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(0);
  });

  /**
   * Test 11: Format price utility function
   */
  test('formats price correctly with pound sign and commas', () => {
    expect(formatPrice(450000)).toBe('£450,000');
    expect(formatPrice(1250000)).toBe('£1,250,000');
    expect(formatPrice(195000)).toBe('£195,000');
  });

  /**
   * Test 12: Format date utility function
   */
  test('formats date correctly to UK format', () => {
    const formattedDate = formatDate('2024-10-15');
    expect(formattedDate).toContain('October');
    expect(formattedDate).toContain('2024');
  });

  /**
   * Test 13: Search by exact postcode
   */
  test('filters properties by exact postcode match', () => {
    const criteria = { postcode: 'BR1' };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(1);
    expect(results[0].postcode).toBe('BR1');
  });

  /**
   * Test 14: Case-insensitive postcode search
   */
  test('filters properties by postcode case-insensitively', () => {
    const criteria = { postcode: 'nw1' };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(1);
    expect(results[0].postcode.toUpperCase()).toBe('NW1');
  });

  /**
   * Test 15: Search with maximum price only
   */
  test('filters properties by maximum price only', () => {
    const criteria = { 
      maxPrice: 300000
    };
    const results = searchProperties(testProperties, criteria);
    
    expect(results.length).toBe(2);
    expect(results.every(p => p.price <= 300000)).toBe(true);
  });
});