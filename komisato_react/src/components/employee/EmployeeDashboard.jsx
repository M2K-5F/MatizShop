// src/components/employee/EmployeeDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from '../../hooks/useToast';
import Card from '../common/Card';

export const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Вы вышли из системы', 'info');
  };

  const navCards = [
    {
      icon: '👥',
      title: 'Сотрудники',
      description: 'Управление персоналом',
      onClick: () => navigate('/employees')
    },
    {
      icon: '📋',
      title: 'Заказы',
      description: 'Просмотр и управление заказами',
      onClick: () => navigate('/orders')
    },
    {
      icon: '🛠️',
      title: 'Услуги',
      description: 'Каталог услуг компании',
      onClick: () => navigate('/services')
    },
    {
      icon: '💻',
      title: 'Активные сеансы',
      description: 'Мониторинг активности',
      onClick: () => navigate('/sessions')
    },
    {
      icon: '👤',
      title: 'Клиенты',
      description: 'База данных клиентов',
      onClick: () => navigate('/clients')
    }
  ];

  return (
    <div className="page">
      <Card>
        <div className="card-header">
          <h2>Панель сотрудника</h2>
          <div className="user-role">Администратор</div>
        </div>
        <div className="card-body">
          <div className="nav-grid">
            {navCards.map((card, index) => (
              <div key={index} className="nav-card" onClick={card.onClick}>
                <div>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmployeeDashboard;