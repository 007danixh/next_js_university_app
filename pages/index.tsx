import React, { useState } from 'react';
import { Container, Typography, CssBaseline } from '@mui/material';
import SearchBar from '../components/SearchBar'; // Adjust the import paths as needed

const IndexPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  
  // Handle search results from the SearchBar component
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Typography variant="h4" align="center" gutterBottom>
        University Search
      </Typography>
      
      <SearchBar onSearch={handleSearch} />
      
      {/* Render the search results */}
      {/* <ul>
        {searchResults.map((result) => (
          <li key={result.name}>{result.name}</li>
        ))}
      </ul> */}
    </Container>
  );
};

export default IndexPage;
