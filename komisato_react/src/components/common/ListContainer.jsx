// src/components/common/ListContainer.jsx
import React from 'react';

const ListContainer = ({ children, className = '' }) => {
  return (
    <div className={`list-container ${className}`}>
      {children}
    </div>
  );
};

export default ListContainer;