// src/components/common/Header.jsx
import React from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, currentRole, logout } = useAuthStore();
  const navigate = useNavigate()

  const getRoleText = () => {
    switch (currentRole) {
      case 'employee': return 'Сотрудник';
      case 'guest': return 'Клиент';
      default: return 'Гость';
    }
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo" onClick={() => navigate('/')}>GrandHouse</div>
        <div className="user-info">
          <div>{currentUser || 'Не авторизован'}</div>
          <div className="user-role">{getRoleText()}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;