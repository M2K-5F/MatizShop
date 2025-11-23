// src/components/employee/EmployeesPage.jsx
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import mockApiService from '../../services/mockApiServise';
import Card from '../common/Card';
import SearchBox from '../common/SearchBox';
import ListContainer from '../common/ListContainer';

export const EmployeesPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const employees = useMemo(() => mockApiService.getEmployees(), []);
  
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
        <div className="card-header">
          <h2>Сотрудники</h2>
          <p>Управление персоналом компании</p>
        </div>
        <div className="card-body">
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
                    {employee.position} • Опыт: {employee.experience} • Проектов: {employee.projects}
                  </div>
                </div>
                <div className="item-meta">
                  <span className={`status-badge ${
                    employee.status === 'active' ? 'status-active' : 'status-pending'
                  }`}>
                    {employee.status === 'active' ? 'Активен' : 'В отпуске'}
                  </span>
                </div>
              </div>
            ))}
          </ListContainer>
          
          <div className="action-buttons">
            <button className="btn btn-success">Добавить сотрудника</button>
            <button className="btn btn-primary" onClick={() => navigate('/')}>
              В меню
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EmployeesPage;