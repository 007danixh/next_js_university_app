import React from 'react';
import useSearchBarLogic from './SearchBarLogic';
import SearchBarUI from './SearchBarUI';

const SearchBar = () => {
  const {
    query,
    searchBy,
    results,
    handleInputChange,
    handleSearchByChange,
  } = useSearchBarLogic();

  return (
    <SearchBarUI
      query={query}
      searchBy={searchBy}
      results={results}
      handleInputChange={handleInputChange}
      handleSearchByChange={handleSearchByChange}
    />
  );
};

export default SearchBar;
