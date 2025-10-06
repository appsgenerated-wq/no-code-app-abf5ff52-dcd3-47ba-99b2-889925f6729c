import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';
import config from './constants';
import { testBackendConnection } from './services/apiService';

function App() {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [currentScreen, setCurrentScreen] = useState(null); // Start with null to show loading
  const [backendConnected, setBackendConnected] = useState(false);

  const manifest = new Manifest({ appId: config.APP_ID, baseURL: config.BACKEND_URL });

  useEffect(() => {
    const initializeApp = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const connectionResult = await testBackendConnection();
      setBackendConnected(connectionResult.success);

      if (connectionResult.success) {
        console.log('✅ [APP] Backend connection successful. Checking auth status...');
        try {
          const loggedInUser = await manifest.from('User').me();
          setUser(loggedInUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          console.log('ℹ️ [APP] No active session found.');
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed. App may not work correctly.');
        console.error('❌ [APP] Connection error:', connectionResult.error);
        setCurrentScreen('landing'); // Show landing page even if backend fails
      }
    };

    initializeApp();
  }, []);

  const login = async (email, password) => {
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setRestaurants([]);
    setCurrentScreen('landing');
  };

  const loadRestaurants = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('Restaurant').find({
        include: ['owner'],
        filter: { owner: user.id }, // Only load restaurants owned by the current user
        sort: { createdAt: 'desc' },
      });
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to load restaurants:', error);
    }
  };

  const createRestaurant = async (restaurantData) => {
    try {
      const newRestaurant = await manifest.from('Restaurant').create(restaurantData);
      setRestaurants([newRestaurant, ...restaurants]);
    } catch (error) {
      console.error('Failed to create restaurant:', error);
      alert('Error creating restaurant. Please check the form and try again.');
    }
  };

  const renderContent = () => {
    if (currentScreen === null) {
      return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p className='text-gray-500'>Loading application...</p></div>;
    }

    if (currentScreen === 'dashboard' && user) {
      return (
        <DashboardPage
          user={user}
          restaurants={restaurants}
          onLogout={logout}
          onLoadRestaurants={loadRestaurants}
          onCreateRestaurant={createRestaurant}
        />
      );
    }

    return <LandingPage onLogin={login} />;
  };

  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`text-sm font-medium ${backendConnected ? 'text-gray-700' : 'text-red-600'}`}>
          {backendConnected ? 'API Connected' : 'API Disconnected'}
        </span>
      </div>
      {renderContent()}
    </div>
  );
}

export default App;
