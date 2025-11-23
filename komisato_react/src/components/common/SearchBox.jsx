// src/components/common/SearchBox.jsx
import React from 'react';

const SearchBox = ({ placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type="text"
      className={`search-box ${className}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBox;