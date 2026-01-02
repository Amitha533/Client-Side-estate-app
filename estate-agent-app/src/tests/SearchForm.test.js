import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

describe('SearchForm Component Tests', () => {
  /**
   * Test 1: SearchForm renders all form elements
   */
  test('renders all search form fields', () => {
    const mockOnSearch = jest.fn();
    
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByText('Search Properties')).toBeInTheDocument();
    expect(screen.getByLabelText('Property Type')).toBeInTheDocument();
    expect(screen.getByText(/Price Range/i)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Date Filter Mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Postcode Area')).toBeInTheDocument();
  });

  /**
   * Test 2: Form submission calls onSearch callback
   */
  test('form submission triggers onSearch with criteria', () => {
    const mockOnSearch = jest.fn();
    
    render(<SearchForm onSearch={mockOnSearch} />);

    const submitButton = screen.getByText('Search Properties');
    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  /**
   * Test 3: Reset button clears form
   */
  test('reset button clears form and searches all properties', () => {
    const mockOnSearch = jest.fn();
    
    render(<SearchForm onSearch={mockOnSearch} />);

    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(mockOnSearch).toHaveBeenCalledWith({});
  });

  /**
   * Test 4: Form has submit and reset buttons
   */
  test('displays both submit and reset buttons', () => {
    const mockOnSearch = jest.fn();
    
    render(<SearchForm onSearch={mockOnSearch} />);

    expect(screen.getByText('Search Properties')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  /**
   * Test 5: Postcode input accepts text
   */
  test('postcode input field accepts user input', () => {
    const mockOnSearch = jest.fn();
    
    render(<SearchForm onSearch={mockOnSearch} />);

    const postcodeInput = screen.getByLabelText('Postcode Area');
    
    fireEvent.change(postcodeInput, { target: { value: 'BR1' } });
    
    expect(postcodeInput.value).toBe('BR1');
  });
});