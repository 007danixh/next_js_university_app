import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar'; // Import your SearchBar component
import '@testing-library/jest-dom';
// import '../customMatchers';

import {
  searchUniversitiesByName,
  searchUniversitiesByCountry,
} from '../utils/api';

// Mock your API functions and debounce function if needed
jest.mock('../utils/api', () => ({
  searchUniversitiesByName: jest.fn(),
  searchUniversitiesByCountry: jest.fn(),
}));

jest.mock('../utils/debounce', () => ({
  debounce: (func) => func,
}));

describe('SearchBar component', () => {
  it('renders correctly', () => {
    const { container } = render(<SearchBar />);
    // expect(container).toMatchSnapshot();
  });

  it('performs a search when the input value changes for "name" search', async () => {
    const { container } = render(<SearchBar />);
    const input = screen.getByLabelText('Search');
    
    // Mock the API function for name search to return some data
  (searchUniversitiesByName as jest.Mock<Promise<any>>).mockResolvedValue([
  { id: 1, name: 'Turkey University' },

]);

    fireEvent.change(input, { target: { value: 'Turkey' } });

    // Wait for the API call and update of results
    await waitFor(() => {
      expect(searchUniversitiesByName).toHaveBeenCalledWith('Turkey');
      expect(screen.getByText('Turkey University')).toBeInTheDocument();
      expect(screen.queryByText('UAE University')).not.toBeInTheDocument();
    });
  });

  // Add similar tests for other scenarios

  it('clears results when the input is empty', async () => {
    const { container } = render(<SearchBar />);
    const input = screen.getByLabelText('Search');
    
    // Mock the API functions to return some data
    (searchUniversitiesByName as jest.Mock).mockResolvedValue([
      { id: 1, name: 'Turkey University' },
  
    ]);

    fireEvent.change(input, { target: { value: 'Turkey' } });

    // Wait for the API call and update of results
    await waitFor(() => {
      expect(screen.getByText('Turkey University')).toBeInTheDocument();
      expect(screen.queryByText('UAE University')).not.toBeInTheDocument();
    });

    fireEvent.change(input, { target: { value: '' } });

    // Wait for the results to be cleared
    await waitFor(() => {
      expect(screen.queryByText('Turkey University')).not.toBeInTheDocument();
      expect(screen.queryByText('UAE University')).not.toBeInTheDocument();
    });
  });
});
