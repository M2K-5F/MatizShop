// src/components/employee/ClientsPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../services/mockApiServise';
import Card, { CardHeader, CardBody } from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';
import Button from '../common/Button';

export const ClientsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const clients = useMemo(() => mockApiService.getClients(), []);
  
  const filteredClients = useMemo(() => {
    return clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clients, searchTerm]);

  const handleClientClick = (client) => {
    // Здесь можно добавить логику для показа деталей клиента
    console.log('Selected client:', client);
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge ${status === 'vip' ? 'status-vip' : 'status-active'}`}>
        {status === 'vip' ? 'VIP' : 'Активен'}
      </span>
    );
  };

  return (
    <div className="page">
      <Card>
        <CardHeader>
          <h2>Клиенты</h2>
          <p>База данных клиентов компании</p>
        </CardHeader>
        <CardBody>
          <SearchBox 
            placeholder="Поиск клиентов..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          
          <ListContainer>
            {filteredClients.map(client => (
              <div 
                key={client.id}
                className="list-item" 
                onClick={() => handleClientClick(client)}
              >
                <div className="item-main">
                  <div className="item-title">{client.name}</div>
                  <div className="item-subtitle">
                    Проектов: {client.projects} • Рейтинг: {client.rating} • Телефон: {client.phone}
                  </div>
                </div>
                <div className="item-meta">
                  {getStatusBadge(client.status)}
                  <div style={{ marginTop: '5px', color: 'var(--primary)', fontWeight: 'bold' }}>
                    {client.total}
                  </div>
                </div>
              </div>
            ))}
          </ListContainer>
          
          <div className="action-buttons">
            <Button variant="success">Добавить клиента</Button>
            <Button variant="primary" onClick={() => navigate('/')}>
              В меню
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ClientsPage;