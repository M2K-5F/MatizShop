// src/components/auth/LoginForm.jsx
import React, { useState } from 'react';
import Button from '../common/Button';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('guest');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password, loginType);
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Логин</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Введите любой логин"
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
        <label>Тип входа</label>
        <select
          className="form-control"
          value={loginType}
          onChange={(e) => setLoginType(e.target.value)}
        >
          <option value="guest">Клиент</option>
          <option value="employee">Сотрудник</option>
        </select>
      </div>
      <Button type="submit" variant="primary" style={{ width: '100%', margin: '0.5rem 0' }}>
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;