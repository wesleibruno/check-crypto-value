// components/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a cryptocurrency..."
        className="px-4 py-2 border rounded w-full"
      />
    </div>
  );
};

export default SearchBar;
