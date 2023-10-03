import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

const SearchBarUI = ({
  query,
  searchBy,
  results,
  handleInputChange,
  handleSearchByChange,
}) => {
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
              name: 'search-type',
              id: 'search-type',
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

export default SearchBarUI;
