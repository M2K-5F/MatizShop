// src/components/guest/GuestOrdersPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../services/mockApiServise';
import Card, { CardHeader, CardBody } from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';
import Button from '../common/Button';

export const GuestOrdersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const orders = useMemo(() => mockApiService.getGuestOrders(), []);
  
  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.manager.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const handleOrderClick = (order) => {
    // Здесь можно добавить логику для показа деталей заказа
    console.log('Selected order:', order);
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge ${status === 'active' ? 'status-active' : 'status-completed'}`}>
        {status === 'active' ? 'В работе' : 'Завершен'}
      </span>
    );
  };

  return (
    <div className="page">
      <Card>
        <CardHeader>
          <h2>Мои заказы</h2>
          <p>Отслеживание ваших проектов</p>
        </CardHeader>
        <CardBody>
          <SearchBox 
            placeholder="Поиск заказов..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          
          <ListContainer>
            {filteredOrders.map(order => (
              <div 
                key={order.id}
                className="list-item" 
                onClick={() => handleOrderClick(order)}
              >
                <div className="item-main">
                  <div className="item-title">Заказ №{order.id}</div>
                  <div className="item-subtitle">
                    {order.project} • Менеджер: {order.manager}
                  </div>
                </div>
                <div className="item-meta">
                  {getStatusBadge(order.status)}
                  <div style={{ marginTop: '5px', color: 'var(--primary)' }}>
                    {order.progress}
                  </div>
                  <div style={{ marginTop: '2px', fontSize: '0.75rem' }}>
                    {order.budget}
                  </div>
                </div>
              </div>
            ))}
          </ListContainer>
          
          <div className="action-buttons">
            <Button variant="primary" onClick={() => navigate('/')}>
              В меню
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuestOrdersPage;