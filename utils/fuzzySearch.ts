import Fuse from "fuse.js";

const fuseOptions = {
  includeScore: true, // Include a score for each result
  keys: ["name"], // Define the keys you want to search in (e.g., name)
  threshold: 1.0, // Adjust this value to include more results
};

export const fuzzySearch = (query, items) => {
  const fuse = new Fuse(items, fuseOptions);
  return fuse.search(query).map((result) => result.item);
};
