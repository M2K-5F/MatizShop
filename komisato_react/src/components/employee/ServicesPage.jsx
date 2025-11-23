// src/components/employee/ServicesPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../services/mockApiServise';
import Card, { CardHeader, CardBody } from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';
import Button from '../common/Button';

export const ServicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const services = useMemo(() => mockApiService.getServices(), []);
  
  const filteredServices = useMemo(() => {
    return services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  const handleServiceClick = (service) => {
    // Здесь можно добавить логику для показа деталей услуги
    console.log('Selected service:', service);
  };

  return (
    <div className="page">
      <Card>
        <CardHeader>
          <h2>Услуги</h2>
          <p>Каталог предоставляемых услуг</p>
        </CardHeader>
        <CardBody>
          <SearchBox 
            placeholder="Поиск услуг..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          
          <ListContainer>
            {filteredServices.map(service => (
              <div 
                key={service.id}
                className="list-item" 
                onClick={() => handleServiceClick(service)}
              >
                <div className="item-main">
                  <div className="item-title">{service.name}</div>
                  <div className="item-subtitle">
                    {service.duration} • {service.price} • {service.category}
                  </div>
                </div>
                <div className="item-meta">
                  <Button 
                    variant="primary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceClick(service);
                    }}
                  >
                    Подробнее
                  </Button>
                </div>
              </div>
            ))}
          </ListContainer>
          
          <div className="action-buttons">
            <Button variant="success">Добавить услугу</Button>
            <Button variant="primary" onClick={() => navigate('/')}>
              В меню
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ServicesPage;