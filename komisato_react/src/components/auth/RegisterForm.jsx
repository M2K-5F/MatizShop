// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('guest');
  const [employeeCode, setEmployeeCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(email, password, confirmPassword, userType, employeeCode);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Введите любой email"
        />
      </div>
      <div className="form-group">
        <label>Пароль</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите любой пароль"
        />
      </div>
      <div className="form-group">
        <label>Подтверждение пароля</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
        />
      </div>
      <div className="form-group">
        <label>Тип пользователя</label>
        <select
          className="form-control"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="guest">Клиент</option>
          <option value="employee">Сотрудник</option>
        </select>
      </div>
      {userType === 'employee' && (
        <div className="form-group">
          <label>Код сотрудника (любой)</label>
          <input
            type="text"
            className="form-control"
            value={employeeCode}
            onChange={(e) => setEmployeeCode(e.target.value)}
            placeholder="Введите любой код"
          />
        </div>
      )}
      <Button type="submit" variant="primary" style={{ width: '100%' }}>
        Зарегистрироваться
      </Button>
    </form>
  );
};

export default RegisterForm;