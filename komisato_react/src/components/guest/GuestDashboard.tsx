// src/components/guest/GuestDashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from '../../hooks/useToast';
import Card, { CardHeader, CardBody } from '../common/Card';
import Button from '../common/Button';

export const GuestDashboard = () => {
  const navigate = useNavigate();
  const { logout, currentUser } = useAuthStore();
  const { showToast } = useToast();

  const handleLogout = () => {
    logout();
    showToast('Вы вышли из системы', 'info');
  };

  const navCards = [
    {
      icon: '📦',
      title: 'Мои заказы',
      description: 'Отслеживание текущих проектов',
      onClick: () => navigate('/my-orders')
    },
    {
      icon: '🏠',
      title: 'Услуги',
      description: 'Каталог наших услуг',
      onClick: () => navigate('/guest-services')
    },
    {
      icon: '👨‍💼',
      title: 'Сотрудники',
      description: 'Наши специалисты',
      onClick: () => navigate('/our-team')
    }
  ];

  return (
    <div className="page">
      <Card>
        <CardHeader>
          <h2>Добро пожаловать в GrandHouse</h2>
          <div className="user-role">Клиент</div>
        </CardHeader>
        <CardBody>
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
            <Button variant="secondary" onClick={handleLogout}>
              Выйти
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuestDashboard;