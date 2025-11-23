// src/components/employee/OrdersPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../services/mockApiServise';
import Card, { CardHeader, CardBody } from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';
import Button from '../common/Button';

export const OrdersPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const orders = useMemo(() => mockApiService.getOrders(), []);
  
  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.project.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

  const handleOrderClick = (order) => {
    // Здесь можно добавить логику для показа деталей заказа
    console.log('Selected order:', order);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'status-active', text: 'В работе' },
      completed: { class: 'status-completed', text: 'Завершен' },
      pending: { class: 'status-pending', text: 'Ожидание' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`status-badge ${config.class}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="page">
      <Card>
        <CardHeader>
          <h2>Заказы</h2>
          <p>Текущие и завершенные проекты</p>
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
                    {order.client} - {order.project}
                  </div>
                </div>
                <div className="item-meta">
                  {getStatusBadge(order.status)}
                  <div style={{ marginTop: '5px', color: 'var(--primary)' }}>
                    {order.budget}
                  </div>
                  <div style={{ marginTop: '2px', fontSize: '0.75rem' }}>
                    {order.progress}
                  </div>
                </div>
              </div>
            ))}
          </ListContainer>
          
          <div className="action-buttons">
            <Button variant="success">Создать заказ</Button>
            <Button variant="primary" onClick={() => navigate('/')}>
              В меню
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrdersPage;