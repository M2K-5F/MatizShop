// src/components/guest/GuestServicesPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from "../../services/mockApiServise";
import Card, { CardHeader, CardBody } from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';
import Button from '../common/Button';

export const GuestServicesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const services = useMemo(() => {
    const allServices = mockApiService.getServices();
    return allServices.slice(0, 3); // Показываем только первые 3 услуги для гостя
  }, []);
  
  const filteredServices = useMemo(() => {
    return services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          <p>Каталог наших услуг</p>
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
                    {service.description}
                  </div>
                </div>
                <div className="item-meta">
                  <div style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                    {service.price}
                  </div>
                  <div style={{ marginTop: '2px', fontSize: '0.75rem' }}>
                    {service.duration}
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

export default GuestServicesPage;