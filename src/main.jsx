import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { CustomToast } from './components/common/CustomToast';
import Modal from 'react-modal'; // Import Modal

// IMPORTANT: Set the app element for react-modal
// This should be the ID of your root HTML element (usually 'root')
// It's crucial for accessibility and properly hiding background content.
Modal.setAppElement('#root'); // <--- ENSURE THIS LINE IS HERE

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
        <CustomToast />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);