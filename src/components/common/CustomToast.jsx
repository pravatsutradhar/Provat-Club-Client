import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

const CustomToast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        className: '',
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#28a745',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#28a745',
          },
        },
        error: {
          duration: 4000,
          style: {
            background: '#dc3545',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#dc3545',
          },
        },
        // --- THIS 'info' SECTION MUST BE PRESENT ---
        info: { // This defines the style for toast.info
          duration: 3000,
          style: {
            background: '#007bff', // Blue background for info
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#007bff',
          },
        },
        // --- END 'info' SECTION ---
      }}
    />
  );
};

export { toast, CustomToast };