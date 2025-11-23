// src/components/guest/GuestEmployeesPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../services/mockApiServise';
import Card, { CardHeader, CardBody } from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';
import Button from '../common/Button';

export const GuestEmployeesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const employees = useMemo(() => {
    const allEmployees = mockApiService.getEmployees();
    return allEmployees.slice(0, 3); // Показываем только первых 3 сотрудников для гостя
  }, []);
  
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => 
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [employees, searchTerm]);

  const handleEmployeeClick = (employee) => {
    // Здесь можно добавить логику для показа деталей сотрудника
    console.log('Selected employee:', employee);
  };

  return (
    <div className="page">
      <Card>
        <CardHeader>
          <h2>Наши специалисты</h2>
          <p>Команда профессионалов</p>
        </CardHeader>
        <CardBody>
          <SearchBox 
            placeholder="Поиск сотрудников..."
            value={searchTerm}
            onChange={setSearchTerm}
          />
          
          <ListContainer>
            {filteredEmployees.map(employee => (
              <div 
                key={employee.id}
                className="list-item" 
                onClick={() => handleEmployeeClick(employee)}
              >
                <div className="item-main">
                  <div className="item-title">{employee.name}</div>
                  <div className="item-subtitle">
                    {employee.position} • Опыт: {employee.experience} • {employee.specialization}
                  </div>
                </div>
                <div className="item-meta">
                  <div style={{ color: 'var(--primary)' }}>
                    Проектов: {employee.projects}
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

export default GuestEmployeesPage;