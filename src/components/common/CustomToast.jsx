import React from 'react';
import { Toaster, toast } from 'react-hot-toast';

// A simple wrapper for react-hot-toast to provide consistent styling
const CustomToast = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Define default options
        className: '',
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        // Success toast styling
        success: {
          duration: 3000,
          theme: {
            primary: 'green',
            secondary: 'black',
          },
        },
        // Error toast styling
        error: {
          duration: 4000,
          theme: {
            primary: 'red',
            secondary: 'white',
          },
        },
      }}
    />
  );
};

export { toast, CustomToast };