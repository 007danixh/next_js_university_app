import { useState, useEffect } from 'react';
import { debounce } from '../utils/debounce';
import { fuzzySearch } from '../utils/fuzzySearch';
import {
  searchUniversitiesByName,
  searchUniversitiesByCountry,
} from '../utils/api';

const useSearchBarLogic = () => {
  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('name'); // 'name' or 'country'
  const [results, setResults] = useState([]);
  const [currentQuery, setCurrentQuery] = useState('');

  const performFuzzySearch = debounce((searchQuery, data) => {
    if (searchQuery !== '') {
      const fuzzyResults = fuzzySearch(searchQuery, data);
      setResults(fuzzyResults);
    } else {
      setResults([]);
    }
  }, 1000);

  useEffect(() => {
    setCurrentQuery(query);

    // Check if query is not empty before making the API call
    if (query !== '') {
      // Fetch data based on the search type
      const fetchData = async () => {
        let data = [];
        if (searchBy === 'name') {
          data = await searchUniversitiesByName(query);
        } else if (searchBy === 'country') {
          data = await searchUniversitiesByCountry(query);
        }
        performFuzzySearch(query, data);
      };

      fetchData();
    } else {
      // Clear results if query is empty
      setResults([]);
    }
  }, [query, searchBy]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return {
    query,
    searchBy,
    results,
    currentQuery,
    handleInputChange,
    handleSearchByChange,
  };
};

export default useSearchBarLogic;
