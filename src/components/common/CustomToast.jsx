import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

// A simple wrapper for react-hot-toast to provide consistent styling
const CustomToast = () => {
  return (
    <Toaster
      position="top-right" // Position toasts in the top-right corner
      reverseOrder={false} // New toasts appear on top
      gutter={8} // Space between toasts
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options for all toasts
        className: '',
        duration: 3000, // Default duration for all toasts
        style: {
          background: '#363636',
          color: '#fff',
        },
        // Success toast styling override
        success: {
          duration: 3000,
          style: {
            background: '#28a745', // Green background
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff', // White checkmark icon
            secondary: '#28a745',
          },
        },
        // Error toast styling override
        error: {
          duration: 4000,
          style: {
            background: '#dc3545', // Red background
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff', // White x-mark icon
            secondary: '#dc3545',
          },
        },
        // Info toast styling override
        info: {
          duration: 3000,
          style: {
            background: '#007bff', // Blue background
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff', // White info icon
            secondary: '#007bff',
          },
        },
      }}
    />
  );
};

export { toast, CustomToast };