import React, { useState, useEffect } from "react";
import { debounce } from "../utils/debounce";
import {
  searchUniversitiesByName,
  searchUniversitiesByCountry,
} from "../utils/api";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // 'name' or 'country'
  const [results, setResults] = useState([]);
  const [currentQuery, setCurrentQuery] = useState(""); // Initialize with an empty string

  // Create a debounced function for the API call
  const performSearch = debounce(async (searchQuery, searchType) => {
    if (searchType === "name") {
      const data = await searchUniversitiesByName(searchQuery);
      setResults(data);
    } else if (searchType === "country") {
      const data = await searchUniversitiesByCountry(searchQuery);
      setResults(data);
    }
  }, 1000); // Adjust the debounce delay as needed in milliseconds

  useEffect(() => {
    // Update currentQuery whenever query changes
    setCurrentQuery(query);

    if (query !== "") {
      // Call the debounced search function
      performSearch(query, searchBy);
    } else if (query === "") {
      // Clear results if query becomes empty
      setResults([]);
    }
  }, [query, searchBy]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={query}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="search-type">Search By</InputLabel>
          <Select
            value={searchBy}
            onChange={handleSearchByChange}
            label="Search By"
            inputProps={{
              name: "search-type",
              id: "search-type",
            }}
          >
            <MenuItem value="name">Search by Name</MenuItem>
            <MenuItem value="country">Search by Country</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
