// src/components/employee/SessionsPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../services/mockApiServise';
import Card, { CardHeader, CardBody } from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';
import Button from '../common/Button';

export const SessionsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const sessions = useMemo(() => mockApiService.getSessions(), []);
  
  const filteredSessions = useMemo(() => {
    return sessions.filter(session => 
      session.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sessions, searchTerm]);

  const handleSessionClick = (session) => {
    // Здесь можно добавить логику для показа деталей сеанса
    console.log('Selected session:', session);
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge ${status === 'active' ? 'status-active' : 'status-pending'}`}>
        {status === 'active' ? 'Активен' : 'Подозрительный'}
      </span>
    );
  };

  return (
    <div className="page">
      <Card>
        <CardHeader>
          <h2>Активные сеансы</h2>
          <p>Мониторинг активности пользователей</p>
        </CardHeader>
        <CardBody>
          <SearchBox 
            placeholder="Поиск сеансов..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          
          <ListContainer>
            {filteredSessions.map(session => (
              <div 
                key={session.id}
                className="list-item" 
                onClick={() => handleSessionClick(session)}
              >
                <div className="item-main">
                  <div className="item-title">Сеанс {session.id}</div>
                  <div className="item-subtitle">
                    {session.user} • {session.device} • IP: {session.ip}
                  </div>
                </div>
                <div className="item-meta">
                  {getStatusBadge(session.status)}
                  <div style={{ marginTop: '5px' }}>{session.duration}</div>
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

export default SessionsPage;