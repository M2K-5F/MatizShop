// src/components/common/ToastContainer.jsx
import React from 'react';
import { useToast } from '../../hooks/useToast';

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  const getToastIcon = (type) => {
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };
    return icons[type] || 'ℹ️';
  };

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div 
          key={toast.id}
          className={`toast ${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <div>{getToastIcon(toast.type)}</div>
          <div>{toast.message}</div>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;