import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import { CustomToast } from './components/common/CustomToast'; // Import CustomToast

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider> {/* Wrap App with AuthProvider */}
        <App />
        <CustomToast /> {/* Add CustomToast here */}
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);