// src/components/common/DetailPage.jsx
import React from 'react';
import Button from './Button';

export const DetailSection = ({ title, children, className = '' }) => {
  return (
    <div className={`detail-section ${className}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export const InfoGrid = ({ children, className = '' }) => {
  return (
    <div className={`info-grid ${className}`}>
      {children}
    </div>
  );
};

export const InfoItem = ({ label, value, children, className = '' }) => {
  return (
    <div className={`info-item ${className}`}>
      <div className="info-label">{label}</div>
      <div className="info-value">{value || children}</div>
    </div>
  );
};

export const BackButton = ({ onClick, children = 'Назад' }) => {
  return (
    <Button variant="back" onClick={onClick}>
      {children}
    </Button>
  );
};

export const ProgressBar = ({ progress, className = '' }) => {
  return (
    <div className={`progress-bar ${className}`}>
      <div 
        className="progress-fill" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};