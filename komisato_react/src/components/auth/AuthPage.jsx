// src/components/auth/AuthPage.jsx
import React, { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useToast } from '../../hooks/useToast';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { login, register } = useAuthStore();
  const { showToast } = useToast();

  const handleLogin = (username, password, loginType) => {
    if (!username || !password) {
      showToast('Заполните все поля', 'error');
      return;
    }

    const token = 'mock_jwt_token_' + Date.now();
    login(username, loginType, token);
    showToast('Успешный вход!', 'success');
  };

  const handleRegister = (email, password, confirmPassword, userType, employeeCode) => {
    if (!email || !password || !confirmPassword) {
      showToast('Заполните все обязательные поля', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Пароли не совпадают', 'error');
      return;
    }

    const username = email.split('@')[0] || email;
    const token = 'mock_jwt_token_' + Date.now();
    register(username, userType, token);
    showToast('Регистрация успешна!', 'success');
  };

  return (
    <div id="authPage" className="page">
      <div className="auth-container">
        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Вход
          </button>
          <button 
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Регистрация
          </button>
        </div>
        
        {activeTab === 'login' ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <RegisterForm onRegister={handleRegister} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;