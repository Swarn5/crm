import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import CSS module

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/auth/status`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          onLogin();
          navigate('/home');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    checkAuthStatus();
  }, [onLogin, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/api/auth/google`;
  };

  return (
    <div className={`${styles['login-page']} font-mono`}>
      <div className={styles['login-container']}>
        <h1 className={`${styles['title']} font-mono`}>CRM APP</h1>
        <p className={`${styles['subtitle']} font-mono`}>Assignment for XENO</p>
        <div className={styles['login-box']}>
          <button
            onClick={handleGoogleLogin}
            className={`${styles['login-with-google-btn']} font-mono`}
            style={{ minWidth: '200px' }} // Adjusted min width for better button size
          >
            <span style={{ fontSize: '16px' }}>Login with Google</span> {/* Increased font size */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
